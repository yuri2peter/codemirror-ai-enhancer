interface Options {
  rate: number; // refill speed in tokens per second
  bucketSize: number;
}

export class TokenBucketRateLimiter {
  private options: Options;
  private tokens: number;
  private lastRefillTimestamp: number;
  private itvId: NodeJS.Timeout;

  constructor(options: Options) {
    this.options = options;
    this.tokens = 0;
    this.lastRefillTimestamp = Date.now();
    this.itvId = setInterval(() => this.refill(), 1000);
  }

  setOptions(options: Partial<Options>) {
    Object.assign(this.options, options);
  }

  acquire(tokenAmount = 1) {
    if (this.tokens >= tokenAmount) {
      this.tokens -= tokenAmount;
      return true;
    } else {
      return false;
    }
  }

  destroy() {
    clearInterval(this.itvId);
  }

  private refill() {
    const now = Date.now();
    const elapsed = (now - this.lastRefillTimestamp) / 1000;
    this.tokens += elapsed * this.options.rate;
    if (this.tokens > this.options.bucketSize) {
      this.tokens = this.options.bucketSize;
    }
    this.lastRefillTimestamp = now;
  }
}
