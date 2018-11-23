import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isSignedIn, onSignOut }) => {
		if (isSignedIn) {
			return (
				<nav style={{display: 'flex', justifyContent:'flex-end'}}>
					<div className='f3 link dim black underline pa3 pointer'>
						<Link to='/sign-in' onClick={()=> onSignOut()} >Sign Out</Link>
					</div>
				</nav>
			)
		} else {
			return(
				<nav style={{display: 'flex', justifyContent:'flex-end'}}>
					<div className='f3 link dim black underline pa3 pointer'>
						<Link to='/sign-in'>Sign In</Link>
					</div>
					<div className='f3 link dim black underline pa3 pointer'>
						<Link to='/register'>Register</Link>
					</div>
				</nav>
			)
		}
}

export default Navigation;