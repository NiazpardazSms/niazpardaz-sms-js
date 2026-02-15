import {
  SendResultCode,
  CreditResultCode,
  SenderNumbersResultCode,
  InboxCountResultCode,
  DeliveryResultCode,
  SmsDeliveryStatus,
  BlacklistResultCode,
  CheckContentResultCode,
  SmsLangType,
  SmsStatusType,
  SmsSendStatusType,
  SmsSendMethodType,
  SmsDirectionType
} from './enums';

/**
 * پاسخ عمومی API
 */
export interface ApiResponse<T> {
  /** آیا درخواست موفق بود؟ */
  success: boolean;
  /** پیام خطا */
  errorMessage?: string;
  /** داده برگشتی */
  result: T;
}

/**
 * نتیجه ارسال پیامک گروهی
 */
export interface SendBatchSmsResult {
  /** شناسه یکتای ارسال گروهی */
  batchSmsId: number;
  /** کد نتیجه */
  resultCode: SendResultCode;
}

/**
 * نتیجه ارسال پیامک LikeToLike
 */
export interface SendLikeToLikeResult {
  /** شناسه پیامک */
  smsId: number;
  /** کد نتیجه */
  resultCode: SendResultCode;
}

/**
 * نتیجه دریافت اعتبار
 */
export interface CreditResult {
  /** اعتبار باقیمانده */
  credit: number;
  /** کد نتیجه */
  resultCode: CreditResultCode;
}

/**
 * نتیجه دریافت شماره‌های ارسال‌کننده
 */
export interface SenderNumbersResult {
  /** لیست شماره‌های فرستنده */
  senders: string[];
  /** کد نتیجه */
  resultCode: SenderNumbersResultCode;
}

/**
 * نتیجه دریافت تعداد پیامک‌های دریافتی
 */
export interface InboxCountResult {
  /** تعداد پیامک‌های دریافتی */
  inboxCount: number;
  /** کد نتیجه */
  resultCode: InboxCountResultCode;
}

/**
 * نتیجه گزارش تحویل
 */
export interface BatchDeliveryResult {
  /** کد نتیجه */
  resultCode: DeliveryResultCode;
  /** لیست شماره‌ها */
  numbers: string[];
  /** وضعیت تحویل هر شماره */
  deliveryStatus: SmsDeliveryStatus[];
}

/**
 * نتیجه استخراج شماره‌های لیست سیاه
 */
export interface BlacklistNumbersResult {
  /** لیست شماره‌های لیست سیاه */
  blackListNumbers: string[];
  /** کد نتیجه */
  resultCode: BlacklistResultCode;
}

/**
 * نتیجه بررسی شماره در لیست سیاه
 */
export interface IsBlacklistResult {
  /** آیا شماره در لیست سیاه است؟ */
  isBlack: boolean;
  /** کد نتیجه */
  resultCode: BlacklistResultCode;
}

/**
 * نتیجه بررسی محتوای پیامک
 */
export interface CheckContentResult {
  /** آیا متن معتبر است؟ */
  isValid: boolean;
  /** کد نتیجه */
  resultCode: CheckContentResultCode;
}

/**
 * اطلاعات پیامک
 */
export interface MessageInfo {
  /** شناسه پیامک */
  messageId: number;
  /** شناسه کاربر */
  userId: number;
  /** تعرفه */
  tariff: number;
  /** متن پیامک */
  content: string;
  /** زمان انجام */
  actionDateTime: string;
  /** مسیر پیام */
  messageType: SmsDirectionType;
  /** فرستنده */
  sender: string;
  /** دریافت کننده */
  receiver: string;
  /** فلش */
  flash: boolean;
  /** تعداد صفحه */
  pages: number;
  /** زبان */
  lang: SmsLangType;
  /** وضعیت پیامک */
  status: SmsStatusType;
  /** وضعیت ارسال پیامک */
  sendStatus: SmsSendStatusType;
  /** روش ارسال */
  sendMethod: SmsSendMethodType;
  /** هزینه */
  cost: number;
  /** عنوان */
  title: string;
  /** تعداد کل */
  count: number;
  /** تعداد ارسال شده */
  sent: number;
  /** توضیحات */
  desc: string;
  /** تعداد ارسال نشده */
  notSent: number;
  /** هزینه برگشت داده شده */
  moneyIsRefunded: boolean;
  /** خوانده شده */
  isRead: boolean;
}

/**
 * نتیجه دریافت پیامک‌ها
 */
export interface MessagesResult {
  /** لیست پیامک‌ها */
  messages: MessageInfo[];
  /** کد نتیجه */
  resultCode: number;
}

/**
 * تنظیمات کلاینت
 */
export interface NiazpardazSmsClientOptions {
  /** آدرس پایه API (اختیاری) */
  baseUrl?: string;
  /** تایم‌اوت درخواست به میلی‌ثانیه (اختیاری) */
  timeout?: number;
}

/**
 * پارامترهای ارسال پیامک تکی
 */
export interface SendSmsParams {
  /** شماره فرستنده */
  fromNumber: string;
  /** شماره گیرنده */
  toNumber: string;
  /** متن پیامک */
  message: string;
  /** آیا فلش باشد؟ */
  isFlash?: boolean;
  /** تاخیر ارسال (ثانیه) */
  sendDelay?: number;
}

/**
 * پارامترهای ارسال پیامک گروهی
 */
export interface SendBulkSmsParams {
  /** شماره فرستنده */
  fromNumber: string;
  /** لیست شماره گیرندگان */
  toNumbers: string[];
  /** متن پیامک */
  message: string;
  /** آیا فلش باشد؟ */
  isFlash?: boolean;
  /** تاخیر ارسال (ثانیه) */
  sendDelay?: number;
}

/**
 * پارامترهای ارسال پیامک LikeToLike
 */
export interface SendLikeToLikeParams {
  /** شماره فرستنده */
  fromNumber: string;
  /** لیست شماره گیرندگان */
  toNumbers: string[];
  /** لیست پیام‌ها (هم‌طول با گیرندگان) */
  messages: string[];
  /** آیا فلش باشد؟ */
  isFlash?: boolean;
}

/**
 * پارامترهای ارسال پیامک صوتی OTP
 */
export interface SendVoiceOtpParams {
  /** شماره فرستنده */
  fromNumber: string;
  /** شماره گیرنده */
  toNumber: string;
  /** کد OTP */
  otp: string;
  /** آیا فلش باشد؟ */
  isFlash?: boolean;
  /** تاخیر ارسال (ثانیه) */
  sendDelay?: number;
}

/**
 * پارامترهای گزارش تحویل گروهی
 */
export interface GetBatchDeliveryParams {
  /** شناسه ارسال گروهی */
  batchSmsId: number;
  /** شماره صفحه */
  pageIndex?: number;
  /** تعداد رکورد در صفحه */
  pageSize?: number;
}

/**
 * پارامترهای دریافت پیامک‌ها
 */
export interface GetMessagesParams {
  /** نوع پیامک */
  messageType: number;
  /** شماره‌های فرستنده (با کاما جدا شده) */
  fromNumbers: string;
  /** شماره صفحه */
  pageIndex?: number;
  /** تعداد رکورد در صفحه */
  pageSize?: number;
}

/**
 * پارامترهای دریافت پیامک‌ها بر اساس بازه زمانی
 */
export interface GetMessagesByDateRangeParams {
  /** نوع پیامک */
  messageType: number;
  /** شماره‌های فرستنده (با کاما جدا شده) */
  fromNumbers: string;
  /** تاریخ شروع */
  fromDate: Date;
  /** تاریخ پایان */
  toDate: Date;
}
