import eventsourceParser from "./parse";

interface FetchEventSourceOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  parseJson?: boolean;
  onopen?: (response: Response) => Promise<void> | void;
  onmessage?: (message: Record<string, unknown>) => void;
  done?: (response: Response) => void;
  onerror?: (error: unknown) => void;
  [key: string]: unknown;
}

class FetchEventSource {
  controller: AbortController;
  buffer?: string;
  constructor() {
    this.controller = new AbortController();
  }

  /**
   * 发起请求
   * @param {string} url
   * @param {Object} options
   */
  async fetch(
    url: string,
    options: FetchEventSourceOptions = {},
  ): Promise<void> {
    const {
      headers,
      signal = this.controller.signal,
      parseJson = true,
      ...restOptions
    } = options;

    // 默认 headers
    options.headers = {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      ...headers,
    };

    try {
      const response = await fetch(url, {
        signal,
        ...restOptions,
        headers: options.headers,
      });

      await options.onopen?.(response);

      // 响应异常
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        const ACCEPT = options.headers.Accept;
        if (!String(contentType).startsWith(ACCEPT)) {
          console.error(
            `Expected content-type to be ${ACCEPT}, Actual: ${contentType}`,
          );
        }
        throw new Error(`HTTP ${response.status}`);
      }

      // 读取流
      if (!response.body) throw new Error("Response body is null");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      async function readStream(): Promise<void> {
        const { done, value } = await reader.read();

        // DONE
        if (done) {
          options.done?.(response);
          return;
        }

        const chunk = decoder.decode(value); // 解码 Uint8Array
        eventsourceParser(chunk, options.onmessage, {
          instance: self,
          parseJson,
        }); // 解析 SSE 数据格式

        await readStream();
      }
      await readStream();
    } catch (error) {
      this.abort();
      this.buffer = undefined;
      options.onerror?.(error);
    }
  }

  // 中断请求
  abort() {
    this.controller.abort();
  }
}

// 创建实例
export async function fetchEventSource(
  url: string,
  options: FetchEventSourceOptions = {},
): Promise<FetchEventSource> {
  const eventSource = new FetchEventSource();
  await eventSource.fetch(url, options);
  return eventSource;
}

export { eventsourceParser };
