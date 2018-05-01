export const QUOTES_AVAILABLE = 'QUOTES_AVAILABLE';
export const ADD_QUOTE = 'ADD_QUOTE';
export const ADD_COIN = 'ADD_COIN';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const DELETE_QUOTE = 'DELETE_QUOTE';
export const DATA_AVAILABLE = 'DATA_AVAILABLE'
export const GET_PORTFOLIO = 'GET_PORTFOLIO';
export const FETCHING_DATA = 'FETCHING_DATA';
export const SEARCH_TERM = 'SEARCH_TERM';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export const CHANGE_PERIOD = 'CHANGE_PERIOD';
export const CHARTDATA_AVAILABLE = 'CHARTDATA_AVAILABLE';
export const FETCHING_CHARTDATA = 'FETCHING_CHARTDATA';
export const CHANGE_CHARTPERIOD = 'CHANGE_CHARTPERIOD';


import {AsyncStorage} from "react-native";
export function searchTerm(e){
    console.log(e);
    return (dispatch) => {
        dispatch({type: SEARCH_TERM, searchterm: e});
    };
}
export function clearSearch(){
    return (dispatch) => {
        dispatch({type: CLEAR_SEARCH});
    };
}
export function changePeriod(idx){
    return (dispatch) => {
        dispatch({type: CHANGE_PERIOD, period: idx});
    };
}
export function changeChartPeriod(time){
    return (dispatch) => {
        dispatch({type: CHANGE_CHARTPERIOD, chartPeriod: time});
    };
}

export function getData(){
    return (dispatch) => {
        dispatch({type: FETCHING_DATA});
        fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=0`)
        .then(res => res.json())
        .then(json => {
            dispatch({type: DATA_AVAILABLE, data: json});
            console.log("FETCHED THE DATA");
        })
        .catch(error => {
            //dispatch error
        })

    };
}
export function getChartData(symbol, timeParams){
    return (dispatch) => {
        dispatch({type: FETCHING_CHARTDATA, isFetching: true});
        fetch(`https://min-api.cryptocompare.com/data/histo${timeParams.period}?fsym=${symbol}&tsym=USD&limit=${timeParams.limit}`)
        .then(res => res.json())
        .then(json => {
            dispatch({type: CHARTDATA_AVAILABLE, chartData: json, isFetching: false});
            console.log("THIS WAS CALLED");
        })
        .catch(error => {
            //dispatch error
        })

    };
}
export function addCoin(id){
    return (dispatch) => {
                dispatch({type: ADD_COIN, id:id, added: true});
    };
}
export function getPortfolio(){
    //console.log(id);
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, crypto) => {
            console.log(crypto);
            if (crypto !== null){
                dispatch({type: GET_PORTFOLIO, crypto:crypto});
            }
          });
    };
}
// Add Quote - CREATE (C)
export function addQuote(quote){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);
                quotes.unshift(quote); //add the new quote to the top
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: ADD_QUOTE, quote:quote});
                });
            }
        });
    };
}

// Get Data - READ (R)
export function getQuotes(){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                dispatch({type: QUOTES_AVAILABLE, quotes:JSON.parse(quotes)});
            }
        });
    };
}

// Update Quote - UPDATE (U)
export function updateQuote(quote){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);
                var index = getIndex(quotes, quote.id); //find the index of the quote with the id passed
                if (index !== -1) {
                    quotes[index]['author'] = quote.author;
                    quotes[index]['quote'] = quote.quote;
                }
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: UPDATE_QUOTE, quote:quote});
                });
            }
        });
    };
}

// Delete Quote - DELETE (D)
export function deleteQuote(id){
    return (dispatch) => {
        AsyncStorage.getItem('data', (err, quotes) => {
            if (quotes !== null){
                quotes = JSON.parse(quotes);

                var index = getIndex(quotes, id); //find the index of the quote with the id passed
                if(index !== -1) quotes.splice(index, 1);//if yes, undo, remove the QUOTE
                AsyncStorage.setItem('data', JSON.stringify(quotes), () => {
                    dispatch({type: DELETE_QUOTE, id:id});
                });
            }
        });
    };
}
