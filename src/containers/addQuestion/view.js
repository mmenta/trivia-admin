import React, {} from 'react';
import {
    NavLink,
} from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    setDoc, 
    doc,
    Timestamp,
} from "firebase/firestore"; 

import { getStorage } from 'firebase/storage';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


const db = getFirestore();
const storage = getStorage();

class AddQuestionsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: '',
            answers: [''],
            correctAnswer: 0,
            selectedImage: false,
            hint: '',
            category: '',
            image: false,
        }
    }

    componentDidUpdate(prevProps) {
        if ( this.props.edit !== prevProps.edit ) {
            if ( this.props.edit ) {
                let { 
                    question, 
                    answers, 
                    correctAnswer,
                    hint, 
                    category, 
                    image 
                } = this.props.data;

                this.setState({
                    question: question,
                    answers: answers,
                    correctAnswer: correctAnswer,
                    hint: hint,
                    category: category,
                    selectedImage: image,
                });
            }
        }
    }

    doUploadImage(selectedImage, docId) {
        const storageRef = ref(storage, `files/${docId}.png`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);

        uploadTask.on('state_changed',
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // save url to firebase
                        setDoc(doc(db, 'questions', docId), {
                            image: downloadURL
                            }, { merge: true}
                        );

                        console.log('saved >> ', downloadURL);
                    });
                }
        )
    }
    
    async doSave() {
        let { question, answers, correctAnswer, hint, category } = this.state;

        // show notification
        NotificationManager.success('Saved', '');

        // validate
        
        // upload image
        let { selectedImage } = this.state;

        // save to firebase
        // TODO: let's add a timestamp
        if ( !this.props.edit ) {

            await addDoc(collection(db, 'questions'), {
                question: question,
                answers: answers,
                correctAnswer: correctAnswer,
                hint: hint,
                category: category.toLowerCase(),
                timestamp: Timestamp.now(),
            }).then((doc) => {
                console.log(`saved => ${doc.id} => `, this.state);
                if ( selectedImage ) {
                    this.doUploadImage(selectedImage, doc.id);
                }
            });
        } else {

            let { id } = this.props.history.location.state;
            await setDoc(doc(db, 'questions', id), {
                question: question,
                answers: answers,
                correctAnswer: correctAnswer,
                hint: hint,
                category: category.toLowerCase(),
                timestamp: Timestamp.now(),
            });

            if ( selectedImage ) {
                this.doUploadImage(selectedImage, id);
            }
        }

        // clear inputs
        this.clearInputs();

        // redirect to questions list
        this.props.history.push('/');
    }

    doRemoveImage() {
        // this.setState({
        //     selectedImage: false,
        // })

        // Create a reference to 'mountains.jpg'
        // const mountainsRef = ref(storage, this.state.selectedImage);

        // uploadBytes(mountainsRef, this.state.selectedImage).then((snapshot) => {
        //     console.log('Uploaded a blob or file! >> ', snapshot);
        // });
    }

    clearInputs() {
        this.setState({
            question: '',
            answers: [''],
            hint: '',
            category: '',
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

    handleHintChange(e) {
        this.setState({
            hint: e.target.value,
        })
    }

    handleCategoryChange(e) {
        this.setState({
            category: e.target.value,
        })
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

    renderHint() {
         let { hint } = this.state;

        return (
            <div className={'section'}>
                <div className={['label label-row']}>
                    Hint
                </div>
                <div className={'input-full'}>
                    <textarea 
                        className={'textarea-normal'}
                        value={hint}
                        onChange={(e) => this.handleHintChange(e)}
                    >    
                    </textarea>
                </div>
            </div>
        )
    }

    renderCategory() {
         let { category } = this.state;

        return (
            <div className={'section'}>
                <div className={['label label-row']}>
                    Category
                </div>
                <div className={'input-half'}>
                    <input 
                        className={'input-normal'} 
                        onChange={(ev) => this.handleCategoryChange(ev)}
                        value={category}
                    />
                </div>
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

    renderImageUpload() {

        return (
            <div className={'section'}>
                <div className={['label label-row']}>
                    Upload Image (optional)
                </div>

                { !this.state.selectedImage && ( 
                    <div className={'input-full'}>
                        <input
                            type="file"
                            name="myImage"
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                this.setState({
                                    selectedImage: event.target.files[0],
                                })
                            }}
                        />
                    </div>
                )}
                
                { this.state.selectedImage && (
                    <>
                        <div className={'image-wrapper'}>    
                            <img 
                                alt="not found" 
                                className={'image-preview'} 
                                src={URL.createObjectURL(this.state.selectedImage)} 
                            />
                        </div>
                        <div 
                            onClick={() => this.doRemoveImage()}
                            className={'btn-remove'}
                        >
                            Remove
                        </div>
                    </>
                )}
            </div>
        )
    }

    render() {
        return (
            <>
            <div className={['questions-container content-container']}>
                <div className={'content-inner'}>
                    <div className={'action-column'}>
                        <NavLink to={'/'}>
                            <div className={['btn-add-new button']}>
                                <div className={'icon-back'}>
                                    <span>{'<'}</span>
                                </div>
                                <div className={'add-text'}>Back</div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={'column-header'}>
                        Create Question
                    </div>
                    {this.renderQuestion()}
                    {this.renderImageUpload()}
                    {this.renderCategory()}
                    {this.renderHint()}
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
