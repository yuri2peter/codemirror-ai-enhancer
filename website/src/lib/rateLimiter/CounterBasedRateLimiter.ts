interface Configs {
  max: number; // 最大访问次数
  windowSeconds: number; // 统计窗口时间
}

interface AccessLog {
  id: string;
  time: number;
  count: number;
}

/**
 * 频率限制器，限制某些动作的频率。频率过快则给出需要限制的信号。
 * [max] times per [windowSeconds]
 */
export class CounterBasedRateLimiter {
  configs: Configs = {
    max: 1000,
    windowSeconds: 10 * 60,
  };
  private logs: AccessLog[] = [];
  constructor(configs: Partial<Configs> = {}) {
    Object.assign(this.configs, configs);
  }

  // 记录一次访问,返回访问是否超限
  acquire(id = '') {
    // 概率执行清理
    if (Math.random() < 0.01) {
      this.recyceLogs();
    }
    const now = nowSeconds();
    const log = this.logs.find((l) => l.id === id);
    // 如果没有记录，初始化记录
    if (!log) {
      this.logs.push({
        id,
        time: now,
        count: 1,
      });
      return false;
    }
    if (now - log.time > this.configs.windowSeconds) {
      // 如果已过窗口期，重置记录
      log.count = 1;
      log.time = now;
      return false;
    }
    // 计数加1
    log.count += 1;
    return log.count > this.configs.max;
  }

  // 清理。删除许久未访问的记录。
  private recyceLogs() {
    const now = nowSeconds();
    this.logs = this.logs.filter(
      (l) => now - l.time < this.configs.windowSeconds
    );
  }
}

function nowSeconds() {
  return new Date().getTime() / 1000;
}
