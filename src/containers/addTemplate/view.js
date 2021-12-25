import React, {useCallback, useEffect, useState} from 'react';

function AddTemplateView() {

    // crate local state
    const [test, setTest] = useState(0);

    // componentDidMount alternative
    useEffect(() => {
        // run function & dispatch here
    }, []);

    // wrap your call function in useCallback for optimisation
    const exampleFunctions = useCallback(() => {

    }, []);

    return (
      <div className={['questions-container content-container']}>
            <div className={'content-inner'}>
                <div className={'column-header'}>
                    Create Email Template
                </div>
                <div 
                    className={['btn-add-answer button']}
                    onClick={() => {}}
                >
                    <div className={'icon-add'}>
                        <span>+</span>
                    </div>
                    <div className={'add-text'}>Add Answer</div>
                </div>
                <div 
                    className={'btn-save btn'}
                    onClick={() => {}}
                >
                    Save
                </div>
            </div>
        </div>
    )
}

export default AddTemplateView;
