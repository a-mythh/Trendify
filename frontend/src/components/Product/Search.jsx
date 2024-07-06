import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo 2 r.png";

// css
import "./Search.css";

// components
import MetaData from "../layout/MetaData";

const Search = () => {
	const navigate = useNavigate();
	const [keyword, setKeyword] = useState("");

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/products/${keyword}`);
		} else {
			navigate("/products");
		}
	};

	return (
		<>
			<MetaData title="Search | Trendify" />

			<form className="searchBox" onSubmit={onSubmitHandler}>
				<img src={logo} alt="Logo" />
				<input
					type="text"
					placeholder="Search products..."
					onChange={(e) => setKeyword(e.target.value)}
				/>

				<input type="submit" value="Search" />
			</form>
		</>
	);
};

export default Search;
