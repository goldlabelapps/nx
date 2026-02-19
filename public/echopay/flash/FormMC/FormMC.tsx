"use client";
import React, { useState } from 'react';
import {
    Box,
} from '@mui/material';
import { useDispatch } from '../../../../app/NX/Uberedux';
import { useFlash, setFlash } from '../../../../app/NX/Flash';
import { VariableMC } from '../';

const FormMC = () => {


    const flash = useFlash();
    const dispatch = useDispatch();
    const { data } = flash?.calculator || {};

    const [cto, setCto] = useState<number | ''>(data?.cto ?? '');
    const [atv, setAtv] = useState<number | ''>(data?.atv ?? '');
    const [biz, setBiz] = useState<number | ''>(data?.biz ?? '');
    const [name, setName] = useState<string | ''>(data?.name ?? '');

    // Update redux calculator object when any value changes
    React.useEffect(() => {
        dispatch(setFlash('calculator', {
            ...flash?.calculator,
            data: {
                ...data,
                cto,
                atv,
                biz,
                name,
            },
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cto, atv, biz, name]);

    // ...existing code...


    return (
        <>

            {/* <pre style={{ padding: '1em', borderRadius: '8px' }}>
                data: {JSON.stringify(data, null, 2)}
            </pre> */}


            <VariableMC
                label="Company Name"
                value={data?.name ?? ''}
                onChange={val => setName(val === '' ? '' : String(val))}
                type="string"
            />

            <VariableMC
                label="Card Turnover / month"
                value={data?.cto ?? ''}
                onChange={val => setCto(val === '' ? '' : Number(val))}
                type="number"
            />
            <VariableMC
                label="Average Transaction Value"
                value={data?.atv ?? ''}
                onChange={val => setAtv(val === '' ? '' : Number(val))}
                type="number"
            />

            <VariableMC
                label="Business Card Percentage"
                value={data?.biz ?? ''}
                onChange={val => setBiz(val === '' ? '' : Number(val))}
                type="number"
            />

        </>
    );
};

export default FormMC;
