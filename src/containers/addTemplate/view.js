import React, { useEffect, useState } from 'react';
import {
    NavLink,
    useHistory,
} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import {  
    getFirestore, 
    collection, 
    addDoc, 
    updateDoc, 
    doc,
    Timestamp,
} from "firebase/firestore"; 
const db = getFirestore();

function AddTemplateView(props) {
    const history = useHistory();

    // create local state
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [markup, setMarkup] = useState('');

    // componentDidMount/willUpdate alternative
    useEffect(() => {
        // run function & dispatch here
        if ( props.edit ) {
            let data = props.data;
            setName(data.name);
            setCategory(data.category);
            setDescription(data.description);
            setMarkup(data.markup);
        }
        
    }, []);

    async function saveNew() {
        await addDoc(collection(db, 'templates'), {
            name: name,
            category: category,
            markup: markup,
            description: description,
            timestamp: Timestamp.now(),
        }).then((doc) => {
            console.log(`saved => ${doc.id}`);
            history.push('/templates');
        });
    }

    async function saveEdit(id) {
        await updateDoc(doc(db, 'templates', id), {
            name: name,
            category: category,
            markup: markup,
            description: description,
        }).then((doc) => {
            console.log(`update => ${id}`);
            history.push('/templates');
        });
    }

    function doSave() {
        NotificationManager.success('Saved', '');

        // validate
        console.log('props.edit >> ', props.edit);


        // save to firebase
        if ( !props.edit ) {
            saveNew();
        } else {
            saveEdit(props.data.id)
        }
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleCategory(e) {
        setCategory(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handleMarkup(e) {
        setMarkup(e.target.value);
    }

    function renderName() {
        return (
            <div className={'section half'}>
                <div className={['label label-row']}>
                    Title
                </div>
                <div className={'input-full'}>
                    <input 
                        className={'input-normal'}
                        value={name}
                        onChange={(e) => handleName(e)}
                    />    
                </div>
            </div>
        )
    }

    function renderCategory() {
        return (
            <div className={'section quarter'}>
                <div className={['label label-row']}>
                    Category
                </div>
                <div className={'input-full'}>
                    <input 
                        className={'input-normal'}
                        value={category}
                        onChange={(e) => handleCategory(e)}
                    />    
                </div>
            </div>
        )
    }

    function renderDescription() {
        return (
            <div className={'section three-quarters desc-align'}>
                <div className={['label label-row']}>
                    Description
                </div>
                <div className={'input-full'}>
                    <textarea 
                        className={'input-normal'}
                        value={description}
                        onChange={(e) => handleDescription(e)}
                    />    
                </div>
            </div>
        )
    }

    function renderMarkup() {
        return (
            <div className={'section three-quarters desc-align'}>
                <div className={['label label-row']}>
                    Email Template Markup (paste here)
                </div>
                <div className={'input-full'}>
                    <textarea 
                        className={'textarea-large'}
                        value={markup}
                        onChange={(e) => handleMarkup(e)}
                    />    
                </div>
            </div>
        )
    }

    return (
      <div className={['add-template-container content-container']}>
            <div className={'content-inner'}>
                <div className={'column-header'}>
                    Create Email Template
                </div>

                <div className={'flex-row'}>
                    { renderName() }
                    { renderCategory() }    
                </div>

                { renderDescription() }
                { renderMarkup() }

                <div 
                    className={'btn-save btn'}
                    onClick={() => doSave()}
                >
                    Save
                </div>
            </div>
        </div>
    )
}

export default AddTemplateView;
