export const questionMap = {
    q1: 'How fun was this sprint',
    q2: 'How satisfied are you with your performance this sprint',
    q3: 'How satisfied are you with the planning for this sprint',
    q4: 'How well were you able to focus during this sprint',
};

const initialState = {
    answers: [{
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 0,
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
                        q1: action.answers.q1,
                        q2: action.answers.q2,
                        q3: action.answers.q3,
                        q4: action.answers.q4,
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

        default:
            return state;
    }
}
