import {
  CHANGE_SEARCHFIELD,
  SET_IMAGE_URL,
  REQUEST_FACE_DETECTION_PENDING,
  REQUEST_FACE_DETECTION_SUCCESS,
  REQUEST_FACE_DETECTION_FAILED,
  GET_PROFILE,
  SIGN_IN
} from './constants';

const initialStateSearchfield = {
  searchfield: ''
};

export const changeSearchfieldReducer = (state = initialStateSearchfield, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return { ...state, searchfield: action.payload };
    default:
      return state;
  }
}

const initialStateImageUrl = {
  imageUrl: ''
};

export const setImageUrlReducer = (state = initialStateImageUrl, action = {}) => {
  switch (action.type) {
    case SET_IMAGE_URL:
      return { ...state, imageUrl: action.payload };
    default:
      return state;
  }
}

const initialStateSignedIn = {
  isSignedIn: false
};

export const signInReducer = (state = initialStateSignedIn, action = {}) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true };
    default:
      return state;
  }
}

const initialStateSelectedProfile = {
  selectedProfile: {},
  getProfile: false
};

export const getProfileReducer = (state = initialStateSelectedProfile, action = {}) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, selectedProfile: action.payload, getProfile: true };
    default:
      return state;
  }
}

const initialStateDetectionResults = {
  faceBox: [],
  allProfile: [],
  isLoading: false,
  isNotFace: false,
  error: ''
}

export const requestFaceDetectionReducer = (state=initialStateDetectionResults, action={}) => {
  switch (action.type) {
    case REQUEST_FACE_DETECTION_PENDING:
      return { ...state, isLoading: true};
    case REQUEST_FACE_DETECTION_SUCCESS:
      return { ...state, faceBox: action.payloadFace, allProfile: action.payloadProfile, isLoading: false, isNotFace: false};
    case REQUEST_FACE_DETECTION_FAILED:
      return { ...state, error: action.payload, isLoading: false, isNotFace: true, faceBox: []};
    default:
      return state
  }
}