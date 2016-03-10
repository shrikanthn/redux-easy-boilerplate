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
