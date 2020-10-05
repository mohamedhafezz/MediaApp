
import {ADD_MOVIES,ADD_SERIES,ADD_SINGLE_MOVIE} from '../actions/rootActions'
const initState = {
    movies: [],
    moviesCategory: "popular",
    movieNumOfPages: 0,
    currentMoviePage: 1,
    series: [],
    seriesCategory: "popular",
    seriesNumOfPages: 0,
    seriesCurrentPage: 1,
    singleMovie:null
}
  
const rootReducer = (state = initState , action) => {
    if(action.type === ADD_MOVIES){
        return {
            ...state,
            movies: action.movies,
            moviesCategory: action.moviesCategory,
            movieNumOfPages: action.movieNumOfPages,
            currentMoviePage : action.currentMoviePage
        }
    }
    if(action.type === ADD_SERIES){
        return {
            ...state,
            series: action.series,
            seriesCategory: action.seriesCategory,
            seriesNumOfPages: action.seriesNumOfPages,
            seriesCurrentPage : action.seriesCurrentPage
        }
    }
    if(action.type === ADD_SINGLE_MOVIE){
        return {
            ...state,
            singleMovie:action.data
        }
    }

    return state
}

export default rootReducer