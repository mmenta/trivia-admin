import React, { useEffect, useState } from 'react';
import { getFirestore, getDoc, doc } from "firebase/firestore"; 
import AddTemplateView from './view';
const db = getFirestore();

function AddTemplateContainer(props) {
    const [data, setData] = useState(false);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        // check if edit
        if ( props.history.location.state?.id ) {
            // query template
            queryTemplate(props.history.location.state.id);
        } else {
            setData(true);
        }
    }, []);

    async function queryTemplate(id) {
        const docRef = doc(db, 'templates', id);
        const docSnap = await getDoc(docRef);
        if ( docSnap.exists()) {
            let docData = docSnap.data();
            docData.id = id;
            setEdit(true);
            setData(docData);
        }
    }

    if ( !data ) return null; // prevent render until data set

    return (
        <AddTemplateView 
            data={data}
            edit={edit}
        />
    );
}

export default AddTemplateContainer;
