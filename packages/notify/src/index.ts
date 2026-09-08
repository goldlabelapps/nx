/** Channels supported by the notification contract. */
export type NotificationChannel =
	| "email"
	| "whatsapp"
	| "slack"
	| "pwa-push"
	| "firebase"
	| "sms"
	| "in-app"
	| "webhook";

export type NotificationRecipient = string | string[];

export interface NotificationRequest<TData = unknown> {
	channel: NotificationChannel;
	to: NotificationRecipient;
	subject?: string;
	body?: string;
	template?: string;
	data?: TData;
	metadata?: Record<string, string>;
}

export interface NotificationResult {
	channel: NotificationChannel;
	acceptedAt: string;
	providerMessageId?: string;
}

export interface NotificationProvider {
	readonly channel: NotificationChannel;
	send<TData>(request: NotificationRequest<TData>): Promise<NotificationResult>;
}

export class NotificationProviderError extends Error {
	readonly channel: NotificationChannel;

	constructor(channel: NotificationChannel, message: string) {
		super(message);
		this.name = "NotificationProviderError";
		this.channel = channel;
	}
}

/** Routes notification requests to the provider registered for each channel. */
export class NotificationDispatcher {
	private readonly providers = new Map<NotificationChannel, NotificationProvider>();

	constructor(providers: Iterable<NotificationProvider> = []) {
		for (const provider of providers) {
			this.register(provider);
		}
	}

	register(provider: NotificationProvider): this {
		this.providers.set(provider.channel, provider);
		return this;
	}

	send<TData>(request: NotificationRequest<TData>): Promise<NotificationResult> {
		const provider = this.providers.get(request.channel);

		if (!provider) {
			throw new NotificationProviderError(
				request.channel,
				`No notification provider registered for ${request.channel}.`,
			);
		}

		return provider.send(request);
	}
}

// Email exports
export * from './email/types';
export * from './email/errors';
export * from './email/templates/basicEmailTemplate';
export * from './email/sendTemplatedEmail';
export * from './email/providers/ResendEmailProvider';

