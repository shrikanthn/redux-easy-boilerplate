//charts.js
const initialState = {
    // barChart: [ { label: 100, value: 90 }, ],
    barChart: [ { label: 100, value: 90 }, ],
    pieChart: [],
};

export function charts(state = initialState, action) {
    switch (action.type) {
        case 'ADD_BAR_CHART_DATA':
            return {
                barChart: action.data,
            };

        default:
            return state;
    }
}
