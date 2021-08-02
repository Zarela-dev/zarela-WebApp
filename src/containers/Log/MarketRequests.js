import React, { useContext } from "react";
import LogCard from "../../components/LogCard/Index";
import LogCardMobile from "../../components/LogCard/LogCardMobile";
import { mainContext } from "../../state";

const MarketRequests = () => {
	const { appState } = useContext(mainContext);
	return (
		<>
		{appState.isMobile ? 
			<LogCardMobile marketRequest />
			:
			<LogCard marketRequest/>
		}
		</>
	);
};

export default MarketRequests;
