

//api calls
import {film} from '../utils/api'
///////////////////REDUCER ACTIONS TYPES
export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_SERIES = 'ADD_SERIES'; 
export const ADD_SINGLE_MOVIE ='ADD_SINGLE_MOVIE'
export const addMovies = (movies, moviesCategory, movieNumOfPages, currentMoviePage) =>{
   return {
        type: ADD_MOVIES,
        movies: movies,
        moviesCategory: moviesCategory,
        movieNumOfPages: movieNumOfPages,
        currentMoviePage: currentMoviePage
    }
}
const addSingleMovie = mov =>{
    return {
        type:ADD_SINGLE_MOVIE,
        data:mov
    }
}

export const getSingleMovie = id =>{
    return dispatch =>{
        film(id)
        .then(mov=>dispatch(addSingleMovie))
    }
}