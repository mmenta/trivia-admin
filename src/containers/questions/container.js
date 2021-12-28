import React from 'react';
import {
    getFirestore, 
    collection, 
    onSnapshot, 
    deleteDoc, 
    doc 
} from "firebase/firestore"; 
import { NotificationManager } from 'react-notifications';
import QuestionsView from './view';
const db = getFirestore();

class QuestionsContainer extends React.Component {
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
        await deleteDoc(doc(db, 'questions', uid));
        NotificationManager.success('Deleted ID', uid);
    }

    async queryData() {
        this.qs = onSnapshot(collection(db, 'questions'), (doc) => {
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
            <QuestionsView 
                doDelete={this.doDelete}
                {...this.props} 
                {...this.state} 
            />
        )
    }
}

export default QuestionsContainer;
