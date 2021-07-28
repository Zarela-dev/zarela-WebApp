import React, { useContext } from "react";
import LogMobile from "./LogMobile";
import { mainContext } from "../../state";

const Log = () => {
	const { appState } = useContext(mainContext);

	if (appState.device === "Mobile") {
		return <LogMobile />;
	} else {
		return null;
	}
};

export default Log;
