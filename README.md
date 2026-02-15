# NiazpardazSms SDK for JavaScript/TypeScript

کتابخانه رسمی JavaScript/TypeScript برای کار با API پیامکی نیازپرداز

[![npm](https://img.shields.io/npm/v/niazpardazsms.svg)](https://www.npmjs.com/package/niazpardazsms)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## سازگاری

این پکیج با تمام فریمورک‌ها و محیط‌های JavaScript/TypeScript سازگار است:

- ✅ **Node.js** (14+)
- ✅ **TypeScript**
- ✅ **JavaScript** (ES6+)
- ✅ **React** / **React Native**
- ✅ **Next.js**
- ✅ **Angular**
- ✅ **Vue.js** / **Nuxt.js**
- ✅ **NestJS**
- ✅ **Express.js**
- ✅ **Deno** (با تنظیمات مناسب)

## نصب

### npm
```bash
npm install niazpardazsms
```

### yarn
```bash
yarn add niazpardazsms
```

### pnpm
```bash
pnpm add niazpardazsms
```

## شروع سریع

### TypeScript / ES Modules
```typescript
import { NiazpardazSmsClient, SendResultCode } from 'niazpardazsms';

// ساخت کلاینت با API Key
const client = new NiazpardazSmsClient('YOUR_API_KEY');

// ارسال پیامک
const result = await client.send(
  '10001234',      // شماره فرستنده
  '09123456789',   // شماره گیرنده
  'سلام از نیازپرداز!'
);

if (result.resultCode === SendResultCode.SendWasSuccessful) {
  console.log(`BatchSmsId: ${result.batchSmsId}`);
}
```

### CommonJS (Node.js)
```javascript
const { NiazpardazSmsClient, SendResultCode } = require('niazpardazsms');

const client = new NiazpardazSmsClient('YOUR_API_KEY');

async function sendSms() {
  const result = await client.send('10001234', '09123456789', 'سلام!');
  console.log(result);
}

sendSms();
```

## امکانات

### ارسال پیامک تکی

```typescript
const result = await client.send(
  '10001234',      // شماره فرستنده
  '09123456789',   // شماره گیرنده
  'متن پیامک',
  false,           // isFlash (اختیاری)
  null             // sendDelay (اختیاری)
);

console.log(`شناسه ارسال: ${result.batchSmsId}`);
console.log(`وضعیت: ${result.resultCode}`);
```

### ارسال گروهی (یک متن به چند شماره)

```typescript
const result = await client.sendBulk(
  '10001234',
  ['09123456789', '09198765432'],
  'پیام گروهی',
  false  // isFlash
);

console.log(`شناسه ارسال: ${result.batchSmsId}`);
```

### ارسال LikeToLike (هر شماره پیام مخصوص خودش)

```typescript
const result = await client.sendLikeToLike(
  '10001234',
  ['09123456789', '09198765432'],
  ['سلام علی جان', 'سلام رضا جان']
);

console.log(`SmsId: ${result.smsId}`);
```

### ارسال پیامک صوتی OTP

```typescript
const result = await client.sendVoiceOtp(
  '10001234',
  '09123456789',
  '12345'
);

console.log(`شناسه ارسال: ${result.batchSmsId}`);
```

### گزارش تحویل ارسال گروهی

```typescript
import { DeliveryResultCode } from 'niazpardazsms';

const delivery = await client.getBatchDelivery(123456, 1, 100);

if (delivery.resultCode === DeliveryResultCode.Success) {
  for (let i = 0; i < delivery.numbers.length; i++) {
    console.log(`${delivery.numbers[i]}: ${delivery.deliveryStatus[i]}`);
  }
}
```

### گزارش تحویل ارسال LikeToLike

```typescript
const delivery = await client.getDeliveryLikeToLike(789);

if (delivery.resultCode === DeliveryResultCode.Success) {
  for (let i = 0; i < delivery.numbers.length; i++) {
    console.log(`${delivery.numbers[i]}: ${delivery.deliveryStatus[i]}`);
  }
}
```

### اعتبار

```typescript
import { CreditResultCode } from 'niazpardazsms';

const credit = await client.getCredit();
if (credit.resultCode === CreditResultCode.Success) {
  console.log(`اعتبار: ${credit.credit}`);
}
```

### شماره‌های فرستنده

```typescript
const senders = await client.getSenderNumbers();
for (const sender of senders.senders) {
  console.log(sender);
}
```

### تعداد پیامک‌های دریافتی

```typescript
const inboxCount = await client.getInboxCount(false);
console.log(`تعداد: ${inboxCount.inboxCount}`);
```

### لیست پیامک‌ها

```typescript
const messageResult = await client.getMessages(1, '10001234', 1, 50);

if (messageResult.resultCode === 0) {
  for (const message of messageResult.messages) {
    console.log(`متن پیامک: ${message.content}`);
  }
}
```

### دریافت پیامک‌ها بر اساس بازه زمانی

```typescript
const messageResult = await client.getMessagesByDateRange(
  1,
  '10001234',
  new Date('2024-01-01'),
  new Date('2024-01-31')
);

if (messageResult.resultCode === 0) {
  for (const message of messageResult.messages) {
    console.log(`متن پیامک: ${message.content}`);
  }
}
```

### لیست سیاه مخابرات (بررسی یک شماره)

```typescript
const isBlack = await client.numberIsInTelecomBlacklist('09123456789');
console.log(`در لیست سیاه: ${isBlack.isBlack}`);
```

### لیست سیاه مخابرات (استخراج شماره‌های لیست سیاه از یک لیست)

```typescript
import { BlacklistResultCode } from 'niazpardazsms';

const blacklist = await client.extractTelecomBlacklistNumbers([
  '09123456789',
  '09198765432',
  '09351234567'
]);

if (blacklist.resultCode === BlacklistResultCode.Success) {
  for (const number of blacklist.blackListNumbers) {
    console.log(number);
  }
}
```

### بررسی محتوای پیامک

```typescript
const check = await client.checkSmsContent('متن پیامک تست');
console.log(`متن معتبر است: ${check.isValid}`);
```

---

## کدهای نتیجه

### کدهای نتیجه ارسال (SendResultCode)

| کد | مقدار | توضیحات |
|---:|-------|--------:|
| 0 | SendWasSuccessful | ارسال موفق ✅ |
| 1 | InvalidUserNameOrPassword | نام کاربر یا رمز نامعتبر |
| 2 | UserBlocked | کاربر مسدود |
| 3 | InvalidSenderNumber | شماره فرستنده نامعتبر |
| 4 | LimitationInDailySend | محدودیت روزانه |
| 5 | LimitationInRecieverCount | حداکثر 1000 گیرنده |
| 6 | SenderLineIsInactive | خط غیرفعال |
| 7 | SmsContentFilteredWordsIsIncluded | کلمات فیلتر شده |
| 8 | NoCredit | اعتبار ناکافی |
| 9 | SystemBeingUpdated | در حال بروزرسانی |
| 10 | WebServiceNoActive | وب سرویس غیرفعال |
| 11 | NotImplemented | پیاده سازی نشده |
| 12 | LikeToLikeSendReceiverAndMessageCountShouldEqual | تعداد پیام و شماره نابرابر |
| 13 | LimitationInMesssageContentCount | حداکثر 100 پیام |
| 14 | UserTariffNotDetermined | تعرفه تعریف نشده |
| 15 | DuplicateSendSms | ارسال تکراری |
| 16 | InvalidNumberEmptyOrBlackList | شماره نامعتبر یا بلاک لیست |
| 17 | TextNotFound | متن خالی |
| 18 | NotValidTemplateFound | مغایرت با قالب |
| 19 | UserExpired | کاربر منقضی |
| 20 | UserIsNotActive | کاربر غیرفعال |
| 21 | InvalidParameters | پارامتر نامعتبر |
| 22 | IpBlocked | آی پی بلاک شده |
| 23 | EnqueueFailed | خطا در صف ارسال |
| 24 | DuplicateRequestThreshold | درخواست تکراری |
| 25 | InvalidApiKey | ApiKey نامعتبر |
| 26 | ErrorCreateVoiceFile | خطا در ساخت فایل صوتی |

### کدهای نتیجه گزارش تحویل (DeliveryResultCode)

| کد | مقدار | توضیحات |
|---:|-------|--------:|
| 0 | Success | موفق ✅ |
| -1 | ServiceConnectionError | خطا در ارتباط با سرویس دهنده |
| -2 | InvalidBatchSmsId | پیام با این کد وجود ندارد |
| -3 | ReportExpired | مهلت یک هفته ای گزارش پایان یافته |
| -4 | MessageInQueue | پیام در صف ارسال مخابرات است |
| -5 | TooEarly | حداقل یک دقیقه بعد از ارسال اقدام نمایید |
| -6 | IpBlocked | آی پی بلاک شده |
| -7 | InvalidApiKey | ApiKey نامعتبر |

### وضعیت تحویل پیامک (SmsDeliveryStatus)

| کد | مقدار | توضیحات |
|---:|-------|--------:|
| 0 | SentToTelecom | ارسال شده به مخابرات |
| 1 | Delivered | رسیده به گوشی ✅ |
| 2 | NotDelivered | نرسیده به گوشی |
| 3 | SmsFailed | خطای مخابراتی |
| 4 | UnknownError | خطای نامشخص |
| 5 | ReceivedByTelecom | رسیده به مخابرات |
| 6 | NotReceivedByTelecom | نرسیده به مخابرات |
| 7 | BlackListed | مسدود شده توسط مقصد |
| 8 | Unknown | نامشخص |
| 9 | RejectedByTelecom | مخابرات پیام را مردود اعلام کرد |
| 10 | Canceled | کنسل شده توسط اپراتور |
| 11 | NotSent | ارسال نشده |
| 12 | NoTelegram | تلگرام ندارد |
| 13 | InQueue | در صف ارسال |

---

## مدیریت خطا

```typescript
import { NiazpardazSmsClient, NiazpardazApiError, SendResultCode } from 'niazpardazsms';

const client = new NiazpardazSmsClient('YOUR_API_KEY');

try {
  const result = await client.send('10001234', '09123456789', 'تست');
  
  if (result.resultCode !== SendResultCode.SendWasSuccessful) {
    console.log(`خطا: ${result.resultCode}`);
  }
} catch (error) {
  if (error instanceof NiazpardazApiError) {
    console.log(`خطای API: ${error.message}`);
    console.log(`کد خطا: ${error.errorCode}`);
  } else {
    console.log(`خطای نامشخص: ${error}`);
  }
}
```

---

## تنظیمات پیشرفته

### تنظیمات سفارشی

```typescript
const client = new NiazpardazSmsClient('YOUR_API_KEY', {
  baseUrl: 'https://custom-url.com/api',  // آدرس سفارشی (اختیاری)
  timeout: 60000  // تایم‌اوت به میلی‌ثانیه (اختیاری)
});
```

---

## استفاده در فریمورک‌های مختلف

### Next.js (App Router)

```typescript
// app/api/send-sms/route.ts
import { NiazpardazSmsClient } from 'niazpardazsms';
import { NextResponse } from 'next/server';

const client = new NiazpardazSmsClient(process.env.NIAZPARDAZ_API_KEY!);

export async function POST(request: Request) {
  const { phone, message } = await request.json();
  
  const result = await client.send('10001234', phone, message);
  
  return NextResponse.json(result);
}
```

### NestJS

```typescript
// sms.service.ts
import { Injectable } from '@nestjs/common';
import { NiazpardazSmsClient } from 'niazpardazsms';

@Injectable()
export class SmsService {
  private client: NiazpardazSmsClient;

  constructor() {
    this.client = new NiazpardazSmsClient(process.env.NIAZPARDAZ_API_KEY!);
  }

  async sendOtp(phone: string, code: string) {
    return this.client.send('10001234', phone, `کد تایید شما: ${code}`);
  }
}
```

### Express.js

```javascript
const express = require('express');
const { NiazpardazSmsClient } = require('niazpardazsms');

const app = express();
const client = new NiazpardazSmsClient(process.env.NIAZPARDAZ_API_KEY);

app.post('/send-sms', async (req, res) => {
  const { phone, message } = req.body;
  const result = await client.send('10001234', phone, message);
  res.json(result);
});
```

### React (با API Route)

```typescript
// استفاده در کامپوننت React
async function sendSms(phone: string, message: string) {
  const response = await fetch('/api/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, message })
  });
  return response.json();
}
```

### Angular

```typescript
// sms.service.ts
import { Injectable } from '@angular/core';
import { NiazpardazSmsClient } from 'niazpardazsms';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private client = new NiazpardazSmsClient('YOUR_API_KEY');

  async send(phone: string, message: string) {
    return this.client.send('10001234', phone, message);
  }
}
```

---

## TypeScript Types

تمام تایپ‌ها به صورت خودکار export می‌شوند:

```typescript
import type {
  SendBatchSmsResult,
  SendLikeToLikeResult,
  CreditResult,
  SenderNumbersResult,
  InboxCountResult,
  BatchDeliveryResult,
  BlacklistNumbersResult,
  IsBlacklistResult,
  CheckContentResult,
  MessageInfo,
  MessagesResult,
  NiazpardazSmsClientOptions
} from 'niazpardazsms';
```

---

## مجوز

MIT License

## پشتیبانی

- 📚 مستندات: https://niazpardaz-sms.com/webservice
- 🐛 گزارش باگ: [GitHub Issues](https://github.com/NiazpardazSms/niazpardaz-sms-js/issues)
