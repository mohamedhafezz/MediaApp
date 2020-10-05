import axios from 'axios'

export const getData = (type,cat,page=1)=> axios.get(`https://api.themoviedb.org/3/${type}/${cat}?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=${page}`);

export const film = id =>{
    return new Promise(res=>res(`Movie of id ==>${id}`))
}

