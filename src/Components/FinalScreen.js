import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FetchButton from './FetchButton';

function FinalScreen() {
    const score = useSelector((state) => state.score)
    
    const dispatch = useDispatch()

    const replay = () => {
        dispatch({
            type: 'SET_INDEX',
            value: 0
        })

        dispatch({
            type: 'SET_SCORE',
            value: 0
        })
    }

    const settings = () => {
        dispatch({
            type: 'SET_QUESTIONS',
            value: []
        })

        dispatch({
            type: 'SET_SCORE',
            value: 0
        })
        dispatch({
            type: 'SET_INDEX',
            value: 0
        })
    }

    return (
        <div>
            <h3>FINAL SCORE: {score}</h3>
            <div className="final-buttons">
                <button onClick={replay}>Try again!</button>
                <br />
                <FetchButton text="Fetch new questions" />
                <br/>
                <button onClick={settings}>Back to Quiz settings</button>
            </div>
            
        </div>
    )
}


export default FinalScreen