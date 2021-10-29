import React from 'react';
import { getFirestore, getDoc, doc } from "firebase/firestore"; 
import AddQuestionsView from './view';
const db = getFirestore();

class AddQuestionsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: false,
            edit: false,
        }
    }

    componentDidMount() {
        if ( this.props.history.location.state?.id ) {
            this.queryQuestion(this.props.history.location.state.id);
        } else {
            this.setState({
                data: true,
                edit: false,
            });
        }
    }

    async queryQuestion(id) {
        const docRef = doc(db, 'questions', id);
        const docSnap = await getDoc(docRef);

        if ( docSnap.exists()) {
            this.setState({
                data: docSnap.data(),
                edit: true,
            });
        }
    }

    render() {
        return (
            <AddQuestionsView 
                {...this.props} 
                data={this.state.data}
                edit={this.state.edit}
            />
        );
    }
}

export default AddQuestionsContainer;
