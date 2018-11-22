import React from 'react';
import LoadingBar from '../LoadingBar/LoadingBar';
import './PredictProfile.css';

const PredictProfile = ({ error, imageUrl, isLoading, isNotFace, selectedProfile, getProfile, faceBox }) => {
  if(imageUrl === "") {
    return(
      <div id="result">
        <div id="intro">
          <p>Let machine detect faces and predict demographic profile in your picture</p>
          <br/>
          <p>Enter image URL in the box above, e.g. "https://samples.clarifai.com/face-det.jpg"</p>
          <br/>
          <p>Give it a try!</p>
        </div>
      </div>
    );
  } else if (isLoading) {
    return(
      <div id="result">
        <div id="spinner">
          <LoadingBar />
        </div>
      </div>
    );
  } else {
    if (error.status === 400)
      return(
        <div id="result">
          <div id="intro">
            <h3>Wrong URL. Please input the correct URL address</h3>
          </div>
        </div>
      );
    if (isNotFace) {
      return(
        <div id="result">
          <div id="intro">
            <h3>No face detected in the image</h3>
          </div>
        </div>
      );
    } else if (getProfile) {
      let selectedGender = selectedProfile.gender === "masculine" ? "male" : "female";
      return (
        <div id="result">
          <p id="detected-face">{faceBox.length} FACE DETECTED</p>
          <div id="guess">
            <p>Gender: {selectedGender} </p>
            <p>Age: about {selectedProfile.age} years old</p>
            <p>Race: {selectedProfile.race}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div id="result">
          <p id="detected-face">{faceBox.length} FACE DETECTED</p>
          <div id="guess">
            <p>Please hover over the box to reveal profile data</p>
          </div>
        </div>
      )
    }
  }
}

export default PredictProfile;