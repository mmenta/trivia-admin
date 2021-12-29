import React, { useEffect, useState} from 'react';
import {
    useHistory,
} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import ReactHtmlParser from 'react-html-parser';
import {
    getFirestore, 
    collection, 
    addDoc, 
    updateDoc, 
    doc,
    Timestamp,
} from "firebase/firestore"; 
const db = getFirestore();

function AddCampaignView(props) {
    const history = useHistory();

    // create local state
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [from, setFrom] = useState('');
    const [templateSelect, setTemplate] = useState('');
    const [triviaSelect, setTrivia] = useState('');
    const [link, setLink] = useState('http://');
    const [markup, setMarkup] = useState('');

    // componentDidMount alternative
    useEffect(() => {
        // run function & dispatch here
    }, []);

    async function doSave() {
        NotificationManager.success('Saved Campaign');
        await addDoc(collection(db, 'campaigns'), {
            name: name,
            subjectLine: subject,
            fromLine: from,
            outgoingLink: link,
            templateId: props.templates[templateSelect].id,
            triviaId: props.trivia[triviaSelect].id,
            timestamp: Timestamp.now(),
        }).then((doc) => {
            console.log(`saved => ${doc.id}`);
            history.push('/campaigns');
        });
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleSubject(e) {
        setSubject(e.target.value);
    }

    function handleFrom(e) {
        setFrom(e.target.value);
    }

    function handleTemplate(e) {
        setTemplate(e.target.value);

        // load preview
        setMarkup(props.templates[e.target.value].markup);

        // parse questions into markup
        if ( triviaSelect ) {
            parseIntoMarkup(triviaSelect, e.target.value);
        }
    }

    function handleTrivia(e) {
        setTrivia(e.target.value);

        // parse questions into markup preview
        if ( templateSelect ) {
            parseIntoMarkup(e.target.value, templateSelect);
        }
    }

    function handleLink(e) {
        setLink(e.target.value);
    }

    function parseIntoMarkup(trivSelect, tempSelect) {
        let markupRaw = props.templates[tempSelect].markup;
        let markupFinal;
        let triviaRaw = props.trivia[trivSelect];

        // lets parse questions into markup
        markupFinal = markupRaw.replace('{{question}}', triviaRaw.question);

        // parse answers
        triviaRaw.answers.forEach((e, i) => {
            markupFinal = markupFinal.replace(`{{answer${i}}}`, triviaRaw.answers[i]);
        });
            
        // reload preview
        setMarkup(markupFinal);
    }

    function renderName() {
        return (
            <div className={'section three-quarters'}>
                <div className={['label label-row']}>
                    Campaign Name
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

    function renderSubject() {
        return (
            <div className={'section half mr-25'}>
                <div className={['label label-row']}>
                    Email Subject Line
                </div>
                <div className={'input-full'}>
                    <input 
                        className={'input-normal'}
                        value={subject}
                        onChange={(e) => handleSubject(e)}
                    />    
                </div>
            </div>
        )
    }

    function renderFrom() {
        return (
            <div className={'section half'}>
                <div className={['label label-row']}>
                    Email From Line
                </div>
                <div className={'input-full'}>
                    <input 
                        className={'input-normal'}
                        value={from}
                        onChange={(e) => handleFrom(e)}
                    />    
                </div>
            </div>
        )
    }

    function renderLink() {
        return (
            <div className={'section half'}>
                <div className={['label label-row']}>
                    Outgoing Link
                </div>
                <div className={'input-full'}>
                    <input 
                        className={'input-normal'}
                        value={link}
                        onChange={(e) => handleLink(e)}
                    />    
                </div>
            </div>
        )
    }

    function renderTemplates(templates) {
        if ( !templates ) return null;
        return (
            <div className={'section three-quarters'}>
                <div className={['label label-row']}>
                    Email Template
                </div>
                <div className={'input-full select-wrapper'}>
                    <select 
                        value={templateSelect} 
                        onChange={(e) => handleTemplate(e)}
                        multiple={false}
                    >
                        {templates.map((e, i) => {
                            return (
                                <option key={i} value={i}>{e.name}</option>
                            )
                        })}
                    </select>
                    <div className={'arrow-down'}></div>
                </div>
            </div>
        )
    }

    function renderTrivia(trivia) {
        if ( !trivia ) return null;
        return (
            <div className={'section three-quarters'}>
                <div className={['label label-row']}>
                    Trivia Question (assiciate trivia question to template)
                </div>
                <div className={'input-full select-wrapper'}>
                    <select 
                        value={triviaSelect} 
                        onChange={(e) => handleTrivia(e)}
                        multiple={false}
                    >
                        {trivia.map((e, i) => {
                            return (
                                <option key={i} value={i}>{e.question}</option>
                            )
                        })}
                    </select>
                    <div className={'arrow-down'}></div>
                </div>
            </div>
        )
    }

    function renderPreview() {
        return (
            <div className={'section preview'}>
                <div className={['label label-row']}>
                    Preview
                </div>
                <div className={'preview-box'}>
                    { ReactHtmlParser(markup) }
                </div>
            </div>
        )
    }

    return (
        <div className={['add-campaign-container content-container']}>
            <div className={'content-inner'}>
                <div className={'column-header'}>
                    Create New Campaign
                </div>

                <div className={'flex-row'}>
                    { renderName() }
                </div>

                <div className={'flex-row'}>
                    { renderSubject() }
                    { renderFrom() }
                </div>

                <div className={'flex-row'}>
                    { renderTemplates(props.templates) }
                </div>

                <div className={'flex-row'}>
                    { renderTrivia(props.trivia) }
                </div>

                { renderLink() }
                { renderPreview() }

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

export default AddCampaignView;
