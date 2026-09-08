# Notify

## @goldlabelapps/notify

A channel-neutral notification contract and dispatcher for Goldlabel applications.

The package does not depend on a vendor SDK. Integrations provide an adapter for
one of the supported channels: `email`, `whatsapp`, `slack`, `pwa-push`,
`firebase`, `sms`, `in-app`, or `webhook`.

```ts
import {
	NotificationDispatcher,
	type NotificationProvider,
} from "@goldlabelapps/notify";

const emailProvider: NotificationProvider = {
	channel: "email",
	async send(request) {
		// Call the email service here.
		return {
			channel: request.channel,
			acceptedAt: new Date().toISOString(),
		};
	},
};

const notifications = new NotificationDispatcher([emailProvider]);

await notifications.send({
	channel: "email",
	to: "person@example.com",
	subject: "Welcome",
	body: "Thanks for signing up.",
});
```

Provider adapters are responsible for authentication, retries, vendor-specific
payloads, delivery status webhooks, and translating provider responses into a
`NotificationResult`.

## Development

- `pnpm build` compiles the package to `dist/`.
- `pnpm type-check` runs TypeScript without emitting files.
