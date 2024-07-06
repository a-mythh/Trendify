// packages
import {
	configureStore,
	combineReducers,
	applyMiddleware,
} from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

// reducers
import {
	productReducer,
	productDetailsReducer,
} from "./reducers/productReducer";
import {
	forgotPasswordReducer,
	profileReducer,
	userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
	products: productReducer,
	productDetails: productDetailsReducer,
	user: userReducer,
	profile: profileReducer,
	forgotPassword: forgotPasswordReducer,
	cart: cartReducer,
});

let initialState = {
	cart: {
		cartItems: localStorage.getItem("cartItems")
			? JSON.parse(localStorage.getItem("cartItems"))
			: [],
		shippingInfo: localStorage.getItem("shippingInfo")
			? JSON.parse(localStorage.getItem("shippingInfo"))
			: [],
	},
};

const middleware = [thunk];

const store = configureStore({
	reducer: reducer,
	preloadedState: initialState,
	devTools: applyMiddleware(...middleware),
});

export default store;
