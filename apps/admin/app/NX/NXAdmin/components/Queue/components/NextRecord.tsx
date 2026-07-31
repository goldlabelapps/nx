'use client';
import * as React from 'react';
import {
    Box,
    Typography,
    IconButton,
    Button,
    Chip,
    LinearProgress,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useNext, useQueue, checkFirestore, askPython, setQueue, deleteRecordById } from '../';
import { CleverText, Icon, } from '../../../../DesignSystem';
import { useDispatch } from '../../../../Uberedux';
import { apolloPrompt, finishJob } from '../';

export default function NextRecord() {

    const AUTO_DELETE_SECONDS = 5;

    const dispatch = useDispatch();
    const next = useNext();
    const queue = useQueue();
    const fullName = next ? `${next.first_name} ${next.last_name}` : '';
    const identityName = next ? `${next.first_name ?? ''} ${next.last_name ?? ''}`.trim() : '';
    const proDescription = next ? `${next.job}${next.company ? ` @ ${next.company}` : ''}` : '';
    const profileURL = (next?.linkedin || next?.linkedin_url || next?.profileURL || next?.profile_url || '').trim();
    const prompt = apolloPrompt({ profileURL, name: identityName, email: next?.email ?? null });
    const hasLinkedInLink = Boolean(next && profileURL);
    const pythonResponse = queue?.pythonResponse;
    const hasExistingFirebaseRecord = Boolean(queue?.firebase?.match);
    const isSaving = Boolean(queue?.saving);
    const hasSuccessfulInitialFetch = queue?.queueFetchSucceeded === true;
    const isReadyForPython = Boolean(identityName && profileURL);
    const hasPythonResponse = Boolean(pythonResponse);
    const isAutoQueueEnabled = Boolean(
        queue?.autoqueue
        ?? queue?.autoQueue
        ?? queue?.auto_queue,
    );
    const isPromptInFlight = Boolean(
        hasSuccessfulInitialFetch
        && isReadyForPython
        && queue?.fetching
        && !hasPythonResponse,
    );
    const lastAutoPromptRef = React.useRef('');
    const lastQueueItemKeyRef = React.useRef('');
    const autoSaveTimeoutRef = React.useRef<number | null>(null);
    const lastAutoSaveQueueItemRef = React.useRef('');
    const [showSavePreview, setShowSavePreview] = React.useState(false);
    const [cachedProposedSaveDoc, setCachedProposedSaveDoc] = React.useState<any>(null);
    const [elapsedSeconds, setElapsedSeconds] = React.useState(0);
    const [confirmDelete, setConfirmDelete] = React.useState(false);
    const [isDeletingBrokenRecord, setIsDeletingBrokenRecord] = React.useState(false);
    const [autoDeleteCountdown, setAutoDeleteCountdown] = React.useState(AUTO_DELETE_SECONDS);
    const recordId = next
        ? (next.id ?? next._id ?? next.queue_id ?? next.queueId ?? null)
        : null;
    const queueItemKey = next
        ? String(
            next.id
            ?? next._id
            ?? next.queue_id
            ?? next.queueId
            ?? profileURL
            ?? identityName
        )
        : '';

    // Check if record has empty critical fields (is broken)
    const isBrokenRecord = next && [
        next.first_name,
        next.last_name,
        next.linkedin,
        next.email,
        next.company,
        next.job,
    ].every(field => !field || (typeof field === 'string' && !field.trim()));

    const parseJsonFromString = React.useCallback((value: string) => {
        const trimmed = value.trim();
        const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
        const jsonCandidate = fencedMatch ? fencedMatch[1].trim() : trimmed;
        try {
            return JSON.parse(jsonCandidate);
        } catch {
            return null;
        }
    }, []);

    const responseContent = typeof pythonResponse === 'string'
        ? pythonResponse
        : pythonResponse?.data?.completion ?? pythonResponse?.completion ?? pythonResponse?.data ?? pythonResponse ?? '';
    const prettyResponse = typeof responseContent === 'string'
        ? responseContent
        : JSON.stringify(responseContent, null, 2);

    const parsedProspect = React.useMemo(() => {
        if (!responseContent) return null;
        if (typeof responseContent === 'string') return parseJsonFromString(responseContent);
        if (typeof responseContent === 'object') return responseContent;
        return null;
    }, [responseContent, parseJsonFromString]);

    const isGoodResponse = !!parsedProspect && typeof parsedProspect === 'object' && !Array.isArray(parsedProspect);

    const formatFieldLabel = React.useCallback((key: string) =>
        key
            .replace(/[_-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .replace(/\b\w/g, (c) => c.toUpperCase()), []);

    const normalizeKey = React.useCallback((key: string) => key.replace(/[_\s-]/g, '').toLowerCase(), []);

    const shouldHideDisplayField = React.useCallback((key: string) => {
        const normalized = normalizeKey(key);
        return normalized === 'career'
            || normalized === 'careers'
            || normalized === 'name'
            || normalized === 'fullname'
            || normalized === 'company'
            || normalized === 'avatar'
            || normalized === 'email'
            || normalized === 'avatarurl'
            || normalized === 'score'
            || normalized === 'job'
            || normalized === 'education'
            || normalized === 'age'
            || normalized === 'companywebsite'
            || normalized === 'summary';
    }, [normalizeKey]);

    const sortDisplayFields = React.useCallback((a: [string, unknown], b: [string, unknown]) => {
        const aKey = normalizeKey(a[0]);
        const bKey = normalizeKey(b[0]);
        const aIsCompany = aKey === 'company';
        const bIsCompany = bKey === 'company';
        const aIsJob = aKey === 'job';
        const bIsJob = bKey === 'job';
        const aIsEducation = aKey === 'education';
        const bIsEducation = bKey === 'education';
        const aIsAge = aKey === 'age';
        const bIsAge = bKey === 'age';

        if (aIsCompany && !bIsCompany) return -1;
        if (!aIsCompany && bIsCompany) return 1;
        if (aIsJob && !bIsJob) return -1;
        if (!aIsJob && bIsJob) return 1;
        if (aIsEducation && !bIsEducation) return -1;
        if (!aIsEducation && bIsEducation) return 1;
        if (aIsAge && !bIsAge) return -1;
        if (!aIsAge && bIsAge) return 1;
        return 0;
    }, [normalizeKey]);

    const formatEducationValue = React.useCallback((value: unknown): string | null => {
        const toEducationString = (item: unknown): string | null => {
            if (!item || typeof item !== 'object') return null;
            const entry = item as Record<string, unknown>;
            const degree = entry.degree ? String(entry.degree).trim() : '';
            const institution = entry.institution ? String(entry.institution).trim() : '';
            const location = entry.location ? String(entry.location).trim() : '';
            const year = entry.year ? String(entry.year).trim() : '';

            const parts = [degree, institution, location, year].filter(Boolean);
            return parts.length ? parts.join(', ') : null;
        };

        if (Array.isArray(value)) {
            const all = value.map(toEducationString).filter((v): v is string => Boolean(v));
            return all.length ? all.join(' | ') : null;
        }

        return toEducationString(value);
    }, []);

    const educationWithAgeText = React.useMemo(() => {
        if (!isGoodResponse || !parsedProspect) return null;

        const entries = Object.entries(parsedProspect as Record<string, unknown>);
        const educationValue = entries.find(([key]) => normalizeKey(key) === 'education')?.[1];
        const ageValue = entries.find(([key]) => normalizeKey(key) === 'age')?.[1];

        const educationText = formatEducationValue(educationValue);
        const ageText = ageValue == null ? '' : String(ageValue).trim();

        if (educationText && ageText) return `${educationText}, Estimated age ${ageText}`;
        if (educationText) return educationText;
        if (ageText) return `Estimated age ${ageText}`;
        return null;
    }, [formatEducationValue, isGoodResponse, normalizeKey, parsedProspect]);

    const renderPrettyValue = React.useCallback((value: unknown) => {
        if (value == null) return 'N/A';
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return String(value);
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        return JSON.stringify(value, null, 2);
    }, []);

    const renderStructuredValue = React.useCallback((value: unknown, depth = 0): React.ReactNode => {
        if (value == null) {
            return <Typography variant="body1">N/A</Typography>;
        }

        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            return <Typography variant="body1">{String(value)}</Typography>;
        }

        if (Array.isArray(value)) {
            if (!value.length) {
                return <Typography variant="body1">None</Typography>;
            }

            const allSimple = value.every((item) => item == null || ['string', 'number', 'boolean'].includes(typeof item));
            if (allSimple) {
                return <Typography variant="body1">{value.map((item) => String(item)).join(', ')}</Typography>;
            }

            return (
                <Box sx={{ pl: depth ? 1.5 : 0, borderLeft: depth ? 1 : 0, borderColor: 'divider' }}>
                    {value.map((item, idx) => (
                        <Box key={`${idx}-${typeof item}`} sx={{ mb: 1 }}>
                            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.25 }}>
                                Item {idx + 1}
                            </Typography>
                            {renderStructuredValue(item, depth + 1)}
                        </Box>
                    ))}
                </Box>
            );
        }

        if (typeof value === 'object') {
            const entries = Object.entries(value as Record<string, unknown>)
                .filter(([subKey]) => !shouldHideDisplayField(subKey));
            if (!entries.length) {
                return <Typography variant="body1">None</Typography>;
            }

            return (
                <Box sx={{ pl: depth ? 1.5 : 0, borderLeft: depth ? 1 : 0, borderColor: 'divider' }}>
                    {entries.map(([subKey, subValue]) => (
                        <Box key={subKey} sx={{ mb: 1 }}>
                            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 0.25 }}>
                                {formatFieldLabel(subKey)}
                            </Typography>
                            {renderStructuredValue(subValue, depth + 1)}
                        </Box>
                    ))}
                </Box>
            );
        }

        return (
            <Typography component="pre" variant="body1" sx={{ whiteSpace: 'pre-wrap', m: 0 }}>
                {renderPrettyValue(value)}
            </Typography>
        );
    }, [formatFieldLabel, renderPrettyValue, shouldHideDisplayField]);

    const scoreEntry = React.useMemo(() => {
        if (!isGoodResponse || !parsedProspect) return null;
        return Object.entries(parsedProspect as Record<string, unknown>)
            .find(([key]) => normalizeKey(key) === 'score') || null;
    }, [isGoodResponse, normalizeKey, parsedProspect]);

    const scorePercent = React.useMemo(() => {
        const rawValue = scoreEntry?.[1];
        if (rawValue == null) return null;

        let numeric: number | null = null;

        if (typeof rawValue === 'number' && Number.isFinite(rawValue)) {
            numeric = rawValue;
        } else if (typeof rawValue === 'string') {
            const parsed = Number.parseFloat(rawValue.replace('%', '').trim());
            numeric = Number.isFinite(parsed) ? parsed : null;
        }

        if (numeric == null) return null;

        const normalized = numeric >= 0 && numeric <= 1 ? numeric * 100 : numeric;
        return Math.max(0, Math.min(100, normalized));
    }, [scoreEntry]);

    const scoreMeta = React.useMemo(() => {
        if (scorePercent == null) return null;
        if (scorePercent >= 85) return { label: '' };
        if (scorePercent >= 75) return { label: '' };
        if (scorePercent >= 60) return { label: '' };
        if (scorePercent >= 45) return { label: '' };
        if (scorePercent >= 30) return { label: '' };
        return { label: 'Low relevance' };
    }, [scorePercent]);

    const getHeatColor = React.useCallback((score: number, isDarkMode: boolean) => {
        if (score >= 85) return isDarkMode ? '#7dffb3' : '#1e8e3e';
        if (score >= 75) return isDarkMode ? '#67ee9e' : '#2fa24c';
        if (score >= 60) return isDarkMode ? '#57d68a' : '#43b25f';
        if (score >= 45) return isDarkMode ? '#9fa8ad' : '#7c8a90';
        if (score >= 30) return isDarkMode ? '#b0b7bd' : '#97a1a7';
        return isDarkMode ? '#c1c7cc' : '#adb6bc';
    }, []);

    const proposedSaveDoc = React.useMemo(() => {
        if (!isGoodResponse || !parsedProspect) return null;
        return {
            ...(parsedProspect as Record<string, unknown>),
            linkedin: profileURL,
            source: {
                type: 'python-queue',
                generatedAt: new Date().toISOString(),
            },

        };
    }, [isGoodResponse, parsedProspect, profileURL, identityName]);

    React.useEffect(() => {
        if (proposedSaveDoc) {
            setCachedProposedSaveDoc(proposedSaveDoc);
            setShowSavePreview(true);
            dispatch(setQueue('proposedSaveDoc', proposedSaveDoc));
        }
    }, [dispatch, proposedSaveDoc]);

    React.useEffect(() => {
        if (proposedSaveDoc) return;
        setShowSavePreview(false);
        setCachedProposedSaveDoc(null);
        dispatch(setQueue('proposedSaveDoc', null));
    }, [dispatch, proposedSaveDoc]);

    const handleOpenLinkedIn = () => {
        if (profileURL) {
            window.open(profileURL, '_blank');
        }
    };

    React.useEffect(() => {
        if (next) dispatch(checkFirestore());
    }, [dispatch, next]);

    React.useEffect(() => {
        if (!queueItemKey) {
            lastQueueItemKeyRef.current = '';
            return;
        }

        if (lastQueueItemKeyRef.current && lastQueueItemKeyRef.current !== queueItemKey) {
            dispatch(setQueue('pythonResponse', null));
        }

        lastQueueItemKeyRef.current = queueItemKey;
    }, [dispatch, queueItemKey]);

    React.useEffect(() => {
        lastAutoPromptRef.current = '';
    }, [next]);

    React.useEffect(() => {
        if (!isPromptInFlight) {
            setElapsedSeconds(0);
            return;
        }

        const startedAt = Date.now();
        setElapsedSeconds(0);
        const intervalId = window.setInterval(() => {
            const seconds = Math.floor((Date.now() - startedAt) / 1000);
            setElapsedSeconds(seconds);
        }, 250);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [isPromptInFlight, queueItemKey]);

    const handleDeleteBrokenRecord = React.useCallback(async (id: number | string | null | undefined) => {
        if (id == null || isDeletingBrokenRecord) return;

        setIsDeletingBrokenRecord(true);
        try {
            await dispatch(deleteRecordById(id));
        } finally {
            setIsDeletingBrokenRecord(false);
        }
    }, [dispatch, isDeletingBrokenRecord]);

    React.useEffect(() => {
        if (!isBrokenRecord || recordId == null) return;
        setAutoDeleteCountdown(AUTO_DELETE_SECONDS);
    }, [AUTO_DELETE_SECONDS, isBrokenRecord, queueItemKey, recordId]);

    React.useEffect(() => {
        if (!isBrokenRecord || recordId == null) return;
        if (isDeletingBrokenRecord) return;

        if (autoDeleteCountdown <= 1) {
            void handleDeleteBrokenRecord(recordId);
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setAutoDeleteCountdown((prev) => Math.max(1, prev - 1));
        }, 1000);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [
        autoDeleteCountdown,
        handleDeleteBrokenRecord,
        isBrokenRecord,
        isDeletingBrokenRecord,
        recordId,
    ]);

    React.useEffect(() => {
        if (!hasSuccessfulInitialFetch) return;
        if (!isReadyForPython || !prompt) return;
        if (queue?.fetching) return;
        if (hasPythonResponse) return;
        if (lastAutoPromptRef.current === prompt) return;

        lastAutoPromptRef.current = prompt;
        dispatch(askPython(prompt));
    }, [dispatch, hasSuccessfulInitialFetch, prompt, queue?.fetching, hasPythonResponse, isReadyForPython]);

    React.useEffect(() => {
        if (autoSaveTimeoutRef.current != null) {
            window.clearTimeout(autoSaveTimeoutRef.current);
            autoSaveTimeoutRef.current = null;
        }

        if (!isAutoQueueEnabled) return;
        if (!queueItemKey) return;
        if (!hasPythonResponse) return;
        if (!proposedSaveDoc) return;
        if (isSaving) return;
        if (isBrokenRecord) return;
        if (lastAutoSaveQueueItemRef.current === queueItemKey) return;

        autoSaveTimeoutRef.current = window.setTimeout(() => {
            lastAutoSaveQueueItemRef.current = queueItemKey;
            dispatch(finishJob());
            autoSaveTimeoutRef.current = null;
        }, 5000);

        return () => {
            if (autoSaveTimeoutRef.current != null) {
                window.clearTimeout(autoSaveTimeoutRef.current);
                autoSaveTimeoutRef.current = null;
            }
        };
    }, [
        dispatch,
        hasPythonResponse,
        isAutoQueueEnabled,
        isBrokenRecord,
        isSaving,
        proposedSaveDoc,
        queueItemKey,
    ]);

    if (isBrokenRecord){
        return (
            <>
                {isPromptInFlight && (
                    <Box sx={{ px: 1.5, pb: 1 }}>
                        <LinearProgress />
                    </Box>
                )}
                <Button
                    variant="contained"
                    color="error"
                    disabled={isSaving || isDeletingBrokenRecord}
                    onClick={() => void handleDeleteBrokenRecord(recordId)}
                >
                    {isDeletingBrokenRecord
                        ? 'Deleting...'
                        : `Auto deleting in ${autoDeleteCountdown} second${autoDeleteCountdown === 1 ? '' : 's'}... Delete now`}
                </Button>
            </>
        );
    }

    return (
        <>
            <Box sx={{
                display: 'flex',
            }}>
                
                {hasLinkedInLink && (
                    <Box sx={{ml:1}}>
                        <IconButton color="primary" onClick={handleOpenLinkedIn} disabled={isSaving}>
                            <Icon icon="linkedin" />
                        </IconButton>
                    </Box>
                )}
                <Typography variant="h6" sx={{ mt: 1, ml: 1}}>
                    {fullName}
                </Typography>
            </Box>
            {/* <Box sx={{ mx:1.5, my:1 }}>
                <Typography variant="body1" color="textSecondary">
                    {proDescription}
                </Typography>
            </Box> */}

            {isPromptInFlight && (
                <Box
                    sx={{
                        px: 1.5,
                        py: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    
                    {recordId && (
                        confirmDelete ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="error"
                                    disabled={isSaving}
                                    onClick={() => {
                                        setConfirmDelete(false);
                                        dispatch(deleteRecordById(recordId));
                                    }}
                                >
                                    Confirm kill {recordId}
                                </Button>
                                <Button
                                    size="small"
                                    variant="text"
                                    onClick={() => setConfirmDelete(false)}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        ) : null
                    )}
                    <Typography variant="caption" sx={{ whiteSpace: 'nowrap', ml:1 }}>
                        {elapsedSeconds} sec{elapsedSeconds === 1 ? '' : 's'}
                    </Typography>
                    <Box sx={{ flex: 1, minWidth: 120 }}>
                        <LinearProgress />
                    </Box>
                    {isAutoQueueEnabled && (
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<Icon icon="stop" />}
                            onClick={() => dispatch(setQueue('autoqueue', false))}
                        >
                            End Auto
                        </Button>
                    )}
                    {/* Fallback warning button after 30s */}
                    {isPromptInFlight && elapsedSeconds >= 30 && !confirmDelete && (
                        <IconButton
                            color='primary'
                            aria-label={`Kill ${recordId}`}
                            onClick={() => setConfirmDelete(true)}
                            sx={{ opacity: 0.5, '&:hover': { opacity: 1 }, ml: 2 }}
                        >
                            <Icon icon="warning" />
                        </IconButton>
                    )}
                </Box>
            )}

            {!!pythonResponse && (
                <>
                <Box sx={{ mt: 1, overflow: 'hidden' }}>
                    <Box sx={{ px: 2, py: 1.5 }}>
                        {isGoodResponse ? (
                            <>
                                {scorePercent != null && scoreMeta && (
                                    <Box
                                        sx={(theme) => ({
                                            ...(function () {
                                                const heat = getHeatColor(
                                                    scorePercent,
                                                    theme.palette.mode === 'dark',
                                                );
                                                return {
                                                    borderColor: theme.palette.mode === 'dark'
                                                        ? alpha(heat, 0.82)
                                                        : alpha(heat, 0.28),
                                                    bgcolor: theme.palette.mode === 'dark'
                                                        ? `linear-gradient(140deg, ${alpha(heat, 0.34)} 0%, ${alpha(heat, 0.16)} 45%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
                                                        : alpha(heat, 0.08),
                                                    boxShadow: theme.palette.mode === 'dark'
                                                        ? `0 0 0 1px ${alpha(heat, 0.52)} inset, 0 0 26px ${alpha(heat, 0.34)}`
                                                        : 'none',
                                                };
                                            })(),
                                            mb: 2,
                                            p: 1.5,
                                            borderRadius: 1,
                                        })}
                                    >
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                                            <Typography
                                                variant="h3"
                                                sx={(theme) => ({
                                                    ...(function () {
                                                        const heat = getHeatColor(
                                                            scorePercent,
                                                            theme.palette.mode === 'dark',
                                                        );
                                                        return {
                                                            color: heat,
                                                            textShadow: theme.palette.mode === 'dark'
                                                                ? `0 0 16px ${alpha(heat, 0.45)}`
                                                                : 'none',
                                                        };
                                                    })(),
                                                    fontWeight: 800,
                                                    lineHeight: 1,
                                                })}
                                            >
                                                {Math.round(scorePercent)}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={(theme) => ({
                                                    color: getHeatColor(
                                                        scorePercent,
                                                        theme.palette.mode === 'dark',
                                                    ),
                                                    fontWeight: 700,
                                                })}
                                            >
                                                %
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={(theme) => ({
                                                    color: getHeatColor(
                                                        scorePercent,
                                                        theme.palette.mode === 'dark',
                                                    ),
                                                    fontWeight: 700,
                                                })}
                                            >
                                                {scoreMeta.label}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ my: 1 }}>
                                            <Box
                                                sx={(theme) => ({
                                                    ...(function () {
                                                        const heat = getHeatColor(
                                                            scorePercent,
                                                            theme.palette.mode === 'dark',
                                                        );
                                                        return {
                                                            bgcolor: theme.palette.mode === 'dark'
                                                                ? alpha(heat, 0.24)
                                                                : alpha(heat, 0.16),
                                                            boxShadow: theme.palette.mode === 'dark'
                                                                ? `inset 0 0 10px ${alpha(heat, 0.32)}`
                                                                : 'none',
                                                        };
                                                    })(),
                                                    height: 10,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                })}
                                            >
                                                <Box
                                                    sx={(theme) => ({
                                                        ...(function () {
                                                            const heat = getHeatColor(
                                                                scorePercent,
                                                                theme.palette.mode === 'dark',
                                                            );
                                                            return {
                                                                bgcolor: heat,
                                                                boxShadow: theme.palette.mode === 'dark'
                                                                    ? `0 0 14px ${alpha(heat, 0.6)}`
                                                                    : 'none',
                                                            };
                                                        })(),
                                                        height: '100%',
                                                        width: `${scorePercent}%`,
                                                        transition: 'width 1500ms ease',
                                                    })}
                                                />
                                            </Box>
                                        </Box>
                                    </Box>
                                )}

                                {Object.entries(parsedProspect as Record<string, unknown>)
                                    .filter(([key]) => !shouldHideDisplayField(key))
                                    .sort(sortDisplayFields)
                                    .map(([key, value]) => (
                                    <Box key={key} sx={{ mb: 1.5 }}>
                                        {(() => {
                                            const normalizedKey = normalizeKey(key);
                                            
                                            if (normalizedKey === 'tags') {
                                                const tags = Array.isArray(value)
                                                    ? value.map((item) => String(item ?? '').trim()).filter(Boolean)
                                                    : String(value ?? '')
                                                        .split(',')
                                                        .map((item) => item.trim())
                                                        .filter(Boolean);

                                                // Find category value from parsedProspect
                                                let categoryValue: string | null = null;
                                                if (parsedProspect && typeof parsedProspect === 'object') {
                                                    const entries = Object.entries(parsedProspect as Record<string, unknown>);
                                                    const categoryEntry = entries.find(([k]) => normalizeKey(k) === 'category');
                                                    if (categoryEntry) {
                                                        const catVal = categoryEntry[1];
                                                        if (typeof catVal === 'string') {
                                                            categoryValue = catVal.trim();
                                                        } else if (Array.isArray(catVal)) {
                                                            categoryValue = catVal.map((v) => String(v ?? '').trim()).filter(Boolean).join(', ');
                                                        }
                                                    }
                                                }

                                                if (!tags.length && !categoryValue) return null;

                                                return (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                                                        {categoryValue && (
                                                            <Chip label={categoryValue} color="primary" variant="outlined" size="small" sx={{ fontWeight: 600 }} />
                                                        )}
                                                        {tags.map((tag) => (
                                                            <Chip key={tag} label={tag} size="small" />
                                                        ))}
                                                    </Box>
                                                );
                                            }

                                           
                                        })()}
                                    </Box>
                                    ))}

                                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        
                                        <FormControlLabel
                                            sx={{ whiteSpace: 'nowrap', mr: 0 }}
                                            control={
                                                <Checkbox
                                                    checked={isAutoQueueEnabled}
                                                    onChange={(e) => dispatch(setQueue('autoqueue', e.target.checked))}
                                                    size="small"
                                                />
                                            }
                                            label={
                                                <Typography variant="caption">
                                                    Auto
                                                </Typography>
                                            }
                                        />
                                        <Button
                                            variant="outlined"
                                            endIcon={<Icon icon="right" />}
                                            color="primary"
                                            disabled={isSaving}
                                            onClick={() => dispatch(finishJob())}
                                        >
                                            {isSaving
                                                ? 'Saving...'
                                                : hasExistingFirebaseRecord
                                                    ? 'Update Prospect'
                                                    : 'Next'}
                                        </Button>
                                    </Box>

                                    
                                    {recordId && isBrokenRecord && (
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            disabled={isSaving || isDeletingBrokenRecord}
                                            onClick={() => void handleDeleteBrokenRecord(recordId)}
                                        >
                                            {isDeletingBrokenRecord ? 'Deleting...' : `Delete ${recordId}?`}
                                        </Button>
                                    )}
                                </Box>
                            </>
                        ) : (
                            <Typography component="pre" variant="body1" sx={{ whiteSpace: 'pre-wrap', m: 0 }}>
                                {prettyResponse}
                            </Typography>
                        )}
                    </Box>
                </Box>
                
            </>
            )}

            {/* <pre>linkedin: {JSON.stringify(profileURL, null, 2)}</pre> */}
        </>
    );
}
