/**
 * استثنای مربوط به خطاهای API نیازپرداز
 */
export class NiazpardazApiError extends Error {
  /** کد خطا */
  public readonly errorCode?: number;

  /**
   * سازنده با پیام خطا
   * @param message پیام خطا
   * @param errorCode کد خطا (اختیاری)
   */
  constructor(message: string, errorCode?: number) {
    super(message);
    this.name = 'NiazpardazApiError';
    this.errorCode = errorCode;

    // برای سازگاری با TypeScript و ES5
    Object.setPrototypeOf(this, NiazpardazApiError.prototype);
  }
}
