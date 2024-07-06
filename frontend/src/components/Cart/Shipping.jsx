import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Country, State } from "country-state-city";

// icons
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";

// components
import MetaData from "../layout/MetaData";
import CheckoutSteps from "../Cart/CheckoutSteps.jsx";

// actions
import { saveShippingInfo } from "../../actions/cartAction";

// css
import "./Shipping.css";

const Shipping = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const { shippingInfo } = useSelector((state) => state.cart);

	const [address, setAddress] = useState(shippingInfo.address);
	const [city, setCity] = useState(shippingInfo.city);
	const [state, setState] = useState(shippingInfo.state);
	const [country, setCountry] = useState(shippingInfo.country);
	const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
	const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

	const shippingSubmit = () => {};

	return (
		<>
			<MetaData title="Shipping | Trendify" />

			<CheckoutSteps activeStep={1} />

			<div className="shippingContainer">
				<div className="shippingBox">
					<h2 className="shippingHeading">Shipping Details</h2>

					<form
						className="shippingForm"
						encType="multipart/form-data"
						onSubmit={shippingSubmit}
					>
						<div>
							<HomeIcon />
							<input
								type="text"
								placeholder="Address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</div>

						<div>
							<LocationCityIcon />
							<input
								type="text"
								placeholder="City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
							/>
						</div>

						<div>
							<PinDropIcon />
							<input
								type="number"
								placeholder="Pin Code"
								value={pinCode}
								onChange={(e) => setPinCode(e.target.value)}
								required
							/>
						</div>

						<div>
							<PhoneIcon />
							<input
								type="number"
								placeholder="Phone Number"
								value={phoneNo}
								onChange={(e) => setPhoneNo(e.target.value)}
								size={10}
								required
							/>
						</div>

						<div>
							<PublicIcon />
							<select
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							>
								<option value="">Country</option>
								{Country &&
									Country.getAllCountries().map((country) => (
										<option value={country.isoCode} key={country.isoCode}>
											{country.name}
										</option>
									))}
							</select>
						</div>

						{country && (
							<div>
								<TransferWithinAStationIcon />
								<select
									value={state}
									onChange={(e) => setState(e.target.value)}
								>
									<option value="">State</option>
									{State &&
										State.getStatesOfCountry(country).map((item) => (
											<option value={item.isoCode} key={item.isoCode}>
												{item.name}
											</option>
										))}
								</select>
							</div>
						)}

						<input
							type="submit"
							value="Continue"
							className="shippingBtn"
							disabled={state ? false : true}
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default Shipping;
