import React, { useContext } from "react";
import LogCard from "../../components/LogCard/Index";
import LogCardMobile from "../../components/LogCard/LogCardMobile";
import { mainContext } from "./../../state";

const Contributes = () => {
	const { appState } = useContext(mainContext);
	return (
		<>
			{appState.isMobile ? (
				<>
					<LogCardMobile success contributed />
					<LogCardMobile pending contributed />
				</>
			) : (
				<>
					<LogCard success contributed />
					<LogCard pending contributed />
				</>
			)}
		</>
	);
};

export default Contributes;
