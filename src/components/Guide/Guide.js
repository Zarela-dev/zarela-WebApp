import React, { useState, useEffect } from 'react';
import Tour from 'reactour';
import styled from 'styled-components';
import Next from './../../assets/icons/next.svg';
import Prev from './../../assets/icons/prev.svg';
import CloseSvg from './../../assets/icons/close-purple.svg';
import { Button } from '../Elements/Button';
import './styles.css';
import { useLocation } from 'react-router-dom';
import WalletDialog from '../Dialog/WalletDialog';
import { useStore } from '../../state/store';

// import { SaveGuideToLocalStorage } from '../../state/actions';

const Wrapper = styled.div``;
const NavButton = styled.div`
	color: ${(props) => props.theme.colors.primary};
	font-weight: bolder;
	font-size: 16px;
`;

const ArrowIcon = styled.img`
	fill: ${(props) => props.theme.colors.primary};
`;

const Overlay = styled.div`
	color: ${(props) => props.theme.colors.error};
	width: ${(props) => (props.isMobile ? '32px' : '55px')};
	height: ${(props) => (props.isMobile ? '32px' : '55px')};
	z-index: 999999;
	position: fixed;
	top: ${(props) => (props.isMobile ? '30px' : '55px')};
	right: ${(props) => (props.isMobile ? '30px' : '55px')};
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	border-radius: 27.5px;
	background: rgb(72, 194, 185);
	background: linear-gradient(225deg, rgba(72, 194, 185, 1) 0%, rgba(138, 100, 212, 1) 100%);
	box-shadow: 0px 6px 28px 0px #dfecff80;
`;

const Close = styled.div`
	width: ${(props) => (props.isMobile ? '27px' : '48px')};
	height: ${(props) => (props.isMobile ? '27px' : '48px')};
	border-radius: ${(props) => (props.isMobile ? '15px' : '25px')};
	background-color: ${(props) => props.theme.colors.bgWhite};
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CloseIcon = styled.img`
	color: ${(props) => props.theme.colors.primary};
`;

const SubmitRequestButton = styled.a`
	${Button};
	margin: 0;
	padding: 5px 25px;
`;

const CustomizedTour = styled(Tour)`
	[data-tour-elem='left-arrow'] {
		display: ${(props) => (props.lastStep ? 'none' : 'block')};
	}

	[data-tour-elem='right-arrow'] {
		margin-left: ${(props) => (props.lastStep ? '0px' : '24px')};
	}

	[data-tour-elem='controls'] {
		justify-content: space-around;
	}
	&.reactour__helper {
		width: ${(props) => (props.isMobile ? '80%' : 'unset')};
		line-height: 23px;
	}
`;

const Guide = React.memo(({ steps, children, isLoading }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const location = useLocation();
	const [showConnectDialog, setShowConnectDialog] = useState(false);
	const { isMobile, setGuideIsOpen, guideIsOpen } = useStore();

	const handleTimeOut = (timer) => {
		setTimeout(() => {
			setGuideIsOpen(true);
		}, timer);
	};

	useEffect(() => {
		if (!localStorage.getItem('guide/' + location.pathname.split('/')[1])) {
			handleTimeOut(3000);
		} else if (location.pathname.split('/')[1] === '' && !isLoading) {
			handleTimeOut(3000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{showConnectDialog ? <WalletDialog /> : null}
			<Wrapper>
				<CustomizedTour
					isMobile={isMobile}
					steps={steps}
					currentStep={currentStep}
					isOpen={guideIsOpen}
					onRequestClose={() => setGuideIsOpen(false)}
					closeWithMask={false}
					disableDotsNavigation={true}
					showButtons={true}
					prevButton={
						currentStep === steps.length - 1 ? undefined : (
							<NavButton className="prev-btn">
								{' '}
								<ArrowIcon src={Prev} /> prev
							</NavButton>
						)
					}
					nextButton={
						currentStep === steps.length - 1 ? undefined : (
							<NavButton className="next-btn">
								next <ArrowIcon src={Next} />
							</NavButton>
						)
					}
					onAfterOpen={(target) => (document.body.style.overflowY = 'hidden')}
					showNavigation={false}
					showCloseButton={false}
					getCurrentStep={(step) => {
						setCurrentStep(step);
					}}
					scrollDuration={100}
					className="tour-custom"
					highlightedMaskClassName="highlight"
					maskClassName="mask"
					rounded={10}
					maskSpace={10}
					lastStepNextButton={
						<SubmitRequestButton
							onClick={() => {
								// setCurrentStep(0);
								document.body.style.overflowY = 'auto';
								// SaveGuideToLocalStorage(dispatch, location.pathname.split('/')[1]);
							}}
						>
							Done
						</SubmitRequestButton>
					}
					disableKeyboardNavigation={['esc']}
				></CustomizedTour>
				{guideIsOpen && (
					<Overlay
						isMobile={isMobile}
						onClick={() => {
							// SaveGuideToLocalStorage(dispatch, location.pathname.split('/')[1]);
							document.body.style.overflowY = 'auto';
						}}
					>
						<Close isMobile={isMobile}>
							<CloseIcon src={CloseSvg} />
						</Close>
					</Overlay>
				)}
				{children}
			</Wrapper>
		</>
	);
});

export default Guide;
