import React, {} from 'react';
import {
    NavLink
} from 'react-router-dom';

class QuestionsView extends React.Component {
    render() {
        return (
            <div className={['questions-container content-container']}>
                <div className={'content-inner'}>
                    <div className={'action-column'}>
                        <NavLink 
                            className={['btn-add-new button']}
                            to={'/add-question'}
                        >
                            <div className={'icon-add'}>
                                <span>+</span>
                            </div>
                            <div className={'add-text'}>Add New</div>
                        </NavLink>
                    </div>
                    <div className={'column-header'}>
                        Questions
                    </div>
                </div>
            </div>
        )
    }
}

export default QuestionsView;
