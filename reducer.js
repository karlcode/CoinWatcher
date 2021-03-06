import { combineReducers } from 'redux';
import { QUOTES_AVAILABLE, ADD_COIN, ADD_QUOTE, UPDATE_QUOTE, DELETE_QUOTE, DATA_AVAILABLE, CHARTDATA_AVAILABLE, GET_PORTFOLIO, FETCHING_DATA, SEARCH_TERM, CLEAR_SEARCH, CHANGE_PERIOD, CHANGE_CHARTPERIOD,  FETCHING_CHARTDATA } from "./actions" //Import the actions types constant we defined in our actions
import update from 'immutability-helper';
import SearchInput, { createFilter } from 'react-native-search-filter';

let dataState = { data: [], filteredData: [], isFetching: true, chartPeriod: 365, chartData: [], loading:true, crypto: [], added: false, refreshing: false, searchTerm: '', cleared: true, timePeriod: 1, period: 'percent_change_24h', timeCategory: '%24h'};

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:{
            state = Object.assign({}, state, { data: action.data, loading:false, refreshing: false });
            return state;
        }
        case CHARTDATA_AVAILABLE:{
            state = Object.assign({}, state, { chartData: action.chartData, isFetching: false});
            return state;
        }
        case FETCHING_DATA:{
            state = Object.assign({}, state, { refreshing: true });
        return state;
        }
        case FETCHING_CHARTDATA:{
            state = Object.assign({}, state, { isFetching: true });
        return state;
        }
        case SEARCH_TERM: {
            console.log(action.searchterm);
            const filtered = state.data.filter(createFilter(action.searchterm, ['name', 'id', 'symbol']))
            state = Object.assign({}, state, { filteredData: filtered, cleared: false });
        return state;
        }
        case CHANGE_PERIOD: {
            const time_period = ''
            const time_category = ''
            if(action.period == 0){
                    time_period = 'percent_change_1h'
                    time_category = '%1h'
            } 
            else if(action.period == 1) {
                    time_period = 'percent_change_24h'
                    time_category = '%24h'
            }
            else {
                    time_period = 'percent_change_7d'
                    time_category = '%7d'
            }
            console.log(time_period);
            state = Object.assign({}, state, { timePeriod: action.period, period: time_period});
        return state;
        }
        case CHANGE_CHARTPERIOD: {t
            console.log(action.chartPeriod);
            state = Object.assign({}, state, { chartPeriod: action.chartPeriod});
        return state;
        }
        case CLEAR_SEARCH: {
            state = Object.assign({}, state, { cleared: true });
        return state;
        }
        case ADD_COIN:{
            const filtered = state.data.find((item) => item.id == action.id)
            const index = state.crypto.findIndex((item) => item.id == action.id)
            if(index == -1){
                return {
                    ...state,
                    data: state.data.map((item) => item.id == action.id ? 
                    { ...item, added: action.added} :                   //replace with immutability helper later down the track
                    item),
                    crypto: [...state.crypto, filtered] 
                }
            }
            console.log("DUPLICATE COIN ADDED");
            return state
        }
        case GET_PORTFOLIO:{
            state = Object.assign({}, state, { crypto: state.crypto, loading:false });
            return state;
        }
        case ADD_QUOTE:{
            let quotes =  cloneObject(state.quotes) //clone the current state
            quotes.unshift(action.quote); //add the new quote to the top
            state = Object.assign({}, state, { quotes: quotes});
            return state;
        }

        case QUOTES_AVAILABLE:
            state = Object.assign({}, state, { quotes: action.quotes, loading:false });
            return state;

        case UPDATE_QUOTE:{
            let quote = action.quote;
            let quotes =  cloneObject(state.quotes) //clone the current state
            let index = getIndex(quotes, quote.id); //find the index of the quote with the quote id passed
            if (index !== -1) {
                quotes[index]['author'] = quote.author;
                quotes[index]['text'] = quote.text;
            }
            state = Object.assign({}, state, { quotes: quotes});
            return state;
        }

        case DELETE_QUOTE:{
            let quotes =  cloneObject(state.quotes) //clone the current state
            let index = getIndex(quotes, action.id); //find the index of the quote with the id passed
            if(index !== -1) quotes.splice(index, 1);//if yes, undo, remove the QUOTE
            state = Object.assign({}, state, { quotes: quotes});
            return state;
        }

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer;