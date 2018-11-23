import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {
  changeSearchfieldReducer,
	requestFaceDetectionReducer,
	getProfileReducer,
	setImageUrlReducer,
	signInReducer
} from './redux/reducers';

const logger = createLogger();

const appReducer = combineReducers({
		changeSearchfieldReducer,
		requestFaceDetectionReducer,
		getProfileReducer,
		setImageUrlReducer,
		signInReducer
});

const rootReducer = (state, action) => {
	if (action.type === 'SIGN_OUT') {
		state = undefined;
	}
	return appReducer(state, action)
}

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
	<Provider store={store}>
		<Router basename={process.env.PUBLIC_URL}>
			<App />
		</Router>
	</Provider>, document.getElementById('root'));
registerServiceWorker();