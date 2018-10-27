import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit, onEnter }) => {
	return (
		<div>
			<p className='f2'>
				{'Face and Demographic Predictor'}
			</p>
			<div className='center'>
				<div className='form center pa3 br3 shadow-5'>
					<input 
						className='f4 pa2 w-70 center' 
						type='search'
						onChange={onInputChange}
						onKeyPress={onEnter}
					/>
					<button 
						className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
						onClick={onButtonSubmit}>
							Detect
					</button>
				</div>
			</div>
		</div>
	)
}

export default ImageLinkForm;