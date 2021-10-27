import React, {} from 'react';

import { NotificationContainer, NotificationManager } from 'react-notifications';

class AddQuestionsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answers: [''],
            answersCount: 1,
            correctAnswer: 0,
        }
    }
    
    doSave() {
        console.log('this.state >> ', this.state);

        NotificationManager.success('Saved', '');

        // validate


        // save to firebase




        // redirect to questions list
    }

    doRemove(i) {
        let { answers, correctAnswer } = this.state;
        let answerArr = answers.slice();
        answerArr.splice(i, 1);
        this.setState({
            answers: answerArr,
            correctAnswer: correctAnswer == i ? 0 : correctAnswer,
        });
    }

    doCorrect(i) {
        this.setState({
            correctAnswer: i,
        });
    }

    handleQuestionChange(e) {
        this.setState({
            question: e.target.value
        });
    }

    handleAnswerChange(e, i) {
        let answerArr = this.state.answers.slice();
        answerArr[i] = e.target.value;
        this.setState({
            answers: answerArr,
        });
    }
    
    addNewAnswer() {
        let arrCopy = this.state.answers.slice();
        arrCopy.push('');
        this.setState({
            answers: arrCopy,
        });
    }

    renderCorrectCheckmark(i) {
        let { correctAnswer } = this.state;
        let styling = correctAnswer == i ? ['label red'] : ['label'];
        let text = correctAnswer == i ? 'Correct Answer' : 'Mark As Correct Answer';

        return (
            <div 
                className={'check-contain'}
                onClick={() => this.doCorrect(i)}
            >
                {correctAnswer != i && (<div className={'checkbox'}></div>)}
                <div className={styling}>{text}</div>
            </div>
        )
    }

    renderAnswers() {
        let { answers } = this.state;

        return (
            answers.map((e, i) => {
                let iterate = i + 1;

                return (
                    <div className={'section'} key={i}>

                        <div className={'label-row'}>
                            <div className={'label'}>
                                Answer {iterate}
                            </div>
                            {this.renderCorrectCheckmark(i)}
                        </div>

                        <div className={'input-full'}>
                            <input 
                                className={'input-normal'} 
                                onChange={(ev) => this.handleAnswerChange(ev, i)}
                                value={e}
                            />
                            { i !== 0 && (
                                <div className={'action-row'}>
                                    <div 
                                        className={['btn-remove btn']}
                                        onClick={() => this.doRemove(i)}
                                    >
                                        Remove
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })
        )
    }

    renderQuestion() {
        return (
            <div className={'section'}>
                <div className={['label label-row']}>
                    Question
                </div>
                <div className={'input-full'}>
                    <textarea 
                        className={'textarea-normal'}
                        value={this.state.question}
                        onChange={(e) => this.handleQuestionChange(e)}
                    >    
                    </textarea>
                </div>
            </div>
        )
    }

    render() {
        return (
            <>
            <div className={['questions-container content-container']}>
                <div className={'content-inner'}>
                    <div className={'column-header'}>
                        Create Question
                    </div>
                    {this.renderQuestion()}
                    {this.renderAnswers()}
                    <div 
                        className={['btn-add-answer button']}
                        onClick={() => this.addNewAnswer()}
                    >
                        <div className={'icon-add'}>
                            <span>+</span>
                        </div>
                        <div className={'add-text'}>Add Answer</div>
                    </div>
                    <div 
                        className={'btn-save btn'}
                        onClick={() => this.doSave()}
                    >
                        Save
                    </div>
                </div>
            </div>
            <NotificationContainer />
            </>
        )
    }
}

export default AddQuestionsView;
