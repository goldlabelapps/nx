import type { T_UbereduxDispatch } from '../../types';
import type { T_ApolloDoc } from '../types'
import { setUbereduxKey } from '../../Uberedux';
import { setProspects, bus } from '../../Prospects';
import { setFeedback } from '../../DesignSystem';

export const sendAnalysis = (
        prospect: T_ApolloDoc,
        analysis: any,
        to: string
) => async (dispatch: T_UbereduxDispatch) => {
        try {
                const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}resend`;
                dispatch((dispatch, getState) => {
                        const current = getState().redux.prospects?.isSending || {};
                        dispatch(setProspects('isSending', { ...current, [prospect.id]: true }));
                });

                const subject = `Analysis of ${prospect.first_name} ${prospect.last_name}`;
                // Transform analysis object into a beautiful, Gmail-friendly HTML email
                const html = `
<div style=\"font-family: 'Segoe UI', Arial, sans-serif; background: #fafbfc; padding: 32px; color: #222; max-width: 600px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #eee;\">
    <h2 style=\"margin: 0 0 8px 0; color: #364450; font-size: 24px;\">Prospects°</h2>
    <div style=\"color: #555; font-size: 16px; margin-bottom: 16px;\">
        <strong>${prospect.first_name} ${prospect.last_name}</strong><br/>
        ${prospect.title ? prospect.title + ' at ' : ''}${prospect.company_name || ''}
    </div>

    <p style=\"font-size: 13px; color: #333; margin-bottom: 24px;\">${analysis.summary}</p>

    <div style=\"margin-bottom: 18px;\">
        <h4 style=\"margin: 0 0 4px 0; font-size: 15px; color: #222;\">Prospect Score</h4>
        <p style=\"margin: 0 0 8px 0; color: #444; font-size: 13px;\">${analysis.prospect_score} / 100 (Grade: <strong>${analysis.prospect_grade}</strong>)</p>
    </div>
    <div style=\"margin-bottom: 18px;\">
        <h4 style=\"margin: 0 0 4px 0; font-size: 15px; color: #222;\">Recommendation</h4>
        <p style=\"margin: 0 0 8px 0; color: #444; font-size: 13px;\">${analysis.recommendation}</p>
    </div>

    <div style=\"margin-bottom: 18px;\">
        <h4 style=\"margin: 0 0 4px 0; font-size: 15px; color: #222;\">Role Inference</h4>
        <p style=\"margin: 0 0 8px 0; color: #444; font-size: 13px;\">${analysis.role_inference}</p>
    </div>
    <div style=\"margin-bottom: 18px;\">
        <h4 style=\"margin: 0 0 4px 0; font-size: 15px; color: #222;\">Seniority Level</h4>
        <p style=\"margin: 0 0 8px 0; color: #444; font-size: 13px; text-transform: capitalize;\">${analysis.seniority_level}</p>
    </div>
    <div style=\"margin-bottom: 18px;\">
        <h4 style=\"margin: 0 0 4px 0; font-size: 15px; color: #222;\">Decision Power</h4>
        <p style=\"margin: 0 0 8px 0; color: #444; font-size: 13px; text-transform: capitalize;\">${analysis.decision_power}</p>
    </div>

    <div style=\"margin-bottom: 18px;\">
        <h4 style=\"margin: 0 0 4px 0; font-size: 15px; color: #222;\">Key Priorities</h4>
        <ul style=\"color: #444; font-size: 13px;\">
            ${(analysis.key_priorities || []).map((item: string) => `<li>${item}</li>`).join('')}
        </ul>
    </div>
    <div style=\"margin-bottom: 18px;\">
        <h4 style=\"margin: 0 0 4px 0; font-size: 15px; color: #222;\">Likely Pain Points</h4>
        <ul style=\"color: #444; font-size: 13px;\">
            ${(analysis.likely_pain_points || []).map((item: string) => `<li>${item}</li>`).join('')}
        </ul>
    </div>
    <div style=\"margin-bottom: 18px;\">
        <h4 style=\"margin: 0 0 4px 0; font-size: 15px; color: #222;\">Intent Alignment</h4>
        <p style=\"margin: 0 0 8px 0; color: #444; font-size: 13px;\">${analysis.intent_alignment}</p>
    </div>

    <hr style=\"border: none; border-top: 1px solid #eee; margin: 24px 0 16px 0;\" />
    <div style=\"color: #aaa; font-size: 13px;\">Sent with Prospects° by <a href=\"https://goldlabel.pro\" style=\"color: #364450; text-decoration: none; font-weight: bold;\">NX°</a></div>
</div>
`;
        const payload = { to, subject, html };
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        await response.json();

        dispatch(setFeedback({
            severity: 'success',
            title: `Analysis sent to ${to}`,
        }));

        dispatch((dispatch, getState) => {
            const current = getState().redux.prospects?.isRating || {};
            const updated = { ...current };
            delete updated[prospect.id];
            dispatch(setProspects('isRating', updated));
        });
        dispatch(bus(prospect.id, true));
    } catch (e) {
        let msg = e instanceof Error ? e.message : String(e);
        if (msg === 'Failed to fetch') {
            const endpoint = `${process.env.NEXT_PUBLIC_PYTHON_URL}resend`;
            msg = `Can't fetch endpoint ${endpoint}`;
        }
        dispatch((dispatch, getState) => {
            const current = getState().redux.prospects?.isRating || {};
            const updated = { ...current };
            delete updated[prospect.id];
            dispatch(setProspects('isRating', updated));
        });
        dispatch(setProspects('error', msg));
        dispatch(setUbereduxKey({ key: 'error', value: msg }));
    }
};
