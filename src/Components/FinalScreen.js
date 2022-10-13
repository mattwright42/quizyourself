import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FetchButton from './FetchButton';

function FinalScreen() {
    const score = useSelector((state) => state.score)
    
    const dispatch = useDispatch()

    const replay = () => {
        dispatch({
            type: 'SET_INDEX',
            index: 0
        })

        dispatch({
            type: 'SET_SCORE',
            score: 0
        })
    }

    const settings = () => {
        dispatch({
            type: 'SET_QUESITONS',
            questions: []
        })

        dispatch({
            type: 'SET_SCORE',
            score: 0
        })
    }

    return (
        <div>
            <h3>FINAL SCORE: {score}</h3>
            <button onClick={replay}>Try again!</button>
            <FetchButton text="Fetch new questions" />
            <button onClick={settings}>Back to Quiz settings</button>
        </div>
    )
}


export default FinalScreen