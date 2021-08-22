import { createGlobalStyle, css } from 'styled-components';
import leagueFont from './assets/fonts/LeagueGothic-Regular.otf';

const fonts = css`
	@font-face {
		font-family: 'LeagueGothic';
		src: url(${leagueFont});
	}
`;

export const GlobalStyle = createGlobalStyle`
	${fonts};
	/* http://meyerweb.com/eric/tools/css/reset/
	v2.0-modified | 20110126
	License: none (public domain)
	*/

* {
	-webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

	html,
	body,
	div,
	span,
	applet,
	object,
	iframe,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	p,
	blockquote,
	pre,
	a,
	abbr,
	acronym,
	address,
	big,
	cite,
	code,
	del,
	dfn,
	em,
	img,
	ins,
	kbd,
	q,
	s,
	samp,
	small,
	strike,
	strong,
	sub,
	sup,
	tt,
	var,
	b,
	u,
	i,
	center,
	dl,
	dt,
	dd,
	ol,
	ul,
	li,
	fieldset,
	form,
	label,
	legend,
	table,
	caption,
	tbody,
	tfoot,
	thead,
	tr,
	th,
	td,
	article,
	aside,
	canvas,
	details,
	embed,
	figure,
	figcaption,
	footer,
	header,
	hgroup,
	menu,
	nav,
	output,
	ruby,
	section,
	summary,
	time,
	mark,
	audio,
	video {
		margin: 0;
		padding: 0;
		border: 0;
		font-size: 100%;
		font: inherit;
		vertical-align: baseline;
		box-sizing: border-box;
	}

	/* make sure to set some focus styles for accessibility */
	:focus {
		outline: 0;
	}

	/* HTML5 display-role reset for older browsers */
	article,
	aside,
	details,
	figcaption,
	figure,
	footer,
	header,
	hgroup,
	menu,
	nav,
	section {
		display: block;
	}

	body {
		line-height: 1;
		font-family: 'Krub';
	}

	ol,
	ul {
		list-style: none;
	}

	blockquote,
	q {
		quotes: none;
	}

	blockquote:before,
	blockquote:after,
	q:before,
	q:after {
		content: '';
		content: none;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-decoration,
	input[type='search']::-webkit-search-results-button,
	input[type='search']::-webkit-search-results-decoration {
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	input[type='search'] {
		-webkit-appearance: none;
		-moz-appearance: none;
		-webkit-box-sizing: content-box;
		-moz-box-sizing: content-box;
		box-sizing: content-box;
	}

	textarea {
		overflow: auto;
		vertical-align: top;
		resize: vertical;
	}

	audio,
	canvas,
	video {
		display: inline-block;
		*display: inline;
		*zoom: 1;
		max-width: 100%;
	}
	audio:not([controls]) {
		display: none;
		height: 0;
	}

	[hidden] {
		display: none;
	}

	html {
		font-size: 100%; /* 1 */
		-webkit-text-size-adjust: 100%; /* 2 */
		-ms-text-size-adjust: 100%; /* 2 */
	}

	a:focus {
		outline: thin dotted;
	}

	a:active,
	a:hover {
		outline: 0;
	}

	img {
		border: 0; /* 1 */
		-ms-interpolation-mode: bicubic; /* 2 */
	}

	figure {
		margin: 0;
	}

	form {
		margin: 0;
	}


	fieldset {
		border: 1px solid #c0c0c0;
		margin: 0 2px;
		padding: 0.35em 0.625em 0.75em;
	}

	legend {
		border: 0; /* 1 */
		padding: 0;
		white-space: normal; /* 2 */
		*margin-left: -7px; /* 3 */
	}

	button,
	input,
	select,
	textarea,
	a {
		-webkit-touch-callout: default;
		-webkit-user-select: text;
		-khtml-user-select: text;
		-moz-user-select: text;
		-ms-user-select: text;
		user-select: text;
	}

	button,
	input,
	select,
	textarea {
		font-size: 100%; /* 1 */
		margin: 0; /* 2 */
		vertical-align: baseline; /* 3 */
		*vertical-align: middle; /* 3 */
	}

	button,
	input {
		line-height: normal;
		font-family: Krub;
	}

	button,
	select {
		text-transform: none;
	}


	button,
	html input[type="button"], /* 1 */
	input[type="reset"],
	input[type="submit"] {
		-webkit-appearance: button; /* 2 */
		cursor: pointer; /* 3 */
		*overflow: visible; /* 4 */
	}


	button[disabled],
	html input[disabled] {
		cursor: default;
	}


	input[type='checkbox'],
	input[type='radio'] {
		box-sizing: border-box; /* 1 */
		padding: 0; /* 2 */
		*height: 13px; /* 3 */
		*width: 13px; /* 3 */
	}

	input[type='search'] {
		-webkit-appearance: textfield; /* 1 */
		-moz-box-sizing: content-box;
		-webkit-box-sizing: content-box; /* 2 */
		box-sizing: content-box;
	}

	input[type='search']::-webkit-search-cancel-button,
	input[type='search']::-webkit-search-decoration {
		-webkit-appearance: none;
	}

	button::-moz-focus-inner,
	input::-moz-focus-inner {
		border: 0;
		padding: 0;
	}

	textarea {
		overflow: auto; /* 1 */
		vertical-align: top; /* 2 */
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	html,
	button,
	input,
	select,
	textarea {
		color: #222;
	}

	::-moz-selection {
		background: #b3d4fc;
		text-shadow: none;
	}

	::selection {
		background: #b3d4fc;
		text-shadow: none;
	}

	img {
		vertical-align: middle;
	}

	fieldset {
		border: 0;
		margin: 0;
		padding: 0;
	}

	textarea {
		resize: vertical;
	}

	.chromeframe {
		margin: 0.2em 0;
		background: #ccc;
		color: #000;
		padding: 0.2em 0;
	}
`;
