"use client";
import React from "react";
import {
	Avatar,
	Button,
	Box,
} from '@mui/material';
import { useDispatch } from '../../Uberedux';
import { addTerminalMessage, initPayment } from '../../EchoPay';

const mockItems = [
	{
		name: 'Magento T-Shirt',
		price: '$19.99',
		qty: 2,
		img: 'https://cdn-icons-png.flaticon.com/512/892/892458.png',
	},
	{
		name: 'Magento Mug',
		price: '$9.99',
		qty: 1,
		img: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
	},
	{
		name: 'Magento Cap',
		price: '$14.99',
		qty: 1,
		img: 'https://cdn-icons-png.flaticon.com/512/892/892462.png',
	},
	{
		name: 'Magento Water Bottle',
		price: '$12.99',
		qty: 1,
		img: 'https://cdn-icons-png.flaticon.com/512/3075/3075975.png',
	},
];
const total = '$77.95';

const PayNow: React.FC = () => {
	const dispatch = useDispatch();

	const handlePayNow = () => {
		// dispatch(addTerminalMessage(`Initiating payment of ${total} via EchoPay...`));
		dispatch(initPayment());
	};

	return (
		<Box component="section">
			<Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: 2, p: 2 }}>
				{mockItems.map((item, idx) => (
					<Box key={idx} display="flex" alignItems="center" mb={2}>
						<Box component="img" src={item.img} alt={item.name} sx={{ width: 48, height: 48, bgcolor: '#fff', border: '1px solid #eee', borderRadius: 2, mr: 2 }} />
						<Box flexGrow={1}>
							<Box sx={{ fontWeight: 600, color: '#222' }}>{item.name}</Box>
							<Box sx={{ color: '#888', fontSize: 14 }}>Qty: {item.qty}</Box>
						</Box>
						<Box sx={{ color: '#ee672f', fontWeight: 700, fontSize: 16 }}>{item.price}</Box>
					</Box>
				))}
				<Box display="flex" justifyContent="space-between" alignItems="center" mt={2} mb={2}>
					<Box sx={{ fontWeight: 700, color: '#333', fontSize: 18 }}>Total</Box>
					<Box sx={{ fontWeight: 700, color: '#ee672f', fontSize: 20 }}>{total}</Box>
				</Box>
				<Box mt={3}>
					<Button
						onClick={handlePayNow}
						variant="contained"
						color="primary"
						fullWidth
						startIcon={<Avatar sx={{ width: 16, height: 16 }} src="/echopay/favicon/favicon.webp" />}
					>
						Pay with EchoPay
					</Button>
				</Box>
			</Box>
		</Box>
	);
};

export default PayNow;
