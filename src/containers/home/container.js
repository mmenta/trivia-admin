import React from 'react';
import HomeView from './view';

import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore"; 

const db = getFirestore();

class HomeContainer extends React.Component {
	
	componentDidMount() {
		this._queryData();
	}
	
	async _queryData() {
		const querySnapshot = await getDocs(collection(db, "users"));
		querySnapshot.forEach((doc) => {
			console.log(`${doc.id} => `, doc.data());
		});
	}
	
	render() {
		return (
		  <HomeView {...this.props} />
		);
	}
}

export default HomeContainer;
