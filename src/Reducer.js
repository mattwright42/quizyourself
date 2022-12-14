const initState = {
    options: {
        loading: false,
        question_category: ``,
        question_difficulty: ``,
        question_type: ``,
        number_of_questions: 50
    },
    questions: [],
    index: 0,
    score: 0
}

const Reducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_LOADING":
            return {
                ...state,
                options: {
                    ...state.options,
                    loading: action.value
                }
            }
        case "CHANGE_CATEGORY":
            return {
                ...state,
                options: {
                    ...state.options,
                    question_category: action.value
                }
            }
        case "CHANGE_DIFFICULTY":
            return {
                ...state,
                options: {
                    ...state.options,
                    question_difficulty: action.value
                }
            }
        case "CHANGE_TYPE":
            return {
                ...state,
                options: {
                    ...state.options,
                    question_type: action.value
                }
            }
        case "CHANGE_AMOUNT":
            return {
                ...state,
                options: {
                    ...state.options,
                    number_of_questions: parseInt(action.value)
                }
            }
        case "SET_QUESTIONS":
            return {
                ...state,
                questions: action.value
            }
        case "SET_INDEX":
            return {
                ...state,
                index: action.value
            }
        case "SET_SCORE":
            return {
                ...state,
                score: action.value
            }
        default:
            return state
    }
}

export default Reducer