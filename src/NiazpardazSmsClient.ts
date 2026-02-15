import { NiazpardazApiError } from './exceptions';
import {
  ApiResponse,
  SendBatchSmsResult,
  SendLikeToLikeResult,
  CreditResult,
  SenderNumbersResult,
  InboxCountResult,
  BatchDeliveryResult,
  BlacklistNumbersResult,
  IsBlacklistResult,
  CheckContentResult,
  MessagesResult,
  NiazpardazSmsClientOptions
} from './models';

/**
 * کلاینت اصلی برای کار با API پیامکی نیازپرداز
 */
export class NiazpardazSmsClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;

  private static readonly DEFAULT_BASE_URL = 'https://login.niazpardaz.ir/api/v2/RestWebApi';
  private static readonly DEFAULT_TIMEOUT = 30000;

  /**
   * سازنده کلاینت
   * @param apiKey کلید API دریافتی از پنل
   * @param options تنظیمات اختیاری
   */
  constructor(apiKey: string, options?: NiazpardazSmsClientOptions) {
    if (!apiKey || apiKey.trim() === '') {
      throw new Error('کلید API نمی‌تواند خالی باشد');
    }

    this.apiKey = apiKey;
    this.baseUrl = options?.baseUrl || NiazpardazSmsClient.DEFAULT_BASE_URL;
    this.timeout = options?.timeout || NiazpardazSmsClient.DEFAULT_TIMEOUT;
  }

  // #region Send SMS

  /**
   * ارسال پیامک تکی
   * @param fromNumber شماره فرستنده
   * @param toNumber شماره گیرنده
   * @param message متن پیامک
   * @param isFlash آیا فلش باشد؟
   * @param sendDelay تاخیر ارسال (ثانیه)
   * @returns نتیجه ارسال
   */
  async send(
    fromNumber: string,
    toNumber: string,
    message: string,
    isFlash: boolean = false,
    sendDelay?: number
  ): Promise<SendBatchSmsResult> {
    if (!fromNumber) throw new Error('شماره فرستنده الزامی است');
    if (!toNumber) throw new Error('شماره گیرنده الزامی است');
    if (!message) throw new Error('متن پیامک الزامی است');

    return this.sendBulk(fromNumber, [toNumber], message, isFlash, sendDelay);
  }

  /**
   * ارسال پیامک گروهی (یک متن به چند شماره)
   * @param fromNumber شماره فرستنده
   * @param toNumbers لیست شماره گیرندگان
   * @param message متن پیامک
   * @param isFlash آیا فلش باشد؟
   * @param sendDelay تاخیر ارسال
   * @returns نتیجه ارسال
   */
  async sendBulk(
    fromNumber: string,
    toNumbers: string[],
    message: string,
    isFlash: boolean = false,
    sendDelay?: number
  ): Promise<SendBatchSmsResult> {
    if (!fromNumber) throw new Error('شماره فرستنده الزامی است');
    if (!toNumbers || toNumbers.length === 0) throw new Error('لیست گیرندگان الزامی است');
    if (!message) throw new Error('متن پیامک الزامی است');

    const payload = {
      fromNumber,
      messageContent: message,
      toNumbers: toNumbers.join(','),
      isFlash,
      sendDelay
    };

    return this.post<SendBatchSmsResult>('/SendBatchSms', payload);
  }

  /**
   * ارسال پیامک LikeToLike (هر شماره پیام مخصوص خودش)
   * @param fromNumber شماره فرستنده
   * @param toNumbers لیست شماره گیرندگان
   * @param messages لیست پیام‌ها (هم‌طول با گیرندگان)
   * @param isFlash آیا فلش باشد؟
   * @returns نتیجه ارسال
   */
  async sendLikeToLike(
    fromNumber: string,
    toNumbers: string[],
    messages: string[],
    isFlash: boolean = false
  ): Promise<SendLikeToLikeResult> {
    if (!fromNumber) throw new Error('شماره فرستنده الزامی است');
    if (!toNumbers || toNumbers.length === 0) throw new Error('لیست گیرندگان الزامی است');
    if (!messages || messages.length === 0) throw new Error('لیست پیام‌ها الزامی است');

    const payload = {
      fromNumber,
      messageContents: messages.join(','),
      toNumbers: toNumbers.join(','),
      isFlash
    };

    return this.post<SendLikeToLikeResult>('/SendSmsLikeToLike', payload);
  }

  /**
   * ارسال پیامک صوتی OTP
   * @param fromNumber شماره فرستنده
   * @param toNumber شماره گیرنده
   * @param otp کد OTP
   * @param isFlash آیا فلش باشد؟
   * @param sendDelay تاخیر ارسال
   * @returns نتیجه ارسال
   */
  async sendVoiceOtp(
    fromNumber: string,
    toNumber: string,
    otp: string,
    isFlash: boolean = false,
    sendDelay?: number
  ): Promise<SendBatchSmsResult> {
    if (!fromNumber) throw new Error('شماره فرستنده الزامی است');
    if (!toNumber) throw new Error('شماره گیرنده الزامی است');
    if (!otp) throw new Error('کد OTP الزامی است');

    const payload = {
      fromNumber,
      messageContent: otp,
      toNumbers: toNumber,
      sendDelay,
      isFlash
    };

    return this.post<SendBatchSmsResult>('/SendVoiceOtp', payload);
  }

  // #endregion

  // #region Delivery

  /**
   * گزارش تحویل پیامک گروهی
   * @param batchSmsId شناسه ارسال گروهی
   * @param pageIndex شماره صفحه
   * @param pageSize تعداد رکورد در صفحه
   * @returns نتیجه گزارش تحویل
   */
  async getBatchDelivery(
    batchSmsId: number,
    pageIndex: number = 1,
    pageSize: number = 100
  ): Promise<BatchDeliveryResult> {
    const payload = {
      batchSmsId,
      index: pageIndex,
      count: pageSize
    };

    return this.post<BatchDeliveryResult>('/GetBatchDelivery', payload);
  }

  /**
   * گزارش تحویل پیامک LikeToLike
   * @param smsId شناسه پیامک
   * @returns نتیجه گزارش تحویل
   */
  async getDeliveryLikeToLike(smsId: number): Promise<BatchDeliveryResult> {
    const payload = { smsId };
    return this.post<BatchDeliveryResult>('/GetDeliveryLikeToLike', payload);
  }

  // #endregion

  // #region Account

  /**
   * دریافت اعتبار حساب
   * @returns نتیجه اعتبار
   */
  async getCredit(): Promise<CreditResult> {
    return this.post<CreditResult>('/GetCredit', {});
  }

  /**
   * دریافت لیست شماره‌های فرستنده
   * @returns لیست شماره‌های فرستنده
   */
  async getSenderNumbers(): Promise<SenderNumbersResult> {
    return this.post<SenderNumbersResult>('/GetSenderNumbers', {});
  }

  // #endregion

  // #region Inbox

  /**
   * دریافت تعداد پیامک‌های دریافتی
   * @param isRead فقط خوانده شده‌ها؟
   * @returns تعداد پیامک‌های دریافتی
   */
  async getInboxCount(isRead: boolean = false): Promise<InboxCountResult> {
    const payload = { isRead };
    return this.post<InboxCountResult>('/GetInboxCount', payload);
  }

  /**
   * دریافت پیامک‌ها
   * @param messageType نوع پیامک
   * @param fromNumbers شماره‌های فرستنده (با کاما جدا شده)
   * @param pageIndex شماره صفحه
   * @param pageSize تعداد رکورد در صفحه
   * @returns لیست پیامک‌ها
   */
  async getMessages(
    messageType: number,
    fromNumbers: string,
    pageIndex: number = 1,
    pageSize: number = 100
  ): Promise<MessagesResult> {
    const payload = {
      messageType,
      fromNumbers,
      index: pageIndex,
      count: pageSize
    };

    return this.post<MessagesResult>('/GetMessages', payload);
  }

  /**
   * دریافت پیامک‌ها بر اساس بازه زمانی
   * @param messageType نوع پیامک
   * @param fromNumbers شماره‌های فرستنده (با کاما جدا شده)
   * @param fromDate تاریخ شروع
   * @param toDate تاریخ پایان
   * @returns لیست پیامک‌ها
   */
  async getMessagesByDateRange(
    messageType: number,
    fromNumbers: string,
    fromDate: Date,
    toDate: Date
  ): Promise<MessagesResult> {
    const payload = {
      messageType,
      fromNumbers,
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString()
    };

    return this.post<MessagesResult>('/GetMessagesByDateRange', payload);
  }

  // #endregion

  // #region Blacklist

  /**
   * استخراج شماره‌های لیست سیاه مخابرات
   * @param numbers لیست شماره‌ها
   * @returns شماره‌های لیست سیاه
   */
  async extractTelecomBlacklistNumbers(numbers: string[]): Promise<BlacklistNumbersResult> {
    const payload = {
      numbers: numbers.join(',')
    };

    return this.post<BlacklistNumbersResult>('/ExtractTelecomBlacklistNumbers', payload);
  }

  /**
   * بررسی اینکه آیا شماره در لیست سیاه مخابرات هست؟
   * @param number شماره موبایل
   * @returns نتیجه بررسی
   */
  async numberIsInTelecomBlacklist(number: string): Promise<IsBlacklistResult> {
    const payload = { number };
    return this.post<IsBlacklistResult>('/NumberIsInTelecomBlacklist', payload);
  }

  // #endregion

  // #region Validation

  /**
   * بررسی محتوای پیامک (فیلتر کلمات)
   * @param message متن پیامک
   * @returns نتیجه بررسی
   */
  async checkSmsContent(message: string): Promise<CheckContentResult> {
    const payload = { message };
    return this.post<CheckContentResult>('/CheckSmsContent', payload);
  }

  // #endregion

  // #region Private Methods

  /**
   * ارسال درخواست POST به API
   */
  private async post<T>(endpoint: string, payload: object): Promise<T> {
    const url = this.baseUrl.replace(/\/+$/, '') + endpoint;

    // استفاده از fetch که در همه محیط‌ها کار می‌کند
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseText = await response.text();

      if (!response.ok) {
        throw new NiazpardazApiError(
          `خطا در ارتباط با سرور: ${response.status}`,
          response.status
        );
      }

      let apiResponse: ApiResponse<T>;
      try {
        apiResponse = JSON.parse(responseText);
      } catch {
        throw new NiazpardazApiError('پاسخ نامعتبر از سرور');
      }

      if (!apiResponse.success) {
        throw new NiazpardazApiError(apiResponse.errorMessage || 'خطای نامشخص');
      }

      return apiResponse.result;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof NiazpardazApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new NiazpardazApiError('درخواست به دلیل تایم‌اوت لغو شد');
        }
        throw new NiazpardazApiError(`خطا در ارسال درخواست: ${error.message}`);
      }

      throw new NiazpardazApiError('خطای نامشخص در ارسال درخواست');
    }
  }

  // #endregion
}
