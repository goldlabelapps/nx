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

                const subject = `Analysis for ${prospect.first_name} ${prospect.last_name}`;
                // Transform analysis object into a beautiful, Gmail-friendly HTML email
                const html = `
<div style=\"font-family: 'Segoe UI', Arial, sans-serif; background: #fafbfc; padding: 32px; color: #222;\">
    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"max-width: 600px; margin: auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border: 1px solid #eee;\">
        <tr>
            <td style=\"padding: 32px 32px 16px 32px;\">
                <h2 style=\"margin: 0 0 8px 0; color: #2d3748; font-size: 24px;\">Prospect Analysis</h2>
                <div style=\"color: #555; font-size: 16px; margin-bottom: 16px;\">
                    <strong>${prospect.first_name} ${prospect.last_name}</strong><br/>
                    ${prospect.title ? prospect.title + ' at ' : ''}${prospect.company_name || ''}
                </div>
                <div style=\"font-size: 13px; color: #333; margin-bottom: 24px;\">
                    ${analysis.summary}
                </div>
                <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-bottom: 24px;\">
                    <tr>
                        <td style=\"padding: 0 0 8px 0; font-size: 13px;\"><strong>Role Inference:</strong></td>
                        <td style=\"padding: 0 0 8px 0; color: #444;\">${analysis.role_inference}</td>
                    </tr>
                    <tr>
                        <td style=\"padding: 0 0 8px 0; font-size: 13px;\"><strong>Seniority Level:</strong></td>
                        <td style=\"padding: 0 0 8px 0; color: #444; text-transform: capitalize;\">${analysis.seniority_level}</td>
                    </tr>
                    <tr>
                        <td style=\"padding: 0 0 8px 0; font-size: 13px;\"><strong>Decision Power:</strong></td>
                        <td style=\"padding: 0 0 8px 0; color: #444; text-transform: capitalize;\">${analysis.decision_power}</td>
                    </tr>
                    <tr>
                        <td style=\"padding: 0 0 8px 0; font-size: 13px;\"><strong>Prospect Score:</strong></td>
                        <td style=\"padding: 0 0 8px 0; color: #444;\">${analysis.prospect_score} / 100 (Grade: <strong>${analysis.prospect_grade}</strong>)</td>
                    </tr>
                </table>

                <div style=\"margin-bottom: 18px;\">
                    <strong>Key Priorities:</strong>
                    <ul style=\"margin: 8px 0 0 18px; color: #444;\">
                        ${(analysis.key_priorities || []).map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div style=\"margin-bottom: 18px;\">
                    <strong>Likely Pain Points:</strong>
                    <ul style=\"margin: 8px 0 0 18px; color: #444;\">
                        ${(analysis.likely_pain_points || []).map((item: string) => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div style=\"margin-bottom: 18px;\">
                    <strong>Intent Alignment:</strong>
                    <div style=\"margin-top: 6px; color: #444;\">${analysis.intent_alignment}</div>
                </div>
                <div style=\"margin-bottom: 18px;\">
                    <strong>Recommendation:</strong>
                    <div style=\"margin-top: 6px; color: #444;\">${analysis.recommendation}</div>
                </div>
            </td>
        </tr>
        <tr>
            <td style=\"padding: 0 32px 24px 32px; color: #aaa; font-size: 13px;\">
                <hr style=\"border: none; border-top: 1px solid #eee; margin: 24px 0 16px 0;\" />
                <div>Email generated automatically by your Prospects platform.</div>
            </td>
        </tr>
    </table>
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
