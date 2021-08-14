import React, { useState, useEffect } from 'react';
import Tour from 'reactour';
import styled, { css } from 'styled-components';
import Next from './../../assets/icons/next.svg';
import Prev from './../../assets/icons/prev.svg';
import CloseSvg from './../../assets/icons/close-purple.svg';
import { Button } from '../Elements/Button';
import './styles.css';
import { useLocation } from 'react-router-dom'


const Wrapper = styled.div`
	`;
const NavButton = styled.div`
		color: #581D9F;
		font-weight: bolder;
		font-size: 16px;
	`;

const ArrowIcon = styled.img`
		fill: #581D9F;
	`;
const Overlay = styled.div`
	color: red;
	width: 55px;
	height: 55px;
	z-index: 999999;
	position: fixed;
	top: 55px;
	right: 55px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	border-radius: 27.5px;
	background: rgb(72,194,185);
	background: linear-gradient(225deg, rgba(72,194,185,1) 0%, rgba(138,100,212,1) 100%);
	box-shadow: 0px 6.280374050140381px 28.261682510375977px 0px #DFECFF80;

`;
const Close = styled.div`
		width: 48px;
		height: 48px;
		border-radius: 25px;
		background-color: #fff;
		display: flex;
    justify-content: center;
    align-items: center;
	`;
const CloseIcon = styled.img`
	color: #581D9F;
	`;
const SubmitRequestButton = styled.a`
	${Button};
	margin: 0;
	padding: 5px 25px;
`;

const None = styled.div`
	display: none;
`;

const CustomizedTour = styled(Tour)`
[data-tour-elem="left-arrow"] {
		display: ${props => props.lastStep ? 'none' : 'block'}
}

[data-tour-elem="right-arrow"] {
	margin-left: ${props => props.lastStep ? '0px': '24px'}
}

[data-tour-elem="controls"] {
  justify-content: space-around;
}
`;

let test = false;

const Guide = React.memo(({ steps, guideIsOpen, setGuideIsOpen }) => {
	const [currentStep, setCurrentStep] = useState(0);
	const location = useLocation();

	useEffect(() => {
		if (steps.length - 1 === currentStep) {
			test = true;
		}
	}, [currentStep]);

	const handleSaveLocalStorage = () => {
		const route = location.pathname.split('/')[1];
		localStorage.setItem('guide/' + route, true);
	}
	return (
		<Wrapper>
			<CustomizedTour
				steps={steps}
				isOpen={guideIsOpen}
				onRequestClose={() => setGuideIsOpen(false)}
				closeWithMask={false}
				disableDotsNavigation={true}
				showButtons={true}
				prevButton={currentStep === steps.length - 1 ?
					undefined : <NavButton className="prev-btn"> <ArrowIcon src={Prev} /> prev</NavButton>}
				nextButton={currentStep === steps.length - 1 ?
					undefined : <NavButton className="next-btn">next <ArrowIcon src={Next} /></NavButton>}
				onAfterOpen={(target) => (document.body.style.overflowY = 'hidden')}
				showNavigation={false}
				showCloseButton={false}
				getCurrentStep={(step) => { setCurrentStep(step) }}
				scrollDuration={100}
				className="tour-custom"
				highlightedMaskClassName="highlight"
				maskClassName="mask"
				lastStep={steps.length - 1 === currentStep ? true : false}
				rounded={10}
				maskSpace={10}
				lastStepNextButton={
					<SubmitRequestButton onClick={() => {
						(document.body.style.overflowY = 'auto')
						handleSaveLocalStorage();
					}}>Collect</SubmitRequestButton>
				}
				disableKeyboardNavigation={['esc']}
			>
			</CustomizedTour>
			{guideIsOpen ? (
				<Overlay
					onClick={() => {
						setGuideIsOpen(!guideIsOpen);
						handleSaveLocalStorage();
						document.body.style.overflowY = 'auto';
					}}
				>
					<Close>
						<CloseIcon src={CloseSvg} />
					</Close>
				</Overlay>
			) : null}
		</Wrapper>
	);
});

export default Guide;
