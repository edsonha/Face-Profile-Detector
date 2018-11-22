import React, { Component } from 'react';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import FaceDetect from "../../components/FaceDetect/FaceDetect";
import PredictProfile from "../../components/PredictProfile/PredictProfile";
import './Home.css';

import { connect } from 'react-redux';
import {
  changeSearchfieldAction,
  requestFaceDetectionAction,
  getProfileAction,
  setImageUrlAction
} from '../../redux/actions';

const mapStateToProps = (state) => {
  return {
    searchfield: state.changeSearchfieldReducer.searchfield,
    faceBox: state.requestFaceDetectionReducer.faceBox,
    allProfile: state.requestFaceDetectionReducer.allProfile,
    isLoading: state.requestFaceDetectionReducer.isLoading,
    isNotFace: state.requestFaceDetectionReducer.isNotFace,
    error: state.requestFaceDetectionReducer.error,
    selectedProfile: state.getProfileReducer.selectedProfile,
    getProfile: state.getProfileReducer.getProfile,
    imageUrl: state.setImageUrlReducer.imageUrl
  }
}

const mapDispatchToProps = (dispatch) => ({
  onInputChange: (event) => dispatch(changeSearchfieldAction(event.target.value)),
  onRequestFaceDetectionAction: (input) => dispatch(requestFaceDetectionAction(input)),
  onGetProfileAction: (event) => dispatch(getProfileAction(event)),
  onSetImageUrlAction: () => dispatch(setImageUrlAction())
})

class Home extends Component {

  onFaceClick = (event) => {
    return this.props.onGetProfileAction(this.props.allProfile[event.target.attributes['data-index'].value]);
  }

  onEnter = event => { 
    if (event.key === "Enter") {
      this.onButtonSubmit();
    }
  };

  onButtonSubmit = () => {
    if (this.props.searchfield.slice(0,4) !== 'http') {
      alert("Please enter a valid URL"); 
    } else {
      return (
        this.props.onSetImageUrlAction(),
        this.props.onRequestFaceDetectionAction(this.props.searchfield)
      );
    }
  }

  render() {
    const { onInputChange, imageUrl, faceBox, isLoading, selectedProfile, getProfile, isNotFace, error } = this.props;
  	
    return (
			<div>
	      <ImageLinkForm
	        onInputChange={onInputChange} 
	        onButtonSubmit={this.onButtonSubmit} 
	        onEnter={this.onEnter} 
	      />
	      <div id="result-container">
	        <FaceDetect
	          onFaceClick={this.onFaceClick} 
	          faceBox={faceBox}
	          imageUrl={imageUrl}
	        />
	        <PredictProfile
	          faceBox={faceBox} 
	          imageUrl={imageUrl}
	          isNotFace={isNotFace}
	          isLoading={isLoading}
	          selectedProfile={selectedProfile}
	          getProfile={getProfile}
            error={error}
	        />
	      </div>
	    </div>
	  )
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);