import dayjs from 'dayjs';

// 等待
export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// 获取当前时间的总秒数
export function getCurrentTimeSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

export function formatTime(
  date?: string | number | Date | dayjs.Dayjs | null | undefined,
  format = 'MM/DD/YYYY, HH:mm'
) {
  return dayjs(date).format(format);
}

export function smartFormatTime(date: string | number | Date | dayjs.Dayjs) {
  const now = dayjs();
  const diff = now.diff(date, 'day');
  if (diff < 1) {
    return dayjs(date).format('HH:mm');
  }
  return dayjs(date).format('MM/DD/YY');
}

/**
 * 等待，直到checker返回true
 * @param checker 检查函数
 * @param interval 检查间隔
 * @param timeout 超时则报错，默认0表示不启用
 * @returns
 */
export async function waitUntil(
  checker: (() => boolean) | (() => Promise<boolean>),
  interval = 100,
  timeout = 0
): Promise<void> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const checked = await checker();
    if (checked) {
      resolve();
      return;
    }
    let passed = false;
    const itv = setInterval(async () => {
      const checked = await checker();
      if (checked) {
        clearInterval(itv);
        passed = true;
        resolve();
      }
    }, interval);
    if (timeout) {
      setTimeout(() => {
        if (!passed) {
          clearInterval(itv);
          reject(new Error('Wait timeout.'));
        }
      }, timeout);
    }
  });
}
