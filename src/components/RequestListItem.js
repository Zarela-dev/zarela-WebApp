import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Spacer } from './Elements/Spacer';
import { WithPointerCursor } from './Elements/WithPointerCursor';
import {
	ContributorsIcon,
	ContributorBadge,
	TokenIcon,
	RequestNumber,
	BiobitToDollarPair,
	BadgeRow,
	BadgeLabel,
	TokenValue,
	ValueLabel,
	BiobitToDollarValue,
} from './Elements/RequestCard';
import { Typography } from './Elements/Typography';
import biobitIcon from '../assets/icons/biobit-black.svg';
import contributorIcon from '../assets/icons/user-blue.svg';
import RequestFilesTable from './RequestFilesTable';
import { mainContext } from '../state';
import { Button } from './Elements/Button';
import axios from 'axios';
import { Buffer } from 'buffer';
import fileType from 'file-type';
import { useWeb3React } from '@web3-react/core';
import caretUpIcon from '../assets/icons/caret-up.svg';
import caretDownIcon from '../assets/icons/caret-down.svg';
import fulfilledIcon from '../assets/icons/check-green.svg';
import _ from 'lodash';
import { twofish } from 'twofish';

const Wrapper = styled.div`
	background: ${(props) => (props.seen ? '#EDFBF8' : '#EAF2FF')};
	opacity: 0.8;
	border-radius: 8px;
	padding: ${(props) => props.theme.spacing(3)} ${(props) => props.theme.spacing(3.5)};
	margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Header = styled.header`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
`;

const TitleColumn = styled.div`
	display: flex;
	flex: 8;
`;

const DetailsColumn = styled.div`
	display: flex;
	flex: 4;
	justify-content: flex-end;
	height: 35px;
	align-items: center;

	@media (max-width: 768px) {
		align-items: center;
		margin-top: 21px;
		justify-content: center;
	}
`;

const RequestNumberWithPointer = styled(RequestNumber)`
	${WithPointerCursor};
	@media (max-width: 768px) {
		flex: 0 0 44px;
		height: 27px;
		border-radius: 10px 10px 0px 10px;
		padding: 0px 0px;
		margin-right: 8px;
		font-weight: bold;
		background: linear-gradient(246.29deg, #3a68de 12.69%, #3a68de 100%);
		font-size: 16px;
		line-height: 30px;
		color: #ffffff;
		text-align: center;
	}
`;

const Title = styled(Typography)`
	${WithPointerCursor};
	font-size: 16px;
	font-weight: 500;

	@media (max-width: 768px) {
		font-size: 12px;
	}
`;

const TotalBadge = styled.div`
	border: 2px solid ${(props) => props.theme.primary};
	background: transparent;
	min-width: 32px;
	height: 32px;
	padding: ${(props) => props.theme.spacing(0.5)} ${(props) => props.theme.spacing(0.6)};
	border-radius: 5px;

	text-align: center;
	font-weight: bold;
	font-size: 15px;
	line-height: 18px;
	color: ${(props) => props.theme.primary};
`;

const ApprovedBadge = styled.img`
	width: 36px;
`;

const Divider = styled.div`
	width: 1px;
	background: #3c87aa;
	height: 100%;
	margin: 0 ${(props) => props.theme.spacing(1)};
`;

const Body = styled.section``;

const NoContributionMessage = styled.div`
	margin-top: ${(props) => props.theme.spacing(2)};
	margin-left: ${(props) => props.theme.spacing(12)};
`;

const Footer = styled.footer`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

const SubmitButton = styled.button`
	${Button};
	width: 133px;
	height: 35px;
	margin-right: 0;
	margin-top: ${(props) => props.theme.spacing(3)};
	padding: ${(props) => props.theme.spacing(0.5)} ${(props) => props.theme.spacing(1.5)};
	font-weight: 500;
	font-size: 16px;
	line-height: 18px;
`;
const CustomContributeBadge = styled(ContributorBadge)`
	flex: 0 0 auto;
`;

// const EqualSign = styled(BiobitToDollarValue)`
// 	margin: 0 5px;
// `;

const ExpandToggle = styled.img`
	width: 24px;
	margin-left: ${(props) => props.theme.spacing(1.5)};
`;

const RequestListItem = ({
	showContributions,
	total,
	requestID,
	title,
	tokenPay,
	contributors,
	handleConfirm,
	fulfilled,
}) => {
	const [isOpen, setOpen] = useState(false);
	const [unapprovedCount, setUnapprovedCount] = useState(0);
	const { appState } = useContext(mainContext);
	const [formattedData, setFormattedData] = useState({});
	const [selected, setSelected] = useState([]);
	const { account } = useWeb3React();

	const changeAll = (type) => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];
		const all = Object.values(formattedData).reduce((acc, curr) => acc.concat(curr), []);

		all.forEach(({ status, originalIndex }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status)) {
				indexesAlreadyConfirmed.push(originalIndex);
			}
		});

		const selectableIndexes = originalIndexes.filter((index) => !indexesAlreadyConfirmed.includes(index));

		if (type === 'check') {
			setSelected(selectableIndexes);
		}
		if (type === 'uncheck') setSelected([]);
	};

	const isAllChecked = () => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];
		const selectedIndexes = [...selected];
		const all = Object.values(formattedData).reduce((acc, curr) => acc.concat(curr), []);

		all.forEach(({ status, originalIndex }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status) === true) indexesAlreadyConfirmed.push(originalIndex);
		});

		if (_.isEqual([...selectedIndexes, ...indexesAlreadyConfirmed].sort(), originalIndexes.sort())) {
			return true;
		}
		return false;
	};

	const isAllApproved = () => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];
		const all = Object.values(formattedData).reduce((acc, curr) => acc.concat(curr), []);

		all.forEach(({ status, originalIndex }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status) === true) indexesAlreadyConfirmed.push(originalIndex);
		});

		if (_.isEqual(originalIndexes.sort(), indexesAlreadyConfirmed.sort())) return true;
		return false;
	};

	const isBulkApproved = (contributorAddress) => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];

		formattedData[contributorAddress]?.forEach(({ originalIndex, status }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status) === true) {
				indexesAlreadyConfirmed.push(originalIndex);
			}
		});

		if (_.isEqual(indexesAlreadyConfirmed.sort(), originalIndexes.sort())) {
			return true;
		}
		return false;
	};

	const isBulkChecked = (contributorAddress) => {
		const originalIndexes = [];
		const selectedIndexes = [];
		const indexesAlreadyConfirmed = [];

		formattedData[contributorAddress].forEach(({ originalIndex, status }) => {
			originalIndexes.push(originalIndex);
			if (selected.includes(originalIndex)) {
				selectedIndexes.push(originalIndex);
			}
			if (Boolean(status) === true) {
				indexesAlreadyConfirmed.push(originalIndex);
			}
		});

		if (_.isEqual([...selectedIndexes, ...indexesAlreadyConfirmed].sort(), originalIndexes.sort())) {
			return true;
		}
		return false;
	};

	const onBulkChange = (type, contributorAddress) => {
		const originalIndexes = [];
		const indexesAlreadyConfirmed = [];

		formattedData[contributorAddress].forEach(({ originalIndex, status }) => {
			originalIndexes.push(originalIndex);
			if (Boolean(status)) {
				indexesAlreadyConfirmed.push(originalIndex);
			}
		});

		const selectableIndexes = originalIndexes.filter((index) => !indexesAlreadyConfirmed.includes(index));

		if (type === 'check') {
			setSelected((values) => [...values, ...selectableIndexes]);
		}
		if (type === 'uncheck')
			setSelected((values) => values.filter((selectedItem) => !originalIndexes.includes(selectedItem)));
	};

	const onChange = (type, originalIndex) => {
		if (type === 'check') setSelected((values) => [...values, originalIndex]);
		if (type === 'uncheck') setSelected((values) => values.filter((item) => +item !== +originalIndex));
	};
	function download(data, strFileName, strMimeType) {
		var self = window, // this script is only for browsers anyway...
			u = 'application/octet-stream', // this default mime also triggers iframe downloads
			m = strMimeType || u,
			x = data,
			D = document,
			a = D.createElement('a'),
			z = function (a) {
				return String(a);
			},
			B = self.Blob || self.MozBlob || self.WebKitBlob || z,
			BB = self.MSBlobBuilder || self.WebKitBlobBuilder || self.BlobBuilder,
			fn = strFileName || 'download',
			blob,
			b,
			ua,
			fr;

		//if(typeof B.bind === 'function' ){ B=B.bind(self); }

		if (String(this) === 'true') {
			//reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			x = [x, m];
			m = x[0];
			x = x[1];
		}

		//go ahead and download dataURLs right away
		if (String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)) {
			return navigator.msSaveBlob // IE10 can't do a[download], only Blobs:
				? navigator.msSaveBlob(d2b(x), fn)
				: saver(x); // everyone else can save dataURLs un-processed
		} //end if dataURL passed?

		try {
			blob = x instanceof B ? x : new B([x], { type: m });
		} catch (y) {
			if (BB) {
				b = new BB();
				b.append([x]);
				blob = b.getBlob(m); // the blob
			}
		}

		function d2b(u) {
			var p = u.split(/[:;,]/),
				t = p[1],
				dec = p[2] == 'base64' ? atob : decodeURIComponent,
				bin = dec(p.pop()),
				mx = bin.length,
				i = 0,
				uia = new Uint8Array(mx);

			for (i; i < mx; ++i) uia[i] = bin.charCodeAt(i);

			return new B([uia], { type: t });
		}

		function saver(url, winMode) {
			if ('download' in a) {
				//html5 A[download]
				a.href = url;
				a.setAttribute('download', fn);
				a.innerHTML = 'downloading...';
				D.body.appendChild(a);
				setTimeout(function () {
					a.click();
					D.body.removeChild(a);
					if (winMode === true) {
						setTimeout(function () {
							self.URL.revokeObjectURL(a.href);
						}, 250);
					}
				}, 66);
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = D.createElement('iframe');
			D.body.appendChild(f);
			if (!winMode) {
				// force a mime that will download:
				url = 'data:' + url.replace(/^data:([\w\/\-\+]+)/, u);
			}

			f.src = url;
			setTimeout(function () {
				D.body.removeChild(f);
			}, 333);
		} //end saver

		if (navigator.msSaveBlob) {
			// IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fn);
		}

		if (self.URL) {
			// simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		} else {
			// handle non-Blob()+non-URL browsers:
			if (typeof blob === 'string' || blob.constructor === z) {
				try {
					return saver('data:' + m + ';base64,' + self.btoa(blob));
				} catch (y) {
					return saver('data:' + m + ',' + encodeURIComponent(blob));
				}
			}

			// Blob but not URL:
			fr = new FileReader();
			fr.onload = function (e) {
				saver(this.result);
			};
			fr.readAsDataURL(blob);
		}
		return true;
	}
	const signalDownloadHandler = async (fileHash, fileStuffPath) => {
		// Start file download.
		try {
			const fileStuffRes = await axios.get(`${process.env.REACT_APP_IPFS_LINK + fileStuffPath}`);
			// const fileRes = await axios.get(`${process.env.REACT_APP_IPFS_LINK + fileHash}`);
			const fileStuffData = fileStuffRes.data;

			window.ethereum
				.request({
					method: 'eth_decrypt',
					params: [fileStuffData.AES_KEY, account],
				})
				.then((AesDecryptedKey) => {
					var twF = twofish(Object.values(fileStuffData.AES_IV));

					// var decrypted = twF.decryptCBC(
					// 	AesDecryptedKey.split(',').map((item) => Number(item)),
					// 	Buffer.from(fileRes.data)
					// );

					async function _getDownloadUrl(buff) {
						// var byteString = atob(buff);
						// var ab = new ArrayBuffer(byteString.length);
						// var ia = new Uint8Array(ab);
						// var buff = Buffer.from(base64, 'base64');
						// var contributionFileExt = await fileType.fromBuffer(buff);
						// for (var i = 0; i < byteString.length; i++) {
						// 	ia[i] = byteString.charCodeAt(i);
						// }
						function _arrayBufferToBase64(buffer) {
							var binary = '';
							var bytes = new Uint8Array(buffer);
							var len = bytes.byteLength;
							for (var i = 0; i < len; i++) {
								binary += String.fromCharCode(bytes[i]);
							}
							return window.btoa(binary);
						}
						// var base64 = btoa(
						// 	new Uint8Array(decrypted).reduce((data, byte) => data + String.fromCharCode(byte), '')
						// );
						// const mime =
						// 	fileStuffData.FILE_MIMETYPE && fileStuffData.FILE_MIMETYPE.trim().length === 0
						// 		? 'application/octet-stream'
						// 		: `${fileStuffData.FILE_MIMETYPE}`;
						// var blob = new Blob([buff], {
						// 	// type: fileStuffData.FILE_EXT,
						// 	type: mime,
						// });
						// console.log(mime);
						// let href = URL.createObjectURL(blob);
						// window.open(href);
						// return href;

						return `data:application/pdf;base64,${_arrayBufferToBase64(buff)}`;
					}
					function getDownloadUrl(file) {
						var blob = new Blob([file], { type: 'application/pdf' });
						var objectUrl = URL.createObjectURL(blob);
						window.open(objectUrl);
					}

					var saveByteArray = (function () {
						var anchorTag = document.createElement('a');
						document.body.appendChild(anchorTag);
						anchorTag.style = 'display: none';

						return async function (file, name) {
							try {
								// var url = await _getDownloadUrl(file);
								var url = await getDownloadUrl(file);

								anchorTag.href = url;
								anchorTag.download = name;
								anchorTag.click();
							} catch (error) {
								console.error(error);
							}
						};
					})();


					var xhr = new XMLHttpRequest();
					xhr.addEventListener('readystatechange', function () {
						if (this.readyState === 4) {
							var blob = new Blob([this.responseText], { type: 'application/pdf' });
							var objectUrl = URL.createObjectURL(blob);
							window.open(objectUrl);
						}
					});

					xhr.open('GET', process.env.REACT_APP_IPFS_LINK  + fileHash);

					xhr.send();
				})
				.catch(function (error) {
					console.error(error);
				});
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (showContributions && appState.contract !== null) {
			appState.contract.methods.getOrderData(requestID).call((orderInfoError, orderInfo) => {
				if (!orderInfoError) {
					appState.contract.methods
						.ownerSpecificData(requestID)
						.call({ from: account }, (fileError, files) => {
							if (!fileError) {
								let addresses = orderInfo[0];
								let timestamp = orderInfo[1];
								let status = orderInfo[2];

								let formatted = {};
								let uniqueAddresses = [...new Set(addresses)];
								let pairs = [];

								// count all the unapproved files
								setUnapprovedCount(status.filter((item) => Boolean(item) === false).length);

								addresses.forEach((address, fileIndex) => {
									pairs.push({
										file: files[0][fileIndex],
										AesEncryptedKey: files[1][fileIndex],
										address: address,
										timestamp: timestamp[fileIndex],
										originalIndex: fileIndex,
										status: status[fileIndex],
									});
								});

								uniqueAddresses.forEach((uAddress, uIndex) => {
									pairs.forEach((tempItem, tempIndex) => {
										if (tempItem.address === uAddress) {
											if (Object(formatted).hasOwnProperty(uAddress)) {
												formatted[uAddress].push({
													ipfsHash: tempItem.file,
													timestamp: tempItem.timestamp,
													AesEncryptedKey: tempItem.AesEncryptedKey,
													originalIndex: tempItem.originalIndex,
													status: tempItem.status,
												});
											} else {
												formatted[uAddress] = [
													{
														ipfsHash: tempItem.file,
														timestamp: tempItem.timestamp,
														AesEncryptedKey: tempItem.AesEncryptedKey,
														originalIndex: tempItem.originalIndex,
														status: tempItem.status,
													},
												];
											}
										}
									});
								});

								setFormattedData(formatted);
							} else {
								console.error(fileError);
							}
						});
				} else {
					console.error(orderInfoError.message);
				}
			});
		}
	}, [appState.contract]);

	return (
		<Wrapper>
			<Header onClick={() => setOpen(!isOpen)}>
				<TitleColumn>
					<RequestNumberWithPointer>{requestID}</RequestNumberWithPointer>
					<Title variant="title" weight="semiBold">
						{title.length < 160 ? title : title.substr(0, 160) + '...'}
					</Title>
					<Spacer />
				</TitleColumn>

				<DetailsColumn>
					<BiobitToDollarPair>
						<BadgeRow>
							<TokenIcon src={biobitIcon} />
							<TokenValue>{tokenPay}</TokenValue>
							<ValueLabel>BBit</ValueLabel>
							<BiobitToDollarValue noMargin>{'~ $' + tokenPay}</BiobitToDollarValue>
						</BadgeRow>
					</BiobitToDollarPair>

					<Divider />

					<CustomContributeBadge>
						<BadgeRow>
							<ContributorsIcon src={contributorIcon} />
							<BadgeLabel>{contributors}</BadgeLabel>
						</BadgeRow>
					</CustomContributeBadge>

					<Divider />
					{fulfilled ? <ApprovedBadge src={fulfilledIcon} /> : <TotalBadge>{unapprovedCount}</TotalBadge>}
					<ExpandToggle src={!isOpen ? caretDownIcon : caretUpIcon} />
				</DetailsColumn>
			</Header>
			{showContributions && isOpen ? (
				Object.keys(formattedData).length > 0 ? (
					<>
						<Body>
							<RequestFilesTable
								signalDownloadHandler={signalDownloadHandler}
								data={formattedData}
								selected={selected}
								onChange={onChange}
								onBulkChange={onBulkChange}
								isBulkChecked={isBulkChecked}
								isBulkApproved={isBulkApproved}
								isAllApproved={isAllApproved}
								isAllChecked={isAllChecked}
								changeAll={changeAll}
							/>
						</Body>
						<Footer>
							<SubmitButton
								onClick={() => {
									// let payload = [];

									// Object.keys(selected).forEach((item) => {
									// 	payload.push(
									// 		...selected[item].map((fileHash) => {
									// 			// we need the duplicated addresses here
									// 			return item;
									// 		})
									// 	);
									// });
									handleConfirm(requestID, selected);
								}}
							>
								Send Tokens
							</SubmitButton>
						</Footer>
					</>
				) : (
					<Body>
						<NoContributionMessage>There are no contributions for now</NoContributionMessage>
					</Body>
				)
			) : null}
		</Wrapper>
	);
};

export default RequestListItem;
