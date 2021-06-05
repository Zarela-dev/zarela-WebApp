import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router';
import { Buffer } from 'buffer';
import { create } from 'ipfs-http-client';
import OrderDetails from '../components/OrderDetails';
import { web3Context } from '../web3Provider';

const OrderDetailsPage = () => {
	const { id } = useParams();
	const { Web3 } = useContext(web3Context);
	const [order, setOrders] = useState({});
	const sendSignalRef = useRef(null);

	const submitSignal = (e) => {
		if (sendSignalRef !== null) {
			const reader = new FileReader();

			reader.readAsArrayBuffer(sendSignalRef.current.files[0]); // Read Provided File

			reader.onloadend = async () => {
				const ipfs = create(process.env.REACT_APP_IPFS); // Connect to IPFS
				const buf = Buffer(reader.result); // Convert data into buffer

				try {
					const ipfsResponse = await ipfs.add(buf);

					let url = `https://ipfs.io/ipfs/${ipfsResponse.path}`;
					console.log(`Document Of Conditions --> ${url}`);

					// const doc = document.getElementById("_White_Paper");
					Web3.contract.methods.SendFile(order.orderId, order.requesterAddress, ipfsResponse.path)
						.send({ from: Web3.accounts[0], gas: 500000, gasPrice: '30000000000' }, (error, result) => {
							if (!error) {
								alert(JSON.stringify('Transaction Hash is :  ' + result));
							}
							else {
								alert(error.message);
							}
						});
					Web3.contract.events.Contributed({}, function (error, result) {
						if (!error) {
							let returnValues = result.returnValues;
							alert(JSON.stringify('The signal was sent successfully! ' + ' Signal Sending From  :  << ' + returnValues[0] + ' >>' + '   Account Address To  :  << ' + returnValues[2] + ' >>' + ' To Order Number  :  << ' + returnValues[1] + ' >>'));
						}
						else {
							alert(error.message);
						}
					});
				} catch (error) {
					console.error(error);
				}
			};
		}
	};

	useEffect(() => {
		if (Web3.contract !== null) {
			Web3.contract.methods.ord_file(id).call((error, result) => {
				if (!error) {
					const orderTemplate = {
						orderId: result[0],
						title: result[1],
						description: result[6],
						requesterAddress: result[2],
						tokenPay: result[3] / Math.pow(10, 9),
						totalContributors: result[4], // total contributors required
						totalContributed: +result[4] - +result[7],
						categories: result[8], // NOT TO BE USED IN DEMO
						whitePaper: result[5],
						status: result[9] // order status inprogress(false)/done(true)
					};
					setOrders(orderTemplate);
				} else {
					console.error(error.message);
				}
			});
		}
	}, [id, Web3.contract]);

	return (
		<div>
			<OrderDetails order={order} ref={sendSignalRef} submitSignal={submitSignal} />
		</div>
	);
};

export default OrderDetailsPage;
