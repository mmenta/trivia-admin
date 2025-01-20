import React, { } from 'react';
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
    getDocs,
    updateDoc,
} from "firebase/firestore";

import {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    getStorage,
    deleteObject,
} from "firebase/storage";


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
            defaultQ: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.edit !== prevProps.edit) {

            if (this.props.edit) {
                let {
                    question,
                    answers,
                    correctAnswer,
                    hint,
                    category,
                    image,
                    defaultQ,
                } = this.props.data;

                this.setState({
                    question: question,
                    answers: answers,
                    correctAnswer: correctAnswer,
                    hint: hint,
                    category: category,
                    selectedImage: image,
                    defaultQ: defaultQ
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
                    }, { merge: true }
                    );

                    console.log('saved >> ', downloadURL);
                });
            }
        )
    }

    async doSave() {
        let { question, answers, correctAnswer, hint, category, defaultQ } = this.state;

        // show notification
        NotificationManager.success('Saved', '');

        // validate

        // upload image
        let { selectedImage } = this.state;

        // save to firebase
        // TODO: let's add a timestamp
        if (!this.props.edit) {

            // check to see if default Q changed
            if (defaultQ) {
                const collectionRef = collection(db, 'questions');
                const querySnapshot = await getDocs(collectionRef);
                const updatePromises = querySnapshot.docs.map(doc => {
                    return updateDoc(doc.ref, {
                        defaultQ: false
                    });
                });
                await Promise.all(updatePromises);
            }

            await addDoc(collection(db, 'questions'), {
                question: question,
                answers: answers,
                correctAnswer: correctAnswer,
                hint: hint,
                category: category.toLowerCase(),
                timestamp: Timestamp.now(),
                defaultQ: defaultQ
            }).then((doc) => {
                console.log(`saved => ${doc.id} => `, this.state);
                if (selectedImage) {
                    this.doUploadImage(selectedImage, doc.id);
                }
            });
        } else {
            let { id } = this.props.history.location.state;

            // check to see if default Q changed
            if (defaultQ) {
                const collectionRef = collection(db, 'questions');
                const querySnapshot = await getDocs(collectionRef);
                const updatePromises = querySnapshot.docs.map(doc => {
                    return updateDoc(doc.ref, {
                        defaultQ: false
                    });
                });
                await Promise.all(updatePromises);
            }

            await setDoc(doc(db, 'questions', id), {
                question: question,
                answers: answers,
                correctAnswer: correctAnswer,
                hint: hint,
                category: category.toLowerCase(),
                timestamp: Timestamp.now(),
                defaultQ: defaultQ
            });

            if (selectedImage) {
                this.doUploadImage(selectedImage, id);
            }
        }

        // clear inputs
        this.clearInputs();

        // redirect to questions list
        this.props.history.push('/');
    }

    async doRemoveImage() {
        this.setState({
            selectedImage: false,
        })

        // Create a reference to image
        const imageRef = ref(storage, this.state.selectedImage);

        // Delete the file
        deleteObject(imageRef).then(() => {
            // File deleted successfully
            console.group('file deleted >>');
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log('error >> ', error);
        });

        // delete from firebase
        if (this.props.edit) {
            let { id } = this.props.history.location.state;
            await updateDoc(doc(db, 'questions', id), {
                image: false
            });
        }
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
                            {i !== 0 && (
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

    renderSelectedImage() {
        let { selectedImage } = this.state;
        if (!selectedImage) return null;

        let { image } = this.props.data;
        let imShow = typeof image !== 'undefined' && image ?
            selectedImage : URL.createObjectURL(selectedImage);

        return (
            <>
                <div className={'image-wrapper'}>
                    <img
                        alt="not found"
                        className={'image-preview'}
                        src={imShow}
                    />
                </div>
                <div
                    onClick={() => this.doRemoveImage()}
                    className={'btn-remove'}
                >
                    Remove
                </div>
            </>
        )
    }

    renderImageUpload() {
        return (
            <div className={'section'}>
                <div className={['label label-row']}>
                    Upload Image (optional)
                </div>
                {!this.state.selectedImage && (
                    <div className={'input-full'}>
                        <input
                            type="file"
                            name="myImage"
                            onChange={(event) => {
                                this.setState({
                                    selectedImage: event.target.files[0],
                                })
                            }}
                        />
                    </div>
                )}
                {this.renderSelectedImage()}
            </div>
        )
    }

    renderId(edit) {
        if (!edit) return null;
        let { id } = this.props.history.location.state;

        return (
            <div className={'section'}>
                <div className={['label label-row']}>
                    ID
                </div>
                <div className={'input-half'}>
                    {id}
                </div>
            </div>
        )
    }

    handleCheckbox = (event) => {
        this.setState({ defaultQ: event.target.checked });
    }

    renderSetDefault() {
        return (
            <div className={'default-container section'}>
                <div className={['label label-row']}>
                    Make Default Question
                </div>
                <input
                    className={'default-checkbox'}
                    type="checkbox"
                    checked={this.state.defaultQ}
                    onChange={this.handleCheckbox}
                />
            </div>
        )
    }

    render() {
        let edit = this.props.edit ? true : false;

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
                            {edit ? 'Edit' : 'Create'} Question
                        </div>

                        {this.renderId(edit)}
                        {this.renderSetDefault()}
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
