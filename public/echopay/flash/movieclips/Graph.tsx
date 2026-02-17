
'use client';

import * as React from 'react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Icon } from '../../../../app/NX/DesignSystem';
import { useFlash } from '../../../../app/NX/Flash';


export default function Graph() {

  const flash = useFlash();
  const data = flash?.echopayCalculator || {};
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // For demo, Dialog is always open. In real use, control open/close via props or state.
  // Card acquisition cost vs EchoPay over a year
  // Example: CTO = $1,000,000/month, 2,000 transactions/month
  // Consumer Card: 0.4% fee, EchoPay: $0.50/transaction
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const consumerCardMonthly = 1000000 * 0.004; // $4,000
  const echoPayMonthly = 2000 * 0.5; // $1,000
  const chartData = months.map((month, i) => ({
    month,
    consumerCard: consumerCardMonthly * (i + 1),
    echoPay: echoPayMonthly * (i + 1),
  }));

  return (
    <div style={{ width: '100%', height: 300 }}>
      <LineChart width={500} height={300} data={chartData} style={{ width: '100%' }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" label={{ value: 'Month', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'Cumulative Cost ($)', angle: -90, position: 'insideLeft' }} />
        <Tooltip formatter={(value, name) => [`$${value}`, name === 'consumerCard' ? 'Card Acquisition Cost' : 'EchoPay Cost']} />
        <Line type="monotone" dataKey="consumerCard" stroke="#8884d8" strokeWidth={2} name="Card Acquisition Cost" />
        <Line type="monotone" dataKey="echoPay" stroke="#82ca9d" strokeWidth={2} name="EchoPay Cost" />
      </LineChart>
    </div>
  );
}

/*
        <pre>
          data: {JSON.stringify(data, null, 2)}
        </pre>
*/