const API_URL = 'http://localhost:9999/api';
const AVG_URL = API_URL + '/getTeamAverages';
const COUNT_URL = API_URL + '/getAllSurveyCount';

export function submitSurveyAnswer(surveyAnswers) {
    return {
        type: 'SUBMIT_SURVEY_ANSWER',
        answers : surveyAnswers,
    };
}
export function dumpCSV(payload) {
    return {
        type: 'DUMP_CSV',
        csvDump : payload,
    };
}

export function requestItems() {
    console.log('start fetching on : ' + Date.now());
    return {
        type: 'REQUEST_ITEMS',
    };
}

export function receiveAverages(survey, jsonData) {
    console.log('end fetch on : ' + Date.now());
    return {
        type: 'RECEIVE_AVG',
        survey,
        averages: jsonData,
        receivedAt: Date.now(),
    };
}

export function fetchAverages(survey) {

    return function(dispatch) {

        dispatch(requestItems());

        return fetch(AVG_URL)
            .then(response => response.json())
            .then(data =>
                dispatch(receiveAverages(survey, data))
            );
    };
}

export function receiveAnswerCount(survey, jsonData) {
    console.log('end fetch on : ' + Date.now());
    return {
        type: 'RECEIVE_ANSWER_COUNT',
        survey,
        answer_count: jsonData,
        receivedAt: Date.now(),
    };
}

export function fetchAnswerCount(survey) {

    return function(dispatch) {

        dispatch(requestItems());

        return fetch(COUNT_URL)
            .then(response => response.json())
            .then(data =>
                dispatch(receiveAnswerCount(survey, data))
            );
    };
}

export function setCurrentSprint(sprint_date) {
    return {
        type: 'SET_CURRENT_SPRINT',
        currentSprint : sprint_date,
    };
}