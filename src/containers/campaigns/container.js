import React from 'react';
import {
    getFirestore, 
    collection, 
    onSnapshot, 
    deleteDoc, 
    doc 
} from "firebase/firestore"; 
import { NotificationManager } from 'react-notifications';
import CampaignsView from './view';
const db = getFirestore();

class CampaignsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: false,
        }

        this.doDelete = this.doDelete.bind(this);
    }

    componentDidMount() {
        this.queryData();
    }

    componentWillUnmount() {
        this.qs();
    }

    async doDelete (uid) {
        await deleteDoc(doc(db, 'campaigns', uid));
        NotificationManager.success('Deleted ID', uid);
    }

    async queryData() {
        this.qs = onSnapshot(collection(db, 'campaigns'), (doc) => {
            let arr = [];
            doc.forEach((ds) => {
                let tempArr = ds.data();
                tempArr.id = ds.id;
                arr.push(tempArr);
            }); 
            this.setState({ data: arr });            
        });
    }

    render() {
        if ( !this.state.data ) return null;

        return (
            <CampaignsView 
                doDelete={this.doDelete}
                {...this.props} 
                {...this.state} 
            />
        );
    }
}

export default CampaignsContainer;
