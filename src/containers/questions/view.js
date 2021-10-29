import React, {} from 'react';
import {
    NavLink
} from 'react-router-dom';

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


    renderQuestions() {
        let { data } = this.props;

        return (
            <div>
                {data.map((e, i) => {
                    return (
                        <div className={'row'} key={i}>
                            <div className={'col'}>
                                {e.id}
                            </div>

                            <div className={'col'}>
                                {e.question}
                            </div>

                            <div className={'col'}>
                                {e.answers[e.correctAnswer]}
                            </div>

                            <div className={'col'}>
                                {'11/07/21'}
                            </div>

                            <div className={'col col-alt'}>
                                <div 
                                    className={'button btn-view'}
                                    onClick={() => this.viewQuestion(e.id)}
                                >
                                    View
                                </div>

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
            </div>
        )
        
    }

    render() {


        return (
            <div className={['questions-container content-container']}>
                <div className={'content-inner'}>
                    <div className={'action-column'}>
                        <NavLink 
                            to={'/add-question'}
                        >
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

                    {this.renderQuestions()}



                </div>
            </div>
        )
    }
}

export default QuestionsView;
