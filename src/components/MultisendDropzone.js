import React from 'react';

import Dropzone from 'react-dropzone';

export default function App({ handleDrop, fileNames }) {
	return (
		<div className="App">
			<Dropzone onDrop={handleDrop} accept=".csv">
				{({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
					const additionalClass = isDragAccept ? 'accept' : isDragReject ? 'reject' : '';

					return (
						<div
							{...getRootProps({
								className: `dropzone ${additionalClass}`,
							})}
						>
							<input {...getInputProps()} />
							<span>{isDragActive ? '📂' : '📁'}</span>
							<p>Drag'n'drop images, or click to select files</p>
						</div>
					);
				}}
			</Dropzone>
			<div>
				<strong>Files:</strong>
				<ul>
					{fileNames.map((fileName) => (
						<li key={fileName}>{fileName}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
