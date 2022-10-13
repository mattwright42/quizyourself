import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FetchButton(props) {
    //access settings that are used to construct the API query
    const questionCategory = useSelector(state => state.options.question_category)
    const questionDifficulty = useSelector(state => state.options.question_difficulty)
    const questionType = useSelector(state => state.options.question_type)
    const questionAmount = useSelector(state => state.options.number_of_questions)
    const questionIndex = useSelector(state => state.options.index)

    const dispatch = useDispatch()

    const setLoading = value => {
        dispatch({
            type: 'CHANGE_LOADING',
            value: value
        })
    }
    const setQuestions = value => {
        dispatch({
            type: 'SET_QUESTIONS',
            value: value
        })
    }

    const handleQuery = async () => {
        console.log('amount', questionAmount)
        console.log('category',questionCategory)
        console.log('difficulty',questionDifficulty)
        console.log('Type',questionType)
        console.log('index',questionIndex)
        //always specify the number of questions to be returned
        let apiUrl = `https://opentdb.com/api.php?amount=${questionAmount}`

        //only add the rest of the parameters if they aren't 'ALL'
        if (questionCategory.length) {
            apiUrl = apiUrl.concat(`&category=${questionCategory}`)
        }
        if (questionDifficulty.length) {
            apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`)
        }
        if (questionType.length) {
            apiUrl = apiUrl.concat(`&type=${questionType}`)
        }
        setLoading(true)

        await fetch(apiUrl)
            .then((res) => res.json())
            .then((response) => {
                //set questions in the state using an action
                setQuestions(response.results)
                setLoading(false)
            });

        if(questionIndex > 0) {
            dispatch({
                type: 'SET_INDEX',
                value: 0
            })
            dispatch({
                type: 'SET_SCORE',
                value: 0
            })
        }
        console.log('button clicked!')
    }
    return <button onClick={handleQuery}>{props.text}</button>
}

export default FetchButton