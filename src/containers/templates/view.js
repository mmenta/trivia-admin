import React, {} from 'react';
import {
    NavLink
} from 'react-router-dom';

class TemplatesView extends React.Component {

    constructor(props) {
        super(props);
    }


    renderTemplates() {

        return (
            <div className={'row'}>
                <div className={'col'}>
                    Template Name
                </div>
                <div className={'col'}>
                    Template Category
                </div>
                <div className={'col'}>
                    Description
                </div>
                <div className={'col'}>
                    {'11/07/21'}
                </div>
                <div className={'col col-alt'}>
                    <div 
                        className={'button btn-view'}
                        onClick={() => {}}
                    >
                        View
                    </div>
                    <div 
                        className={'button btn-delete'}
                        onClick={() => {}}
                    >
                        Delete
                    </div>
                </div>
            </div>
        )
    }

    render() {

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
                    { this.renderTemplates()}
                </div>
            </div>
        )
    }
}

export default TemplatesView;
