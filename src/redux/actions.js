import Clarifai from 'clarifai';
import {
	CHANGE_SEARCHFIELD,
  SET_IMAGE_URL,
	REQUEST_FACE_DETECTION_PENDING,
	REQUEST_FACE_DETECTION_SUCCESS,
	REQUEST_FACE_DETECTION_FAILED,
  GET_PROFILE,
  SIGN_IN,
  SIGN_OUT
} from './constants';

const app = new Clarifai.App({
  apiKey: 'e442552586bf49358e02e5175ac8b611'
});

export const changeSearchfieldAction = (text) => ({
	type: CHANGE_SEARCHFIELD,
	payload: text
})

export const setImageUrlAction = () => (dispatch, getState) => {
  const { changeSearchfieldReducer } = getState();
  dispatch({ type: SET_IMAGE_URL, payload: changeSearchfieldReducer.searchfield });
};

export const getProfileAction = (text) => ({
  type: GET_PROFILE,
  payload: text
})

export const signInAction = () => ({
  type: SIGN_IN
})

export const signOutAction = () => ({
  type: SIGN_OUT
})

export const requestFaceDetectionAction = (input) => (dispatch) => {
	dispatch({ type: REQUEST_FACE_DETECTION_PENDING })
  app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, input)
    .then(responseData => {
      //Identify Profile Data
      let profileData = [];
    	responseData.outputs[0].data.regions.map((region) => {
        return profileData.push({ 
          age: region.data.face.age_appearance.concepts[0].name,
          gender: region.data.face.gender_appearance.concepts[0].name,
          race: region.data.face.multicultural_appearance.concepts[0].name
        })
      })
      //Calculate Face Location
      const clarifaiFace = responseData.outputs[0].data.regions.map((box) => {
        return box.region_info.bounding_box
    	})
    	const image = document.getElementById('inputImage');
    	const width = Number(image.width);
    	const height = Number(image.height);
    	const boxes = clarifaiFace.map((face) =>{
      	return {
        	leftCol: face.left_col * width,
        	topRow: face.top_row * height,
        	rightCol: width - (face.right_col * width),
        	bottomRow: height - (face.bottom_row * height)
      	}
    	})
  	dispatch({ type: REQUEST_FACE_DETECTION_SUCCESS, payloadFace: boxes, payloadProfile: profileData })
  	})
    .catch(error => dispatch({ type: REQUEST_FACE_DETECTION_FAILED, payload: error }))
}