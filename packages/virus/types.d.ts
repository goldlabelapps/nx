export type JsonLike =
	| string
	| number
	| boolean
	| null
	| JsonLike[]
	| { [key: string]: JsonLike };

export type VirusProfileObject = Record<string, JsonLike | unknown>;

export type VirusGeoRecord = {
	city?: string;
	district?: string;
	state_prov?: string;
	state_code?: string;
	country_name?: string;
	country_name_official?: string;
	country_code2?: string;
	country_code3?: string;
	country_emoji?: string;
	continent_name?: string;
	continent_code?: string;
	latitude?: number | string;
	longitude?: number | string;
	lat?: number | string;
	lon?: number | string;
	zipcode?: string;
	ip?: string;
	calling_code?: string;
	connection_type?: string;
	isp?: string;
	organization?: string;
	country_flag?: string;
	is_eu?: boolean;
	time_zone?: Record<string, unknown>;
	currency?: Record<string, unknown>;
} & Record<string, unknown>;

export type VirusDeviceInfo = {
	ua: string;
	browser: string;
	browserVersion?: string;
	os: string;
	osVersion?: string;
	platform: string;
	vendor: string;
	isMobile: boolean;
	languages: string[];
	device: {
		vendor?: string;
		model?: string;
		type?: string;
	};
	cpu: string;
	engine: {
		name?: string;
		version?: string;
	};
	model?: string;
	modelCode?: string;
};

export type VirusFingerprintSignals = {
	userAgent: string;
	language: string;
	languages: string[];
	platform: string;
	timezone: string;
	colorDepth: number;
	pixelRatio: number;
	screen: string;
	hardwareConcurrency: number;
	maxTouchPoints: number;
	doNotTrack: string;
};

export type VirusFingerprintRecord = {
	id: string;
	fingerprintId: string;
	name: string;
	avatar: string;
	created: number;
	updated: number;
	createdAt?: unknown;
	updatedAt?: unknown;
	device: VirusDeviceInfo;
	geo?: VirusGeoRecord;
	signals: VirusFingerprintSignals;
	traits: VirusProfileObject;
	founder: VirusProfileObject;
	meta: VirusProfileObject;
};

export type CreateFingerprintIdOptions = {
	visitorId?: string;
	forceRefresh?: boolean;
	storageKey?: string;
};

export type FetchVirusGeoOptions = {
	enabled?: boolean;
	apiKey?: string;
	endpoint?: string;
	timeoutMs?: number;
};

export type RegisterFingerprintOptions = {
	collectionName?: string;
	fingerprintId?: string;
	visitorId?: string;
	storageKey?: string;
	traits?: VirusProfileObject;
	founder?: VirusProfileObject;
	meta?: VirusProfileObject;
	name?: string;
	avatar?: string;
	fetchGeo?: FetchVirusGeoOptions | boolean;
};

export type SubscribeToFingerprintOptions = {
	collectionName?: string;
};

export type UpdateFingerprintOptions = {
	collectionName?: string;
};
