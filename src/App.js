import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import { initializeApp } from 'firebase/app';

const HomeContainer = React.lazy(() => import('./containers/home'));
const DetailContainer = React.lazy(() => import('./containers/detail'));

const firebaseConfig = {
  apiKey: "AIzaSyBXFEkNhGKJgP_We4zacdi7PwFG38KD2pw",
  authDomain: "trivia-7527d.firebaseapp.com",
  projectId: "trivia-7527d",
  storageBucket: "trivia-7527d.appspot.com",
  messagingSenderId: "172629526227",
  appId: "1:172629526227:web:7ac74c94fad60874003626",
  measurementId: "G-3L3BWRRVYM"
};

// Initialize Firebase
initializeApp(firebaseConfig);

class App extends React.Component {
	render() {
		return (
			<Suspense fallback={<span>Loading...</span>}>
				<Router>
					<div className={'app-container'}>
						<ul>
							<li>
								<Link to='/'>Home</Link>
							</li>
							<li>
								<Link to='/detail'>Detail</Link>
							</li>
						</ul>

						<Switch>
							<Route path='/detail'>
								<DetailContainer />
							</Route>

							<Route path='/'>
								<HomeContainer />
							</Route>
						</Switch>
					</div>
				</Router>
			</Suspense>
		);
	}
}

export default App;
