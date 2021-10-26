import React, {} from 'react';

class AddQuestionsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: false,
            answers: [''],
            answersCount: 1,
        }
    }

    addNewAnswer() {
        let arrCopy = this.state.answers.slice();
        arrCopy.push('');
        this.setState({
            answers: arrCopy,
        });
    }

    renderAnswers() {
        let { answers } = this.state;

        return (
            answers.map((e, i) => {
                let iterate = i + 1;

                return (
                    <div className={'section'} key={i}>
                        <div className={'label'}>
                            Answer {iterate}
                        </div>
                        <div className={'input-full'}>
                            <input 
                                className={'input-normal'} 
                            />
                        </div>
                    </div>
                )
            })
        )
    }

    render() {
        return (
            <div className={['questions-container content-container']}>
                <div className={'content-inner'}>
                    <div className={'column-header'}>
                        Create Question
                    </div>

                    <div className={'section'}>
                        <div className={'label'}>
                            Question
                        </div>
                        <div className={'input-full'}>
                            <textarea className={'textarea-normal'}></textarea>
                        </div>
                    </div>

                    { this.renderAnswers() }

                    <div 
                        className={['btn-add-answer button']}
                        onClick={() => this.addNewAnswer()}
                    >
                        <div className={'icon-add'}>
                            <span>+</span>
                        </div>
                        <div className={'add-text'}>Add Answer</div>
                    </div>

                    <div className={'btn-save'}>Save</div>
                </div>
            </div>
        )
    }
}

export default AddQuestionsView;
