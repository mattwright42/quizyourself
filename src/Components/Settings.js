import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import FetchButton from './FetchButton';

import 'bootstrap/dist/css/bootstrap.css';

function Settings() {
    //loading state
    const loading = useSelector((state) => state.options.loading)

    //useState hook for options
    const [options, setOptions] = useState(null);

    //useState hook for category
    const questionCategory = useSelector((state) => state.options.question_category)

    //useState hook for difficulty
    const questionDifficulty = useSelector((state) => state.options.question_difficulty)

    //useState hook for question type
    const questionType = useSelector((state) => state.options.question_type)

    //useState hook for number of questions
    const numberOfQuestions = useSelector((state) => state.options.number_of_questions)
    console.log(typeof numberOfQuestions )

    const dispatch = useDispatch()
    //useEffect hook
    useEffect(() => {
        const apiUrl = `https://opentdb.com/api_category.php`;
        const handleLoadingChange = (value) => {
            dispatch({
                type: 'CHANGE_LOADING',
                loading: value
            })
        }

        handleLoadingChange(true);

        fetch(apiUrl)
            .then((res) => res.json())
            .then((response) => {
                handleLoadingChange(false);
                setOptions(response.trivia_categories);
            })
    }, [setOptions, dispatch]);

    //event that is called when an category is chosen
    const handleCategoryChange = (event) => {
        dispatch({
            type: 'CHANGE_CATEGORY',
            value: event.target.value
        })
    }
    const handleDifficultyChange = event => {
        dispatch({
            type: 'CHANGE_DIFFICULTY',
            value: event.target.value
        })
    }
    const handleTypeChange = event => {
        dispatch({
            type: 'CHANGE_TYPE',
            value: event.target.value
        })
    }
    const handleNumberChange = event => {
        dispatch({
            type: 'CHANGE_AMOUNT',
            value: event.target.value
        })
    }


    if (!loading) {
        //add select elements for categories
        return (
            <div>
                <h1>Quiz Yourself!</h1>
                
                
                <br></br>
                <div>
                    <h2>Select Category:</h2>
                    <div>
                    <select value={questionCategory} onChange={handleCategoryChange} >
                        <option>All</option>
                        {
                            options && options.length && options.map((option) => (
                                <option value={option.id} key={option.id}>
                                    {option.name}
                                </option>
                            ))
                        }
                    </select>
                    </div>
                    
                </div>
                <br></br>
                <br></br>
                <div>
                    <h2>Select Difficulty:</h2>
                    <select value={questionDifficulty} onChange={handleDifficultyChange}>
                        <option value="" key="difficulty-0">All</option>
                        <option value="easy" key="difficulty-1">Easy</option>
                        <option value="medium" key="difficulty-2">Medium</option>
                        <option value="hard" key="difficulty-3">Hard</option>
                    </select>
                </div>
                <br></br>
                <br></br>
                <div>
                    <h2>Select Question Type:</h2>
                    <select value={questionType} onChange={handleTypeChange}>
                        <option value="" key="type-0">All</option>
                        <option value="multiple" key="type-1">Multiple Choice</option>
                        <option value="boolean" key="type-2">True/False</option>
                    </select>
                </div>
                <br></br>
                <br></br>
                <div>
                    <h2>Number of Questions:</h2>
                    <input value={numberOfQuestions} onChange={handleNumberChange} />
                </div>
                <br></br>
                <br></br>
                <div>
                    <FetchButton text="Quiz yourself!" />
                </div>
            </div>
        )
    } else {
        <p>LOADING...</p>
    }
}

export default Settings;