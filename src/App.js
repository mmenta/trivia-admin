import React, { useEffect, useState, Suspense } from 'react';
import { NotificationContainer } from 'react-notifications';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import history from './config/history';
import { initializeApp } from 'firebase/app';
import HeaderView from './components/header/';
import SidebarView from './components/sidebar/';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/reducers/global/global';


const QuestionsContainer = React.lazy(() => import('./containers/questions'));
const TemplatesContainer = React.lazy(() => import('./containers/templates'));
const ArticlesContainer = React.lazy(() => import('./containers/articles'));
const CampaignsContainer = React.lazy(() => import('./containers/campaigns'));

const AddQuestionContainer = React.lazy(() => import('./containers/addQuestion'));
const AddTemplateContainer = React.lazy(() => import('./containers/addTemplate'));
const AddCampaignContainer = React.lazy(() => import('./containers/addCampaign'));
const LoginContainer = React.lazy(() => import('./containers/login'));

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

// class App extends React.Component {
function App() {
	const [sidebar, setSidebar] = useState(true);
	const [login, setLogin] = useState(false);

	function toggleSidebar(val) {
		setSidebar(val);
	}

	let setLoginStatus = (status) => {
		// change this to redux so that it gets saved throughout the app
		setLogin(status);
	}

	return (
		<>
		{ !login && (
			<Suspense fallback={<span>Loading...</span>}>
				<LoginContainer 
					setLoginStatus={setLoginStatus}
				/>
				<NotificationContainer />
			</Suspense>
		)}

		{ login && (
			<Router history={history}>
				<HeaderView 
					history={history}
					show={sidebar} 
					toggleSidebar={toggleSidebar}
				/>
				<SidebarView 
					history={history}
					show={sidebar} 
					toggleSidebar={toggleSidebar}
				/>
				<NotificationContainer />
				<Suspense fallback={<span>Loading...</span>}>
					<div className={'app-container'}>
						<Switch>
							<Route 
								exact path='/'
								component={QuestionsContainer}
							/>	
							<Route path='/templates'>
								<TemplatesContainer />
							</Route>
							<Route path='/articles'>
								<ArticlesContainer />
							</Route>
							<Route path='/campaigns'>
								<CampaignsContainer />
							</Route>
							<Route 
								path='/add-question'
								component={AddQuestionContainer}
							/>
							<Route 
								path='/add-template'
								component={AddTemplateContainer}
							/>
							<Route 
								path='/add-campaign'
								component={AddCampaignContainer}
							/>
						</Switch>
					</div>
				</Suspense>
			</Router>
		)}
		</>
	);
}

export default App;
