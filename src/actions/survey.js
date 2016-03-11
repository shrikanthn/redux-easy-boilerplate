const API_URL = 'http://localhost:9999/api';
const AVG_URL = API_URL + '/getTeamAverages';
const COUNT_URL = API_URL + '/getAllSurveyCount';
const ANSWER_URL = API_URL + '/getSurveyResultsByDate';
const POST_CSV_URL = API_URL + '/postCSV';

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
            .then(function(data) {
                dispatch(receiveAnswerCount(survey, data));
                dispatch(setCurrentSprint(data[0]['survey_date']));
            })
    };
}

export function receiveAnswers(sprintDate, jsonData) {
    console.log('end fetch on : ' + Date.now());
    return {
        type: 'RECEIVE_ANSWERS_FOR_SPRINT',
        sprintDate,
        answers: jsonData,
        receivedAt: Date.now(),
    };
}

export function fetchAnswerForSurvey(sprintDate) {

    return function(dispatch) {

        dispatch(requestItems());

        return fetch(ANSWER_URL+"?sprint_date="+sprintDate)
            .then(response => response.json())
            .then(data =>
                dispatch(receiveAnswers(sprintDate, data))
            );
    };
}

export function setCurrentSprint(sprint_date) {

    return function(dispatch) {

        dispatch(setSprintDate(sprint_date));
        dispatch(fetchAnswerForSurvey(sprint_date));
    };
}

function setSprintDate(sprint_date) {
    return {
        type: 'SET_CURRENT_SPRINT',
        currentSprint : sprint_date,
    };
}

export function receivePostCSVResponse(jsonData) {
    console.log('end fetch on : ' + Date.now());
    console.log(jsonData);
    return {
        type: 'POST_ANSWERS',
        receivedAt: Date.now(),
    };
}

export function postCSV(csvPayload) {

    return function(dispatch) {

        dispatch(requestItems());

        return  fetch(POST_CSV_URL, {
                method: 'post',
                headers: {
                  'Accept': 'application/json, application/xml, text/play, text/html, *.*',
                  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                },
                body: 'text' + '=' + csvPayload,
            })
            .then(response => response.json())
            .then(data =>
                dispatch(receivePostCSVResponse({}, data))
            );
    };
}