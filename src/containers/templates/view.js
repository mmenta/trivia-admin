import React, { useEffect, useState } from 'react';
import {
    NavLink,
    useHistory,
} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore"; 
const db = getFirestore();

function TemplatesView(props) {
    const history = useHistory();

    function viewTemplate(id) {
        history.push({
            pathname: '/add-template',
            state: {
                id: id,
            }
        });
    }

    function renderTemplates(data) {
        return (
            <div>
                {data.map((e, i) => {
                    return (
                        <div className={'row'} key={i}>
                            <div className={'col'}>
                                { e.name }
                            </div>
                            <div className={'col'}>
                                { e.category }
                            </div>
                            <div className={'col'}>
                                { e.description }
                            </div>
                            <div className={'col'}>
                                { e.timestamp.seconds }
                            </div>
                            <div className={'col col-alt'}>
                                <div 
                                    className={'button btn-view'}
                                    onClick={() => viewTemplate(e.id)}
                                >
                                    View
                                </div>
                                <div 
                                    className={'button btn-delete'}
                                    onClick={() => props.doDelete(e.id)}
                                >
                                    Delete
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={['templates-container content-container']}>
            <div className={'content-inner'}>
                <div className={'action-column'}>
                    <NavLink to={'/add-template'}>
                        <div className={['btn-add-new button']}>
                            <div className={'icon-add'}>
                                <span>+</span>
                            </div>
                            <div className={'add-text'}>Add New</div>
                        </div>
                    </NavLink>
                </div>
                <div className={'column-header'}>
                    Templates
                </div>
                {renderTemplates(props.data)}
            </div>
        </div>
    )
}

export default TemplatesView;
