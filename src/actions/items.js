import fetch from 'isomorphic-fetch';
import FormData from 'isomorphic-form-data';

const BACKEND_URL = 'http://localhost/reactjs/react.php';

export function addItem(fields) {
    return {
        type: 'ADD_ITEM',
        fields,
    };
}

export function delItem(index) {
    return {
        type: 'DELETE_ITEM',
        index,
    };
}

export function requestItems() {
    console.log('start fetching on : ' + Date.now());
    return {
        type: 'REQUEST_ITEMS',
    };
}

// action creator when the server responds with data,
// here we udpate the store with the received data
export function receivePosts(items, txtValue) {
    console.log('end fetch on : ' + Date.now());
    return {
        type: 'RECEIVE_ITEM',
        items,
        text: txtValue,
        receivedAt: Date.now(),
    };
}

export function fetchItems(items) {

    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function(dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestItems());

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return fetch(`http://localhost/reactjs/react.php`)
            .then(response => response.text())
            .then(data =>
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                dispatch(receivePosts(items, data))
            );

        // In a real world app, you also want to
        // catch any error in the network call.
    };
}

export function addNewItemToServer(items) {

    console.log('posting : ' + items);

    return function(dispatch) {

        // since the requestItems action creator is  a dummy action creator
        // just to inform redux that the state
        dispatch(requestItems());

        // var form = new FormData();
        // form.append();
        // form.append('time', 'pass');

        return fetch('http://localhost:3000/api', {
                method: 'post',
                headers: {
		          'Accept': 'application/json, application/xml, text/play, text/html, *.*',
		          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
		        },
                body: 'text'+"="+items,
            })
            .then(response => response.text())
            .then(data =>
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                dispatch(receivePosts(items, data))
            );

        // In a real world app, you also want to
        // catch any error in the network call.
    };
}
