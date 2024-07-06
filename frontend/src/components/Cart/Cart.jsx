import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// actions
import {
	addItemsToCart,
	removeItemsFromCart,
} from "../../actions/cartAction.jsx";

// components
import CartItemCard from "./CartItemCard.jsx";
import MetaData from "../layout/MetaData.jsx";

// css
import "./Cart.css";
import { useEffect } from "react";

const Cart = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { isAuthenticated } = useSelector((state) => state.user);
	const { cartItems } = useSelector((state) => state.cart);

	const increaseQuantity = (id, quantity, stock) => {
		const newQty = quantity + 1;

		if (stock <= quantity) {
			return;
		}

		dispatch(addItemsToCart(id, newQty));
	};

	const decreaseQuantity = (id, quantity) => {
		const newQty = quantity - 1;

		if (quantity <= 1) {
			return;
		}

		dispatch(addItemsToCart(id, newQty));
	};

	const deleteCartItems = (id) => {
		dispatch(removeItemsFromCart(id));
	};

	const checkoutHandler = () => {
		if (isAuthenticated) {
			navigate("/shipping");
		} else {
			navigate("/login");
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<MetaData title="Cart | Trendify" />
			{cartItems.length === 0 ? (
				<div className="emptyCart">
					<AddShoppingCartIcon />
					<Typography>No products in your cart</Typography>
					<Link to="/products">View Products</Link>
				</div>
			) : (
				<>
					<div className="cartPage">
						<div className="cartHeader">
							<p>Product</p>
							<p>Quantity</p>
							<p>Subtotal</p>
						</div>

						{cartItems &&
							cartItems.map((item) => (
								<div className="cartContainer" key={item.product}>
									<CartItemCard item={item} deleteCartItems={deleteCartItems} />
									<div className="cartInput">
										<button
											onClick={() =>
												decreaseQuantity(item.product, item.quantity)
											}
										>
											-
										</button>
										<input type="number" value={item.quantity} readOnly />
										<button
											onClick={() =>
												increaseQuantity(
													item.product,
													item.quantity,
													item.stock
												)
											}
										>
											+
										</button>
									</div>

									<div className="cartSubtotal">{`₹${
										item.price * item.quantity
									}`}</div>
								</div>
							))}

						<div className="cartTotal">
							<div></div>
							<div className="cartTotalBox">
								<p>Total</p>
								<p>{`₹${cartItems.reduce(
									(acc, item) => acc + item.quantity * item.price,
									0
								)}`}</p>
							</div>
							<div></div>
							<div className="placeOrderBtn">
								<button onClick={checkoutHandler}>Checkout</button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Cart;
