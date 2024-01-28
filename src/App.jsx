import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
	const [Countries, setCountries] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	useEffect(() => {
		const fetchData = async () => {
			try {
				const url = "https://restcountries.com/v3.1/all";
				const res = await axios(url, {
					method: "GET",
				});
				const data = await res.data;

				setCountries(data);
			} catch (err) {
				console.error("Error fetching data: ", err);
			}
		};
		fetchData();
	});

	return (
		<>
			<nav>
				<input
					type="text"
					id="search"
					value={searchValue}
					placeholder="Search for countries..."
					onChange={(e) => {
						setSearchValue(e.target.value.toLowerCase());
					}}
				/>
			</nav>
			<div className="container">
				{Countries?.map((ele) => {
					const name = ele.name.common;
					if (name.toLowerCase().includes(searchValue) || searchValue === "") {
						return (
							<div key={ele.cca3} className="card">
								<img src={ele.flags.png} alt={`Flag of ${ele.name.common}`} />
								<h4>{ele.name.common}</h4>
							</div>
						);
					}
				})}
			</div>
		</>
	);
};

export default App;
