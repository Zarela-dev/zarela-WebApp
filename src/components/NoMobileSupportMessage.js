import React from 'react';
import styled, { css } from 'styled-components';
import noResponiveImage from '../assets/no-responsive-bg.jpg';

const Wrapper = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	background: white;
	z-index: 10000;
	padding: ${props => props.theme.spacing(2)};
`;


const styles = css`
	
#notfound {
  position: relative;
  height: 100vh;
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}

.notfound {
  max-width: 410px;
  width: 100%;
  text-align: center;
}

.notfound .notfound-404 {
  height: 280px;
  position: relative;
  z-index: -1;
}

.notfound .notfound-404 h1 {
  font-family: 'Montserrat', sans-serif;
  font-size: 230px;
  margin: 0px;
  font-weight: 900;
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
          transform: translateX(-50%);
  background: url(${noResponiveImage}) no-repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: cover;
  background-position: center;
}


.notfound h2 {
  font-family: 'Montserrat', sans-serif;
  color: #000;
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0;
}

.notfound p {
  font-family: 'Krub', sans-serif;
  color: #000;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  margin-top: 0px;
  line-height: 1.5;
}


@media only screen and (max-width: 767px) {
    .notfound .notfound-404 {
      height: 142px;
    }
    .notfound .notfound-404 h1 {
      font-size: 112px;
    }
}

`;
const Message = styled.div`
	${styles};
`;


const NoMobileSupportMessage = () => {
	return (
		<Wrapper>
			<Message>
				<div id="notfound">
					<div className="notfound">
						<div className="notfound-404">
							<h1>Oops!</h1>
						</div>
						<p>
							The site is not optimized for mobile browsers yet.There will be a mobile friendly version soon. But for now, please use a desktop browser.
						</p>
					</div>
				</div>
			</Message>
		</Wrapper>
	);
};

export default NoMobileSupportMessage;
