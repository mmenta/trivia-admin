import React, { useEffect, useState } from 'react';
import { getFirestore, getDocs, collection, doc, getDoc } from "firebase/firestore"; 
import AddCampaignView from './view';
const db = getFirestore();

function AddCampaignContainer(props) {
    const [trivia, setTrivia] = useState(false);
    const [templates, setTemplates] = useState(false);
    const [data, setData] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        // check if edit
        if ( props.history.location.state?.id ) {
            queryEditCampaign(props.history.location.state.id);
        } 
        queryAllTemplates();
        queryAllTrivia();
    }, []);

    async function queryEditCampaign(id) {
        // query 
        const docRef = doc(db, 'campaigns', id);
        const docSnap = await getDoc(docRef);
        if ( docSnap.exists() ) {
            let docData = docSnap.data();
            docData.id = id;
            setEdit(true);
            setData(docData);
        }
    }

    // query all email templates
    async function queryAllTemplates() {
        const qs = await getDocs(collection(db, 'templates'));
        let arr = [];
        qs.forEach((doc) => {
            let tempArr = doc.data();
            tempArr.id = doc.id;
            arr.push(tempArr);
        });
        setTemplates(arr);
    }

    // query all trivia questions
    async function queryAllTrivia() {
        const qs = await getDocs(collection(db, 'questions'));
        let arr = [];
        qs.forEach((doc) => {
            let tempArr = doc.data();
            tempArr.id = doc.id;
            arr.push(tempArr);
        });
        setTrivia(arr);
    }
    
    if ( !trivia || !templates ) return null; // wait till data is loaded

    return (
        <AddCampaignView 
            templates={templates}
            trivia={trivia}
            data={data}
            edit={edit}
        />
    );
}

export default AddCampaignContainer;
