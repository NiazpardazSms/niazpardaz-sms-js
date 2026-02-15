/**
 * کدهای نتیجه ارسال پیامک
 */
export enum SendResultCode {
  /** ارسال با موفقیت انجام شد */
  SendWasSuccessful = 0,
  /** نام کاربر یا کلمه عبور نامعتبر می باشد */
  InvalidUserNameOrPassword = 1,
  /** کاربر مسدود شده است */
  UserBlocked = 2,
  /** شماره فرستنده نامعتبر است */
  InvalidSenderNumber = 3,
  /** محدودیت در ارسال روزانه */
  LimitationInDailySend = 4,
  /** تعداد گیرندگان حداکثر 1000 شماره می باشد */
  LimitationInRecieverCount = 5,
  /** خط فرستنده غیرفعال است */
  SenderLineIsInactive = 6,
  /** متن پیامک شامل کلمات فیلتر شده است */
  SmsContentFilteredWordsIsIncluded = 7,
  /** اعتبار کافی نیست */
  NoCredit = 8,
  /** سامانه در حال بروز رسانی است */
  SystemBeingUpdated = 9,
  /** وب سرویس غیرفعال است */
  WebServiceNoActive = 10,
  /** پیاده سازی نشده است */
  NotImplemented = 11,
  /** تعداد پیامها و شماره ها باید یکسان باشد */
  LikeToLikeSendReceiverAndMessageCountShouldEqual = 12,
  /** تعداد پیامها حداکثر 100 پیام می باشد */
  LimitationInMesssageContentCount = 13,
  /** هیچ مقداری برای تعرفه جاری کاربر تعریف نشده است */
  UserTariffNotDetermined = 14,
  /** ارسال تکراری متن مشابه به شماره مشابه در مدت زمان مشخص */
  DuplicateSendSms = 15,
  /** شماره موبایل گیرنده یافت نشد (گیرنده خالی، اشتباه یا بلاک لیست است) */
  InvalidNumberEmptyOrBlackList = 16,
  /** متن وارد نشده است */
  TextNotFound = 17,
  /** متن طبق الگوی تعریف شده نیست */
  NotValidTemplateFound = 18,
  /** کاربر منقضی شده است */
  UserExpired = 19,
  /** وضعیت کاربر فعال نیست */
  UserIsNotActive = 20,
  /** مقدار یکی یا بیشتر از پارامترهای ورودی معتبر نیست */
  InvalidParameters = 21,
  /** آی پی موقت بلاک شده است */
  IpBlocked = 22,
  /** عملیات با خطا مواجه شد. لطفاً دقایقی دیگر مجدداً تلاش نمایید */
  EnqueueFailed = 23,
  /** درخواست کاملا تکراری در بازه کوتاه (چند ثانیه) */
  DuplicateRequestThreshold = 24,
  /** ApiKey نامعتبر */
  InvalidApiKey = 25,
  /** خطا در ساخت فایل صوتی */
  ErrorCreateVoiceFile = 26
}

/**
 * کدهای نتیجه اعتبار
 */
export enum CreditResultCode {
  /** موفق */
  Success = 0,
  /** نام کاربری و رمز عبور صحیح نمی باشد */
  InvalidCredentials = -1,
  /** کاربر غیرفعال می باشد */
  UserDisabled = -2,
  /** Ip موقتا بلاک شده است */
  IpBlocked = -6,
  /** ApiKey نامعتبر */
  InvalidApiKey = -7
}

/**
 * کدهای نتیجه شماره های ارسال کننده
 */
export enum SenderNumbersResultCode {
  /** موفق */
  Success = 0,
  /** نام کاربری و رمز عبور صحیح نمی باشد */
  InvalidCredentials = -1,
  /** کاربر غیرفعال می باشد */
  UserDisabled = -2,
  /** Ip موقتا بلاک شده است */
  IpBlocked = -6,
  /** ApiKey نامعتبر */
  InvalidApiKey = -7
}

/**
 * کدهای نتیجه تعداد پیامک های دریافتی
 */
export enum InboxCountResultCode {
  /** موفق */
  Success = 0,
  /** نام کاربری و رمز عبور صحیح نمی باشد */
  InvalidCredentials = -1,
  /** کاربر غیرفعال می باشد */
  UserDisabled = -2,
  /** Ip موقتا بلاک شده است */
  IpBlocked = -6,
  /** ApiKey نامعتبر */
  InvalidApiKey = -7
}

/**
 * کدهای نتیجه گزارش تحویل
 */
export enum DeliveryResultCode {
  /** موفق */
  Success = 0,
  /** خطا در ارتباط با سرویس دهنده */
  ServiceConnectionError = -1,
  /** پیام با این کد وجود ندارد (batchSmsId نامعتبر است) */
  InvalidBatchSmsId = -2,
  /** مهلت یک هفته ای گرفتن گزارش پایان یافته است */
  ReportExpired = -3,
  /** پیام در صف ارسال مخابرات است، امکان گرفتن گزارش وجود ندارد */
  MessageInQueue = -4,
  /** حداقل یک دقیقه بعد از ارسال اقدام نمایید */
  TooEarly = -5,
  /** Ip موقتا بلاک شده است */
  IpBlocked = -6,
  /** ApiKey نامعتبر */
  InvalidApiKey = -7
}

/**
 * وضعیت تحویل پیامک
 */
export enum SmsDeliveryStatus {
  /** نامشخص */
  None = -10,
  /** ارسال شده به مخابرات */
  SentToTelecom = 0,
  /** رسیده به گوشی */
  Delivered = 1,
  /** نرسیده به گوشی */
  NotDelivered = 2,
  /** خطای مخابراتی */
  SmsFailed = 3,
  /** خطای نامشخص */
  UnknownError = 4,
  /** رسیده به مخابرات */
  ReceivedByTelecom = 5,
  /** نرسیده به مخابرات */
  NotReceivedByTelecom = 6,
  /** مسدود شده توسط مقصد */
  BlackListed = 7,
  /** نامشخص */
  Unknown = 8,
  /** مخابرات پیام را مردود اعلام کرد */
  RejectedByTelecom = 9,
  /** کنسل شده توسط اپراتور */
  Canceled = 10,
  /** ارسال نشده */
  NotSent = 11,
  /** تلگرام ندارد */
  NoTelegram = 12,
  /** در صف ارسال */
  InQueue = 13
}

/**
 * کدهای نتیجه استخراج شماره‌های لیست سیاه
 */
export enum BlacklistResultCode {
  /** عملیات با موفقیت انجام شد */
  Success = 0,
  /** نام کاربری و رمز عبور صحیح نمی باشد */
  InvalidCredentials = -1,
  /** کاربر غیرفعال می باشد */
  UserDisabled = -2,
  /** آرایه شماره های همراه خالی می باشد */
  EmptyNumbersArray = -3,
  /** تعداد شماره ها حداکثر 1000 شماره می باشد */
  MaxNumbersExceeded = -4,
  /** Ip موقتا بلاک شده است */
  IpBlocked = -6,
  /** ApiKey نامعتبر */
  InvalidApiKey = -7
}

/**
 * کدهای نتیجه بررسی محتوای پیامک
 */
export enum CheckContentResultCode {
  /** موفق */
  Success = 0,
  /** نام کاربری و رمز عبور صحیح نمی باشد */
  InvalidCredentials = -1,
  /** کاربر غیرفعال می باشد */
  UserDisabled = -2,
  /** Ip موقتا بلاک شده است */
  IpBlocked = -6,
  /** ApiKey نامعتبر */
  InvalidApiKey = -7
}

/**
 * زبان پیامک
 */
export enum SmsLangType {
  /** نامشخص */
  None = -10,
  /** فارسی */
  Fa = 1,
  /** انگلیسی */
  En = 2
}

/**
 * وضعیت پیامک
 */
export enum SmsStatusType {
  /** نامشخص */
  None = -10,
  /** منتظر تایید */
  Pending = 1,
  /** غیر مجاز */
  Illegal = 2,
  /** در حال ارسال */
  Sending = 3,
  /** تایید نشده */
  NotApproved = 4,
  /** ارسال شده */
  Sent = 5,
  /** انصراف */
  Canceled = 6,
  /** توقف ارسال */
  Error = 7,
  /** مبلغ شارژ جهت ارسال کافی نیست */
  NoCredit = 8,
  /** ارسال نشده */
  NotSent = 9,
  /** منتظر ارسال */
  WaitForSend = 10,
  /** در حال کسر هزینه */
  PendingDecCost = 11,
  /** در صف منتظر ارسال */
  InQueue = 12,
  /** در حال کسر هزینه چند به چند */
  ManyToManyCalcCost = 13
}

/**
 * وضعیت ارسال پیامک
 */
export enum SmsSendStatusType {
  /** نامشخص */
  None = -10,
  /** ارسال شده */
  Sent = 1,
  /** خطای مخابراتی */
  Error = 2,
  /** خط مقصد دریافت از خطوط پیامک را مسدود کرده است */
  BlockList = 3
}

/**
 * روش ارسال
 */
export enum SmsSendMethodType {
  /** نامشخص */
  None = -10,
  /** سریع */
  Quick = 1,
  /** تست */
  Test = 2,
  /** منطقه ای */
  Regional = 3,
  /** گروهی */
  Group = 4,
  /** وب سرویس */
  WebService = 5,
  /** اطلاع رسانی */
  Announcement = 6,
  /** منشی */
  Secretary = 7,
  /** ارسال هوشمند */
  IntelligentSend = 8,
  /** ارسال متناظر */
  CorrespondingSend = 9,
  /** کد خوان */
  CodeReader = 10,
  /** نظرسنجی */
  Poll = 11,
  /** انتقال پیامک */
  Transfer = 12,
  /** پاسخ */
  Reply = 13,
  /** ارسال از دفتر تلفن */
  PhoneBook = 14,
  /** ارسال کد پستی */
  PostalCode = 15,
  /** پیامک مناسبت */
  SmsEvent = 16,
  /** منشی هوشمند */
  IntelligentSecretary = 17,
  /** اضافه به لیست */
  AddToPhoneBook = 18,
  /** پیامک فوری */
  InstantSms = 19,
  /** پیامک زماندار */
  ScheduleSms = 20,
  /** پیامک سررسید */
  UsanceSms = 21,
  /** سن و جنسیت */
  AgeAndGender = 22,
  /** سیستمی */
  System = 23,
  /** ارسال تولد */
  BirthdaySms = 24,
  /** کیوسک */
  KioskSms = 25,
  /** لغو11 */
  CancellationBy11 = 26
}

/**
 * نوع مسیر پیامک
 */
export enum SmsDirectionType {
  /** نامشخص */
  None = -10,
  /** دریافتی */
  In = 1,
  /** ارسالی */
  Out = 2,
  /** زماندار */
  Schedule = 3,
  /** سررسید */
  Usance = 4
}
