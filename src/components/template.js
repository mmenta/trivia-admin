import React, { useEffect, useState, useCallback } from 'react';

function Template () {
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
        <div>
            Template Component Works
        </div>
    );
}

export default Template;
