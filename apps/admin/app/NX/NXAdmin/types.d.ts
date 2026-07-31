import type { ReactNode } from 'react';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import type { T_Config } from '../types';

// ─── Geo ─────────────────────────────────────────────────────────────────────

export type T_GeoDstTransition = {
    utc_time?: string;
    dateTimeBefore?: string;
    dateTimeAfter?: string;
    duration?: string;
    overlap?: boolean;
    gap?: boolean;
};

export type T_GeoTimeZone = {
    name?: string;
    offset?: number;
    offset_with_dst?: number;
    current_time?: string;
    current_time_unix?: number;
    is_dst?: boolean;
    dst_exists?: boolean;
    dst_savings?: number;
    current_tz_abbreviation?: string;
    current_tz_full_name?: string;
    standard_tz_abbreviation?: string;
    standard_tz_full_name?: string;
    dst_tz_abbreviation?: string;
    dst_tz_full_name?: string;
    dst_start?: T_GeoDstTransition;
    dst_end?: T_GeoDstTransition;
};

export type T_GeoCurrency = {
    code?: string;
    name?: string;
    symbol?: string;
};

export type T_Geo = {
    ip?: string;
    city?: string;
    district?: string;
    zipcode?: string;
    state_prov?: string;
    state_code?: string;
    country_name?: string;
    country_name_official?: string;
    country_code2?: string;
    country_code3?: string;
    country_capital?: string;
    country_tld?: string;
    country_flag?: string;
    country_emoji?: string;
    continent_name?: string;
    continent_code?: string;
    calling_code?: string;
    languages?: string;
    geoname_id?: string;
    latitude?: string;
    longitude?: string;
    isp?: string;
    organization?: string;
    connection_type?: string;
    is_eu?: boolean;
    currency?: T_GeoCurrency;
    time_zone?: T_GeoTimeZone;
};

export type T_GeoLike = {
    city?: string;
    district?: string;
    state_prov?: string;
    country_name?: string;
    country_name_official?: string;
    country_code2?: string;
    country_emoji?: string;
    continent_name?: string;
};

// ─── Fingerprints ─────────────────────────────────────────────────────────────

export type T_HistoryEntry = {
    timestamp: number;
    title: string;
    description: string;
    featuredImage: string;
    url: string;
    slug: string;
    tenant: string;
    siteName: string;
    favicon: string;
};

export type T_Fingerprint = {
    id: string;
    name: string;
    avatar?: string;
    geo?: T_Geo;
    created: number;
    updated: number;
    history?: T_HistoryEntry[];
    device: {
        platform: string;
        model?: string;
        modelCode?: string;
        vendor: string;
        languages: string[];
        os: string;
        osVersion?: string;
        isMobile: boolean;
        browser: string;
        browserVersion?: string;
        ua?: string;
    };
};

export type T_DeviceSummaryInput = {
    model?: string;
    modelCode?: string;
    isMobile?: boolean;
    vendor?: string;
    browser?: string;
    platform?: string;
    languages?: string[];
};

// ─── NXAdmin ──────────────────────────────────────────────────────────────────

export interface I_NXAdmin {
    config: T_Config;
    children?: ReactNode;
}

// ─── Collection ───────────────────────────────────────────────────────────────

export interface I_Collection {
    collection: string;
    title: string;
    description?: string;
    icon: string;
    single?: string;
    btnMode?: 'icon' | 'button';
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────

export interface I_CreateDoc {
    collection: string;
    icon?: string;
}

export interface I_ReadDoc {
    collection: string;
}

export interface I_UpdateDoc {
    collection: string;
}

export interface I_DeleteDoc {
    collection: string;
}

// ─── TypeScript viewer ────────────────────────────────────────────────────────

export interface I_TypeScript {
    typescript?: any;
    btnMode?: 'icon' | 'button';
    collection?: string;
    cardSubheader?: string;
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export interface I_AppBar extends MuiAppBarProps {
    open?: boolean;
}

// ─── UI ───────────────────────────────────────────────────────────────────────

export interface I_JSONInput {
    label: string;
    collection?: string;
}

// ─── Viruses ──────────────────────────────────────────────────────────────────

/** Virus data entity */
export interface I_Virus {
    name: string;
}

/** Virus component props */
export interface I_VirusProps {
    typescript?: any;
    btnMode?: 'icon' | 'button';
    collection?: string;
    cardSubheader?: string;
}

// ─── Prospects ────────────────────────────────────────────────────────────────

export interface UseProspectCollectionOptions {
    tagSlug?: string | null;
    categorySlug?: string | null;
    orderByField?: string;
    orderDirection?: 'asc' | 'desc';
    searchTerm?: string;
}

// ─── Queue / Prompts ──────────────────────────────────────────────────────────

export type LinkedinPromptArgs = {
    profileURL?: string | null;
    name?: string | null;
    email?: string | null;
};
