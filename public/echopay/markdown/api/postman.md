---
order: 20
slug: /api/postman
title: Postman
description: Connect to and test the EchoPay API using Postman
icon: terminal
tags: echopay, terminal, Postman, api
---

> This guide will help you connect to and test the EchoPay API using Postman. You will need your API credentials, which can be found or set in your `.env` file (see `.env.example`).

### Importable Postman Collection

To make setup easy for all developers, you can import a ready-made Postman collection:

1. Download or copy the file: `docs/assets/EchoPay.postman_collection.json`
2. In Postman, click **Import** (top left) and select the JSON file.
3. Set your environment variables (`ECHOPAY_APIKEY`, etc.) in Postman.
4. Use the pre-configured requests to test the EchoPay API instantly.

This allows a dev to repeat the process without manual setup.


### Environment Variables

Set these in your Postman environment:

- `ECHOPAY_APIKEY`: Your EchoPay API key
- `ECHOPAY_UID`: Your EchoPay UID (if required)
- `ECHOPAY_EMAIL`: Your EchoPay account email
- `ECHOPAY_PASSWORD`: Your EchoPay password (if required)
- `ECHOPAY_BASEURL`: The EchoPay API base URL (`https://dev.cloud.echopay.co.uk/v2`)

### Setting up Authorization in Postman

To ensure all requests are authenticated correctly, set up the Authorization tab at the collection level:

1. **Select your EchoPay collection in Postman.**
2. Go to the **Authorization** tab.
3. Set **Type** to **API Key**.
4. Enter:
	- **Key:** `x-api-key`
	- **Value:** `{{ECHOPAY_APIKEY}}`
	- **Add to:** `Header`
5. Click **Save**.

This will automatically add your API key to all requests in the collection.

If an endpoint requires Basic Auth (rare, but check API docs):
- Set **Type** to **Basic Auth**
- **Username:** `{{ECHOPAY_EMAIL}}`
- **Password:** `{{ECHOPAY_PASSWORD}}`

If an endpoint requires a Bearer Token (e.g., for ID token):
- Set **Type** to **Bearer Token**
- **Token:** `{{ECHOPAY_IDTOKEN}}`


### Step 1: Create an EchoPay API Key 
1. Log in to the EchoPay dashboard [a2apay.co.uk](https://dev-dashboard.a2apay.co.uk/).
2. Go to **Settings → API**.
3. Create a new API key and copy it. Later add it to your Postman environment as `ECHOPAY_APIKEY`.

### Step 2: Generate an ID Token in Postman
1. In Postman, create a new request:
	 - **Method:** POST
	 - **URL:** `https://dev.cloud.echopay.co.uk/v2/token`
	 - **Headers:**
		 - `ep-api-key: {{ECHOPAY_APIKEY}}`
	 - **Body:** None
2. Send the request. Copy the `idToken` from the response and set it as a variable in your Postman environment (e.g., `ECHOPAY_IDTOKEN`).


### Step 3: Create a Payment Link
1. Create a new request:
	 - **Method:** POST
	 - **URL:** `https://dev.cloud.echopay.co.uk/v2/links`
	 - **Headers:**
		 - `Authorization: Bearer {{ECHOPAY_IDTOKEN}}`
	 - **Body:** (raw JSON)
		 ```json
		 {
			 "hideUntilClicked": true,
			 "notification": "api",
			 "amount": 101,
			 "reference": "ORDER123",
			 "linkType": "echopay",
			 "accountNumber": "1234"
		 }
		 ```
2. Send the request. Copy the `url` from the response and open it in your browser to simulate a payment.

### Step 4: Simulate Payment (Mock Banks)
Use the payment link and select a mock bank. For testing, use `amount: 101` for a successful payment.

### Step 5: Check Payment Status
1. Create a new request:
	 - **Method:** GET
	 - **URL:** `https://dev.cloud.echopay.co.uk/v2/links/{{PAYMENT_ID}}`
	 - **Headers:**
		 - `Authorization: Bearer {{ECHOPAY_IDTOKEN}}`
2. Send the request to view the payment status (`SUCCESS`, `FAILED`, etc.).

### Step 6: Webhooks & Callbacks (Optional)
Set up webhooks in the EchoPay dashboard to receive payment notifications. Use the webhook secret for signature verification if needed.

### Common Issues
- Tokens expire after 1 hour; regenerate as needed.
- Only GBP payments are supported.
- Payment limit is £25,000.

**Reference:** See [echopay-api.md](echopay-api.md) for full API details