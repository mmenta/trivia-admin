import React, { useEffect, useState } from 'react';
import { getFirestore, getDocs, doc, query, collection } from "firebase/firestore"; 
import AddCampaignView from './view';
const db = getFirestore();

function AddCampaignContainer(props) {
    const [trivia, setTrivia] = useState(false);
    const [templates, setTemplates] = useState(false);

    useEffect(() => {
        

        queryAllTemplates();
        queryAllTrivia();


    }, []);

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
        />
    );
}

export default AddCampaignContainer;
