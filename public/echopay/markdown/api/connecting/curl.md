---
order: 60
slug: /api/connecting/curl
title: curl
description: Connecting to EchoPay API with curl
icon: terminal
tags: echopay, terminal, curl, api
image: default
---

> Connecting to EchoPay API with curl

## 1. Get your API key
Log in to the EchoPay dashboard and create a new API key (see echopay-api.md for details).
Copy your API key. You’ll need it for authentication.

## 2. Create an ID Token
The first step is to request an ID token, which is required for all other API requests.

### Endpoint
POST https://dev.cloud.echopay.co.uk/v2/token

### Example curl command
Replace YOUR_API_KEY with your actual API key:

```
curl -X POST \
  https://dev.cloud.echopay.co.uk/v2/token \
  -H "ep-api-key: YOUR_API_KEY"
```

### Expected response

A successful response will look like:

```
{
  "status": "success",
  "statusCode": 201,
  "data": {
    "expiriesIn": 3600,
    "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4MmU5NzVlMDdkZmE0OTYwYzdiN2I0ZmMxZDEwZjkxNmRjMmY1NWIiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiR29sZGxhYmVsIEx0ZCIsInR5cGU... (truncated for brevity) ...",
    "tokenType": "Bearer",
    "uid": "goldlabel"
  },
  "message": ["Id token created"]
}
```

Save the `idToken` value. You’ll use it for further API requests. (The value above is truncated for security and readability.)

---

## 4. Create a Payment Link

Now use your `idToken` to create a payment link.

### Endpoint
POST https://dev.cloud.echopay.co.uk/v2/links

### Headers
| Key           | Value                    |
|---------------|--------------------------|
| Authorization | Bearer YOUR_ID_TOKEN     |
| Content-Type  | application/json         |

### Example curl command
Replace `YOUR_ID_TOKEN` with your actual token:

```
curl -X POST https://dev.cloud.echopay.co.uk/v2/links \
  -H "Authorization: Bearer YOUR_ID_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "hideUntilClicked": true,
    "notification": "api",
    "amount": 100,
    "reference": "ORDER123",
    "linkType": "echopay",
    "accountNumber": "1234"
  }'
```

### Example body fields
- `amount`: Amount in minor units (e.g. 100 = £1.00)
- `reference`: Your order or transaction reference
- `accountNumber`: Your EchoPay account number

### Expected response
You’ll receive a JSON response with the payment link details.

## 3. Troubleshooting
If you get an error, check your API key and ensure you’re using the correct endpoint.

---
For more details, see echopay-api.md.
