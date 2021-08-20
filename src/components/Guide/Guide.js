import React, { useState, useEffect } from 'react';
import Tour from 'reactour';
import styled, { css } from 'styled-components';
import Next from './../../assets/icons/next.svg';
import Prev from './../../assets/icons/prev.svg';
import CloseSvg from './../../assets/icons/close-purple.svg';
import { Button } from '../Elements/Button';
import './styles.css';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div``;
const NavButton = styled.div`
	color: #581d9f;
	font-weight: bolder;
	font-size: 16px;
`;

const ArrowIcon = styled.img`
	fill: #581d9f;
`;
const Overlay = styled.div`
	color: red;
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
	box-shadow: 0px 6.280374050140381px 28.261682510375977px 0px #dfecff80;
`;
const Close = styled.div`
	width: ${(props) => (props.isMobile ? '27px' : '48px')};
	height: ${(props) => (props.isMobile ? '27px' : '48px')};
	border-radius: ${(props) => (props.isMobile ? '15px' : '25px')};
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const CloseIcon = styled.img`
	color: #581d9f;
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
	}
`;

const Guide = React.memo(({ steps, guideIsOpen, setGuideIsOpen, isMobile }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const location = useLocation();

	const handleSaveLocalStorage = () => {
		const route = location.pathname.split('/')[1];
		localStorage.setItem('guide/' + route, true);
	};
	return (
		<Wrapper>
			<CustomizedTour
				isMobile={isMobile}
				steps={steps}
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
				lastStep={steps.length - 1 === currentStep ? true : false}
				rounded={10}
				maskSpace={10}
				lastStepNextButton={
					<SubmitRequestButton
						onClick={() => {
							document.body.style.overflowY = 'auto';
							handleSaveLocalStorage();
						}}
					>
						Collect
					</SubmitRequestButton>
				}
				disableKeyboardNavigation={['esc']}
			></CustomizedTour>
			{guideIsOpen ? (
				<Overlay
					isMobile={isMobile}
					onClick={() => {
						setGuideIsOpen(!guideIsOpen);
						handleSaveLocalStorage();
						document.body.style.overflowY = 'auto';
					}}
				>
					<Close isMobile={isMobile}>
						<CloseIcon src={CloseSvg} />
					</Close>
				</Overlay>
			) : null}
		</Wrapper>
	);
});

export default Guide;
