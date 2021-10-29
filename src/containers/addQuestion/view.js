import React, {} from 'react';
import { NotificationManager } from 'react-notifications';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore"; 
const db = getFirestore();

class AddQuestionsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answers: [''],
            correctAnswer: 0,
        }
    }

    componentDidUpdate(prevProps) {
        if ( this.props.edit !== prevProps.edit ) {
            if ( this.props.edit ) {
             let { question, answers, correctAnswer } = this.props.data;
                this.setState({
                    question: question,
                    answers: answers,
                    correctAnswer: correctAnswer,
                });
            }
        }
    }
    
    async doSave() {
        let { question, answers, correctAnswer } = this.state;

        // show notification
        NotificationManager.success('Saved', '');

        // validate


        // save to firebase
        // TODO: let's add a timestamp
        if ( !this.props.edit ) {
            await addDoc(collection(db, 'questions'), {
                question: question,
                answers: answers,
                correctAnswer: correctAnswer,
            }).then((doc) => {
                console.log(`saved => ${doc.id} => `, this.state);
            });
        } else {
            let { id } = this.props.history.location.state;
            await setDoc(doc(db, 'questions', id), {
                question: question,
                answers: answers,
                correctAnswer: correctAnswer,
            });
        }

        // clear inputs
        this.clearInputs();

        // redirect to questions list
        this.props.history.push('/');
    }

    clearInputs() {
        this.setState({
            question: '',
            answers: [''],
            correctAnswer: 0,
        });
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
            
            </>
        )
    }
}

export default AddQuestionsView;
