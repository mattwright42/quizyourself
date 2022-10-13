import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function FetchButton(props) {
    //access settings that are used to construct the API query
    const questionCategory = useSelector(state => state.options.question_category)
    const questionDifficulty = useSelector(state => state.options.question_difficulty)
    const questionType = useSelector(state => state.options.question_type)
    const questionAmount = useSelector(state => state.options.amount_of_questions)
    const questionIndex = useSelector(state => state.options.index)

    const dispatch = useDispatch()

    const setLoading = value => {
        dispatch({
            type: 'CHANGE_LOADING',
            loading: value
        })
    }
    const setQuestions = value => {
        dispatch({
            type: 'SET_QUESITONS',
            questions: value
        })
    }

    const handleQuery = async () => {
        //always specify the number of questions to be returned
        let apiUrl = `https://opentdb.com/api.php?amount=${questionAmount}`;

        //only add the rest of the parameters if they aren't 'ALL'
        if (questionCategory.length) {
            apiUrl = apiUrl.concat(`&category=${questionCategory}`)
        }
        if (questionDifficulty.length) {
            apiUrl = apiUrl.concat(`&difficulty=${questionDifficulty}`)
        }
        if (questionType.length) {
            apiUrl = apiUrl.concat(`&typ=${questionType}`)
        }
        setLoading(true)
        await fetch(apiUrl)
            .then((res) => res.json())
            .then((response) => {
                //set questions in the state using an action
                setQuestions(response.results)
                setLoading(false)
            });
    }
    //we will reuse this component pass button text as props
}

export default FetchButton