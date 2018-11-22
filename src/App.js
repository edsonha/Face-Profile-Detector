import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation';
import SignIn from './components/SignIn';
import Register from './components/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetect from "./components/FaceDetect/FaceDetect";
import PredictProfile from "./components/PredictProfile/PredictProfile";
import './App.css';

const app = new Clarifai.App({
  apiKey: 'e442552586bf49358e02e5175ac8b611'
});

const particlesOptions ={
  particles: {
    number: {
      value: 15,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const intialState = {
  input:'',
  imageUrl:'',
  faceBox: [],
  route: 'signIn',
  isSignedIn: false,
  clickFaces: false, 
  allProfile: [], 
  selectedProfile: {}, 
  isLoading: false,
  isNotFace: false 
}

class App extends Component {
  constructor() {
    super();
    this.state = intialState
  }

  calculateFaceLocation = (responseData) => {
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
    return boxes;
  }

  identifyProfileData = (responseData) => {
    let profileData = [];
    responseData.outputs[0].data.regions.map((region) => {
      return profileData.push({ 
        age: region.data.face.age_appearance.concepts[0].name,
        gender: region.data.face.gender_appearance.concepts[0].name,
        race: region.data.face.multicultural_appearance.concepts[0].name
      })
    })
  return profileData
  }

  onFaceClick = (event) => {
    this.setState({ selectedProfile: this.state.allProfile[event.target.attributes['data-index'].value] })
    this.setState({ clickFaces: true })
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onEnter = event => {
    if (event.key === "Enter") {
      this.onButtonSubmit();
    }
  };

  onButtonSubmit = () => {
    if (this.state.input.slice(0,4) !== 'http') {
      alert("Please enter a valid URL");
    } else {
      this.setState({imageUrl:this.state.input})
      this.setState({ isLoading: true });
      app.models.predict(
        Clarifai.DEMOGRAPHICS_MODEL,
        this.state.input)
        .then(response => {
          if(!(response.outputs[0].data.regions)) {
            this.setState({
              isNotFace: true, 
              isLoading: false,
              faceBox: []
            });
          } else {
            this.setState({
              faceBox: this.calculateFaceLocation(response),
              allProfile: this.identifyProfileData(response),
              selectedProfile: this.identifyProfileData(response), //to be done
              isNotFace: false,
              isLoading: false
            });
           }
        })
        .catch(err => console.log(err))
      }
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(intialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route, faceBox, imageUrl, isNotFace, isLoading, selectedProfile, clickFaces } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
              <ImageLinkForm
                onInputChange={this.onInputChange} 
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
                  clickFaces={clickFaces} 
                />
              </div>
            </div>
          : ((route === 'signIn' || route === 'signOut')
            ? <div>
                <Logo />
                <SignIn onRouteChange={this.onRouteChange} />
              </div>
            : <div>
                <Logo />
                <Register onRouteChange={this.onRouteChange} />
              </div>
            )  
        }
      </div>
    );
  }
}

export default App;