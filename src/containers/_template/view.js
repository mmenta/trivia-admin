import React, {useCallback, useEffect, useState} from 'react';

function TemplateView() {

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
      <div>Template text here</div>);
}

export default TemplateView;
