'use client';
import React from "react";
import {
	Avatar,
	Card,
	CardHeader,
	CardActions,
	Button,
	CardContent,
	Typography,
} from '@mui/material';
import { Icon } from '../../DesignSystem';
import { useEchopay, addTerminalMessage, initPayment, setEchoPay } from '../../EchoPay';
import { useDispatch } from '../../Uberedux';
import { mockProducts } from './mockProducts';

const Cart: React.FC = () => {
	const dispatch = useDispatch();
	const { cart, apiPayload } = useEchopay();

	const getTotal = () => {
		if (!cart || !Array.isArray(cart?.items)) return 0;
		return cart.items.reduce((sum: number, item: any) => {
			const price = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price;
			return sum + price * item.quantity;
		}, 0);
	};

	const handleCreateCart = () => {
		const shuffled = [...mockProducts.products].sort(() => Math.random() - 0.5);
		const numProducts = Math.floor(Math.random() * shuffled.length) + 1;
		const selected = shuffled.slice(0, numProducts);
		const items = selected.map((product) => ({
			...product,
			quantity: Math.floor(Math.random() * 3) + 1,
			price: Number(product.price.replace('$', '')),
		}));
		const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
		const cart = { items, total };
		dispatch(addTerminalMessage(`Mock cart created. Total ${total}`));
		dispatch(setEchoPay("cart", cart));

		// Create apiPayload with random reference
		const randomRef = 'ORDER' + Math.floor(100 + Math.random() * 900); // 3 random digits
		const apiPayload = {
			hideUntilClicked: true,
			notification: 'api',
			amount: parseFloat(total.toFixed(2)),
			reference: randomRef,
			linkType: 'echopay',
			accountNumber: 'GOLDLABEL01',
		};
		dispatch(setEchoPay("apiPayload", apiPayload));
	};

	// Pay Now handler
	const handlePayNow = () => {
		dispatch(addTerminalMessage(`Pay now clicked at ${new Date().toISOString()}`));
		if (apiPayload) {
			dispatch(initPayment(apiPayload));
		}
	};

	const isEmpty = !cart || !Array.isArray(cart?.items) || cart.items.length === 0;
	const total = getTotal();

	return (
		<Card variant="outlined" sx={{}}>
			<CardHeader
				avatar={<Icon icon="shop" />}
				title="Mock Magento Shopping Cart"
			// subheader="Create a mock Payment Request"
			/>
			<CardContent>
				<Typography gutterBottom>
					This component simulates a shopping cart in a Magento store. Click the button below to initiate a mock payment process using EchoPay.
				</Typography>
				{/* Random Cart button moved to CardActions below */}

				{isEmpty ? (null) : (
					<>
						<ul style={{ paddingLeft: 0, listStyle: 'none' }}>
							{cart.items.map((item: any, idx: number) => (
								<li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
									<Avatar src={item.img} alt={item.name} sx={{ width: 32, height: 32, mr: 1 }} />
									<span style={{ flex: 1 }}>{item.name} x {item.quantity}</span>
									<span>£{(typeof item.price === 'number' ? item.price * item.quantity : parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
								</li>
							))}
						</ul>
						<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
							<Typography sx={{ fontWeight: 'bold' }}>
								Total: £{total.toFixed(2)}
							</Typography>
						</div>
					</>
				)}

				{/* <pre style={{ padding: '1em', borderRadius: '8px', background: '#f6f6f6', fontSize: 12, marginTop: 16 }}>
					apiPayload: {JSON.stringify(apiPayload, null, 2)}
				</pre> */}
			</CardContent>
			<CardActions>
				<Button
					fullWidth
					startIcon={<Icon icon="reset" />}
					onClick={handleCreateCart}
					variant={cart && apiPayload && !isEmpty ? 'outlined' : 'contained'}
				>
					Randomise Cart
				</Button>
				{cart && apiPayload && !isEmpty && (
					<Button
						onClick={handlePayNow}
						variant="contained"
						color="primary"
						fullWidth
						startIcon={<Avatar sx={{ width: 16, height: 16 }} src="/echopay/favicon/favicon.webp" />}
					>
						Pay with EchoPay
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Cart;