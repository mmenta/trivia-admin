import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import HeaderView from './components/header/';
import SidebarView from './components/sidebar/';
import history from './config/history';

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

	state = {
		sidebar: true,
	}

	toggleSidebar = (val) => {
		this.setState({
			sidebar: val,
		});
	}

	render() {
		return (
			<>
			<Router history={history}>
				<HeaderView 
					history={history}
					show={this.state.sidebar} 
					toggleSidebar={this.toggleSidebar}
				/>
				<SidebarView 
					history={history}
					show={this.state.sidebar} 
					toggleSidebar={this.toggleSidebar}
				/>
				<Suspense fallback={<span>Loading...</span>}>
					<div className={'app-container'}>
						<Switch>
							<Route path='/detail'>
								<DetailContainer />
							</Route>
							<Route path='/'>
								<HomeContainer />
							</Route>
						</Switch>
					</div>
				</Suspense>
			</Router>
			</>
		);
	}
}

export default App;
