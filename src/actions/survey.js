const AVG_URL = 'http://localhost:9999/api/getTeamAverages';

export function submitSurveyAnswer(surveyAnswers) {
    return {
        type: 'SUBMIT_SUREVY_ANSWER',
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
        answers: jsonData,
        receivedAt: Date.now(),
    };
}

export function fetchAverages(survey) {

    return function(dispatch) {

        dispatch(requestItems());

        return fetch(AVG_URL)
            .then(response => response.json())
            .then(data =>
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                dispatch(receiveAverages(survey, data))
            );
    };
}