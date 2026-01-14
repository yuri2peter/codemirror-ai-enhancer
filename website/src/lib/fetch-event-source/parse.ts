/**
 * SSE 文本解析
 * @param {string} chunk - decode 后的 SSE 格式数据块
 * @param {Function} callback
 * @param {Object} instance
 */
function eventsourceParser(
  chunk: string,
  callback: ((message: Record<string, unknown>) => void) | undefined,
  options: {
    instance?: { buffer?: string };
    parseJson?: boolean;
  } = {},
): void {
  let message: Record<string, unknown> = {};
  const {
    instance = eventsourceParser as unknown as { buffer?: string },
    parseJson = true,
  } = options;
  const buffer: string = (instance.buffer || "") + chunk;
  const lines: string[] = buffer.split("\n");
  const onMessage = (message: Record<string, unknown>) => callback?.(message);

  // SSE 规范要求每个事件使用空行即 \n\n 进行分割
  // 移除最后一行，若事件完整则为空行，若事件不完整则留作下次处理
  (instance as { buffer?: string }).buffer = lines.pop();

  // 若数据为空则直接返回
  if (lines.length === 0) {
    onMessage(message);
    return;
  }

  // 解析原始数据
  for (const item of lines) {
    // 空行表示一个完整事件的结束
    if (item.trim() === "") {
      // 是否自动解析 JSON
      if (parseJson) {
        try {
          if (typeof message.data === "string") {
            message.data = JSON.parse(message.data);
          }
        } catch (_e) {}
      }
      onMessage(message); // 返回数据
      message = {}; // 重置事件返回的数据
    } else {
      const fieleLength = item.indexOf(":");
      const field = item.substring(0, fieleLength).trim();
      const value = item.substring(fieleLength + 1).trim();

      // 处理数据
      if (field) {
        switch (field) {
          case "data":
            message.data = value;
            break;
          default: // id, event, retry
            (message as Record<string, unknown>)[field] = /^\d+$/.test(value)
              ? Number.parseInt(value, 10)
              : value;
        }
      }
    }
  }
}

export default eventsourceParser;
