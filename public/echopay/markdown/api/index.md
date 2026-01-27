---
order: 38
slug: /api
title: Secure API
description: EchoPay API V2
icon: terminal
tags: echopay, terminal, api
image: https://live.staticflickr.com/65535/55064167984_ec7501758f_b.jpg
---

> EchoPay’s system keeps your most sensitive information locked away, only uses temporary passes for transactions, and ensures that even if something is intercepted, it can’t be misused for long. This is considered best practice for online payments and is trusted by the world’s most secure platforms.

## How it works

The EchoPay API is designed to let websites and apps accept payments securely, using a process that follows industry best practices. Here’s how it works, in simple terms:

- Secret Key Stays Safe: Your business has a special secret key (like a master password). This key is never shared with customers or shown in the browser. It’s only used behind the scenes, on your secure server.

- Short-Lived Passes: When your website needs to start a payment, it uses the secret key to get a temporary “pass” (called a token) from EchoPay. This pass only lasts for a short time (about 1 hour). If someone were to steal it, they could only use it for a very limited time.

- Making a Payment Link: With this temporary pass, your website asks EchoPay to create a payment link for the customer. This link is unique and safe to share with the customer.

- Customer Pays Securely: The customer clicks the link and pays through EchoPay’s secure system. Your secret key is never involved in this step, and the temporary pass is only used by your server.

## Why is this secure?

- The secret key is never exposed to the public or the customer.
- The temporary pass (token) is short-lived, so even if it’s stolen, it quickly becomes useless.
- All communication happens over secure, encrypted connections.
- This method is used by banks and major tech companies because it limits risk and follows security best practices.
