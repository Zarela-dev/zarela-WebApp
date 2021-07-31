import React from "react";
import LogCard from "../../components/LogCard/Index";

const Contributes = () => {
	return (
		<>
			<LogCard success contributed />
			<LogCard pending contributed />
		</>
	);
};

export default Contributes;
