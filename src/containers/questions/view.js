import React, {} from 'react';
import {
    NavLink
} from 'react-router-dom';
import { FormatDate } from '../../config/methods';

class QuestionsView extends React.Component {
    constructor(props) {
        super(props);
    }

    viewQuestion(id) {
        // redirect to questions list
        this.props.history.push({
            pathname: '/add-question',
            state: {
                id: id,
            },
        });
    }

    renderHeaderRow() {
        return (
            <div className={'row header-row'}>
                <div className={'col'}>Question</div>
                <div className={'col'}>Answer</div>
                <div className={'col small'}>Date</div>
                <div className={'col small col-alt'}></div>
            </div>
        )
    }

    renderQuestions(data) {
        return (
            <>
            {data.map((e, i) => {
                let mod = ( i % 2 == 0 ) ? 'even' : 'odd';
                return (
                    <div className={`row ${mod}`} key={i}>
                        <div 
                            className={'col'}
                            onClick={() => this.viewQuestion(e.id)}
                        >
                            {e.question}
                        </div>
                        <div 
                            className={'col'}
                            onClick={() => this.viewQuestion(e.id)}
                        >
                            {e.answers[e.correctAnswer]
                        }</div>
                        <div 
                            className={'col small'}
                            onClick={() => this.viewQuestion(e.id)}
                        >
                            {FormatDate(e.timestamp.seconds)}
                        </div>
                        <div className={'col small col-alt'}>
                            <div 
                                className={'button btn-delete'}
                                onClick={() => this.props.doDelete(e.id)}
                            >
                                Delete
                            </div>
                        </div>
                    </div>
                )
            })}
            </>
        )
    }

    render() {
        return (
            <div className={['questions-container content-container']}>
                <div className={'content-inner'}>
                    <div className={'action-column'}>
                        <NavLink to={'/add-question'}>
                            <div className={['btn-add-new button']}>
                                <div className={'icon-add'}>
                                    <span>+</span>
                                </div>
                                <div className={'add-text'}>Add New</div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={'column-header'}>
                        Questions
                    </div>
                    { this.renderHeaderRow() }
                    { this.renderQuestions(this.props.data) }
                </div>
            </div>
        )
    }
}

export default QuestionsView;
