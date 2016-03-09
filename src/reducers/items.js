const initialState = {
    items: [{
        text: 'React',
        done: true,
    }, {
        text: 'Redux',
        done: true,
    }, {
        text: 'React router',
        done: true,
    }, {
        text: 'Bootstrap webpack',
        done: true,
    }, {
        text: 'Sass modules (sass-loader css-loader style-loader)',
        done: true,
    }, {
        text: 'React transform',
        done: true,
    }, {
        text: 'Redux logger',
        done: true,
    }, {
        text: 'React document meta',
        done: true,
    }, {
        text: 'Redux form',
        done: true,
    }, {
        text: 'Karma',
        done: true,
    }, {
        text: 'Mocha',
        done: true,
    }, {
        text: 'Server-side rendering',
        done: false,
    }],
};

export function items(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [
                    ...state.items, {
                        text: action.fields.name.value,
                    },
                ],
            };
        case 'RECEIVE_ITEM':
            console.log(action);
            return {
                ...state,
                items: [
                    ...state.items, {
                        text: action.text,
                    },
                ],
            };

        case 'DELETE_ITEM':
            return {
                ...state,
                items: [
                    ...state.items.slice(0, action.index),
                    ...state.items.slice(+action.index + 1),
                ],
            };

        case 'CREATE_TODO':
            return {
                ...state,
                items: [
                    ...state.items, {
                        text: action.res.data.text,
                    },
                ],
            };

        case 'REQUEST_ITEMS':
            return {
                ...state,
            };

        default:
            return state;
    }
}
