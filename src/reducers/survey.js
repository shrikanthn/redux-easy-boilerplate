export const QUESTION_MAP = {
    a1: 'How fun was this sprint',
    a2: 'How satisfied are you with your performance this sprint',
    a3: 'How satisfied are you with the planning for this sprint',
    a4: 'How well were you able to focus during this sprint',
};

const initialState = {
    answers: [{
        a1: 0,
        a2: 0,
        a3: 0,
        a4: 0,
        ts: 0,
    }, ],
    csvDump: 'test',
};

export function survey(state = initialState, action) {
    switch (action.type) {
        case 'SUBMIT_SUREVY_ANSWER':
            return {
                ...state,
                answers: [
                    ...state.answers, {
                        a1: action.answers.a1,
                        a2: action.answers.a2,
                        a3: action.answers.a3,
                        a4: action.answers.a4,
                        ts: action.answers.ts,
                    },
                ],
            };

        case 'DUMP_CSV':
            return {
                ...state,
                csvDump: action.csvDump,
            };

        case 'POST_ANSWERS':
            return {
                ...state,
            };

        case 'RECEIVE_AVG':
            return {
                ...state,
                answers: action.answers,
            };

        default:
            return state;
    }
}
