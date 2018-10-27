import React from 'react';
import './FaceDetect.css'

const FaceDetect = ({ imageUrl, faceBox, onFaceClick }) => {
	const faces = faceBox.map((face, i) => {
		return (
			<div
				key={i}
				data-index={i}
				onMouseOver={onFaceClick}
				className='bounding-box'
				style={{
					top: face.topRow, 
					right: face.rightCol, 
					bottom: face.bottomRow, 
					left: face.leftCol
				}}	
			>
			</div>
		)
	})

	return (
		<div id="image-input">
      <div style={{position: 'relative'}}> 
				<img id='inputImage' alt='' src={imageUrl} /> 
				{faces}
			</div>
		</div>
	);
}

export default FaceDetect;