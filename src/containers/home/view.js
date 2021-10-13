import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from "../../redux/reducers/global/global";

function HomeView() {

    const count = useSelector(state => state.global.value)
    const dispatch = useDispatch();

    return (
        <div className={'test'}>
            {count}
            <button onClick={() => dispatch(increment())}>increment</button>
            <button onClick={() => dispatch(decrement())}>decrement</button>
            <div>Home text here</div>
        </div>
    );
}

export default HomeView;


// questions
// articles
// templates
// campaign
