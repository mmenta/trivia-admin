import React from 'react';
import TemplatesView from './view';
import { 
    getFirestore, 
    collection, 
    onSnapshot, 
    deleteDoc, 
    doc 
} from "firebase/firestore"; 
import { NotificationManager } from 'react-notifications';
const db = getFirestore();

class TemplatesContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: false,
        }
    }

    componentDidMount() {
        this.queryData();
    }

    componentWillUnmount() {
        this.qs();
    }

    async doDelete (uid) {
        await deleteDoc(doc(db, 'templates', uid));
        NotificationManager.success('Deleted ID', uid);
    }

    async queryData() {
        this.qs = onSnapshot(collection(db, 'templates'), (doc) => {
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
            <TemplatesView 
                doDelete={this.doDelete}
                {...this.props} 
                {...this.state} 
            />
        )
    }
}

export default TemplatesContainer;
