import React from "react";
import { Stepper, StepLabel, Step, Typography } from "@mui/material";

// icons
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

// css
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
	const steps = [
		{
			label: <Typography>Shipping Details</Typography>,
			icon: <LocalShippingIcon />,
		},
		{
			label: <Typography>Confirm Order</Typography>,
			icon: <LibraryAddCheckIcon />,
		},
		{
			label: <Typography>Payment</Typography>,
			icon: <AccountBalanceWalletIcon />,
		},
	];

	const stepStyle = {
		boxSizing: "border-box",
		height: "5vmax",
		position: "relative",
		zIndex: "100",
		margin: "3vmax 0vmax",
	};

	return (
		<>
			<Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
				{steps.map((item, index) => (
					<Step
						key={index}
						active={activeStep === index ? true : false}
						completed={activeStep >= index ? true : false}
					>
						<StepLabel
							style={{
								color: activeStep >= index ? "white" : "#be7afd",
							}}
							icon={item.icon}
						>
							{item.label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</>
	);
};

export default CheckoutSteps;
