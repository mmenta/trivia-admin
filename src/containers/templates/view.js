import React, {} from 'react';
import {
    NavLink,
    useHistory,
} from 'react-router-dom';
import { FormatDate } from '../../config/methods';

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

    function renderHeaderRow() {
        return (
            <div className={'row header-row'}>
                <div className={'col'}>Template Name</div>
                <div className={'col small'}>Category</div>
                <div className={'col'}>Description</div>
                <div className={'col small'}>Date</div>
                <div className={'col small col-alt'}></div>
            </div>
        )
    }

    function renderTemplates(data) {
        return (
            <div>
                {data.map((e, i) => {
                    let mod = ( i % 2 == 0 ) ? 'even' : 'odd';

                    return (
                        <div className={`row ${mod}`} key={i}>
                            <div 
                                className={'col'}
                                onClick={() => viewTemplate(e.id)}
                            >
                                { e.name }
                            </div>
                            <div 
                                className={'col small'}
                                onClick={() => viewTemplate(e.id)}
                            >
                                { e.category }
                            </div>
                            <div 
                                className={'col'}
                                onClick={() => viewTemplate(e.id)}
                            >
                                { e.description }
                            </div>
                            <div 
                                className={'col small'}
                                onClick={() => viewTemplate(e.id)}
                            >
                                {FormatDate(e.timestamp.seconds)}
                            </div>
                            <div className={'col small col-alt'}>
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
                { renderHeaderRow() }
                { renderTemplates(props.data) }
            </div>
        </div>
    )
}

export default TemplatesView;
