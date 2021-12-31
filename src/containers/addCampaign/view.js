import React, { useEffect, useState } from 'react';
import {
    NavLink,
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
        if ( props.edit ) {
            let data = props.data;
            let templates = props.templates;
            let trivia = props.trivia;

            setName(data.name);
            setSubject(data.subjectLine);
            setFrom(data.fromLine);
            setLink(data.outgoingLink);

            let templateIndex, triviaIndex;

            // determine templateSelect
            templates.forEach((e, i) => {
                if ( e.id == data.templateId ) {
                    templateIndex = i;
                }
            });

            trivia.forEach((j, k) => {
                if ( j.id == data.triviaId ) {
                    triviaIndex = k;
                }
            });

            handleTemplate(templateIndex, triviaIndex);
            setTrivia(triviaIndex);
        } else {
            setTrivia('initial');
            setTemplate('initial');
        }
    }, []);

    async function saveNew() {
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

    async function saveEdit(id) {
        await updateDoc(doc(db, 'campaigns', id), {
            name: name,
            subjectLine: subject,
            fromLine: from,
            outgoingLink: link,
            templateId: props.templates[templateSelect].id,
            triviaId: props.trivia[triviaSelect].id,
        }).then(() => {
            console.log(`update => ${id}`);
            history.push('/campaigns');
        });
    }

    function doSave() {
        NotificationManager.success('Saved Campaign');

        // validate

        // save to firebase
        !props.edit ? saveNew() : saveEdit(props.data.id);        
    }

    function handleName(e) {
        setName(e);
    }

    function handleSubject(e) {
        setSubject(e);
    }

    function handleFrom(e) {
        setFrom(e);
    }

    function handleLink(e) {
        setLink(e);
    }

    function handleTemplate(templateIndex, triviaIndex) {
        setTemplate(templateIndex);

        let localMarkup = templateIndex === 'initial' ?
            '' : props.templates[templateIndex].markup;

        setMarkup(localMarkup);

        // parse questions into markup
        if ( triviaIndex !== 'initial' ) {
            parseIntoMarkup(triviaIndex, templateIndex);
        }
    }

    function handleTrivia(triviaIndex, templateIndex) {
        setTrivia(triviaIndex);

        // parse questions into markup preview
        if ( templateIndex !== 'initial' ) {
            parseIntoMarkup(triviaIndex, templateIndex);
        }
    }

    function parseIntoMarkup(trivSelect, tempSelect) { 
        if ( tempSelect === 'initial' ) return false;
        let markupFinal = props.templates[tempSelect].markup;
        let triviaRaw = props.trivia[trivSelect];

        // lets parse questions into markup
        if ( trivSelect !== 'initial' ) {
            markupFinal = markupFinal.replace('{{question}}', triviaRaw.question);
            // parse answers
            triviaRaw.answers.forEach((e, i) => {
                markupFinal = markupFinal.replace(`{{answer${i}}}`, triviaRaw.answers[i]);
            });
        }
            
        // reload preview
        setMarkup(markupFinal);
    }

    function copyMarkup(e) {
        NotificationManager.success('Markup copied to clipboard');
        // copy to clipboard
        navigator.clipboard.writeText(e);
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
                        onChange={(e) => handleName(e.target.value)}
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
                        onChange={(e) => handleSubject(e.target.value)}
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
                        onChange={(e) => handleFrom(e.target.value)}
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
                        onChange={(e) => handleLink(e.target.value)}
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
                        onChange={(e) => handleTemplate(e.target.value, triviaSelect)}
                        multiple={false}
                    >
                        <option value={'initial'}></option>
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
                        onChange={(e) => handleTrivia(e.target.value, templateSelect)}
                        multiple={false}
                    >
                        <option value={'initial'}></option>
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
                <div 
                    className={'btn-copy btn'}
                    onClick={() => copyMarkup(markup)}
                >
                    Copy Markup
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
                <div className={'action-column'}>
                    <NavLink to={'/campaigns'}>
                        <div className={['btn-add-new button']}>
                            <div className={'icon-back'}>
                                <span>{'<'}</span>
                            </div>
                            <div className={'add-text'}>Back</div>
                        </div>
                    </NavLink>
                </div>
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
