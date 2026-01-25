This guide is a **hands-on, tutorial-style walkthrough** of the EchoPay API V2.
It is designed to be followed step-by-step using **Postman**, before integrating the API into an application.

By the end of this guide you will be able to:

- Authenticate with the EchoPay API
- Create an ID token
- Create a payment link
- Complete a payment using mock banks
- Retrieve payment status
- Handle webhooks and callbacks

This mirrors a real production integration flow.

## 2. Accounts & Environments

### Development Account

You need a **development account** to use the API.

- Contact: ben@olthem.com
- You will receive login details for the dashboard
- Create API keys from the dashboard

Use the development account **as if you are the merchant**.

### Production Account

Production access requires KYB/KYC checks.

- Contact: oliver@echopay.co.uk
- Recommended to start this process while developing


## 3. Base URLs

Development API base:

```
https://dev.cloud.echopay.co.uk/v2
```

All examples below assume **development**.


## 4. API Response Format

All responses follow the same structure.

### Success

```json
{
  "status": "success",
  "statusCode": 201,
  "data": {},
  "message": ["Id token created"]
}
```

### Error

```json
{
  "status": "error",
  "statusCode": 401,
  "data": null,
  "message": ["Invalid api key"]
}
```

`message` is always an array and may contain multiple messages.

## 5. Step 1 – Create an API Key

From the EchoPay dashboard:

1. Settings → API
2. Create a new key
3. Copy it **once** (it will not be shown again)

This key is used **only** to generate ID tokens.

## 6. Step 2 – Create an ID Token

ID tokens authenticate all other API requests.

### Endpoint

```
POST /token
```

Full URL:

```
https://dev.cloud.echopay.co.uk/v2/token
```

### Headers

| Key        | Value           |
|------------|-----------------|
| ep-api-key | YOUR_API_KEY    |

### Postman Setup

- Method: POST
- Body: none
- Headers only

### Response

```json
{
  "data": {
    "expiriesIn": 3600,
    "idToken": "COPY_THIS_VALUE",
    "tokenType": "Bearer",
    "uid": "example"
  }
}
```

**Save the `idToken`** — it expires after 1 hour.

## 7. Step 3 – Create a Payment Link

Payment links are how customers pay.

### Endpoint

```
POST /links
```

### Headers

| Key           | Value                    |
|---------------|--------------------------|
| Authorization | Bearer YOUR_ID_TOKEN     |

### Body Example

```json
{
  "hideUntilClicked": true,
  "notification": "api",
  "amount": 100,
  "reference": "ORDER123",
  "linkType": "echopay",
  "accountNumber": "1234"
}
```

### Field Notes

- `amount`: GBP, max £25,000
- `reference`: 1–16 chars, no special characters
- `notification`: use `"api"` for callbacks
- `linkType`: `echopay`, `card`, or `echopay-card`

### Response

```json
{
  "data": {
    "id": "3TVgneYlZH9ybiZToJLW",
    "url": "https://webappdev.echopay.co.uk/payment/3TVgneYlZH9ybiZToJLW"
  }
}
```

Open the `url` in a browser to pay.

## 8. Step 4 – Complete a Payment (Mock Banks)

Use **mock banks** to simulate payments.

| Amount | Result        |
|-------:|---------------|
| 101    | SUCCESS       |
| 103    | FAILED        |
| 105    | PROCESSING   |
| 108    | FAILED (NSF) |
| 110    | INITIATED    |

### Recommended Test

- Amount: `101`
- Bank: `mock-redirect`
- Produces a successful payment

## 9. Step 5 – Get Payment Status

### Endpoint

```
GET /links/:id
```

Example:

```
GET https://dev.cloud.echopay.co.uk/v2/links/3TVgneYlZH9ybiZToJLW
```

### Headers

| Key           | Value                |
|---------------|----------------------|
| Authorization | Bearer YOUR_ID_TOKEN |

### Example Status Values

- `PENDING`
- `PROCESSING`
- `SUCCESS`
- `FAILED`
- `INITIATED`

`SUCCESS` is the only guaranteed completion state.

## 10. Webhooks (Recommended)

Webhooks notify your backend without polling.

### Setup

Dashboard → Settings → Notifications

- Enter HTTPS endpoint
- Copy webhook secret

### Payload Example

```json
{
  "id": "payment_id",
  "payment": {
    "status": "SUCCESS",
    "amount": 100,
    "currency": "GBP",
    "type": "echopay"
  },
  "reference": "ORDER123"
}
```

## 11. Webhook Signature Verification

Requests are signed using **HMAC SHA256**.

### Header

```
echopay-signature
```

### Node.js Example

```js
const crypto = require("crypto");

const hmac = crypto.createHmac("sha256", SHARED_SECRET);
hmac.update(rawBody);
const signature = hmac.digest("base64");

if (signature !== req.headers["echopay-signature"]) {
  throw new Error("Invalid signature");
}
```

Always verify before trusting the payload.

## 12. Callbacks (Browser Redirect)

Callbacks return the payer to your site.

### Format

```
https://your-site.com/callback
  ?status=SUCCESS
  &info=Payment%20complete
  &id=PAYMENT_ID
```

### Notes

- Only applied to payments created **after** callback is set
- Failed payments only redirect if user clicks “Back to merchant”

## 13. Common Gotchas

- Production API restricted to UK IPs
- Only GBP → GBP supported
- Tokens expire after 1 hour
- £25,000 payment limit
- Mock banks are debit-only

## 14. Suggested Postman Collection Order

1. Create ID Token
2. Create Payment Link
3. Open Payment URL
4. Get Payment Link by ID
5. Observe webhook/callback

This mirrors real-world usage.

## 15. Next Steps

Once comfortable:

- Integrate into backend
- Add webhook persistence
- Handle retries and failures
- Move to production credentials

**Source:** EchoPay API V2 documentation (May 2025)