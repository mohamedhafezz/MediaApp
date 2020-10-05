import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import styles from './movies.module.css'
import Tile from './Tile'
// constants
import {categoryTypes} from '../utils/constants'
//actions
import {addMovies} from '../actions/rootActions'
class Movies extends Component {
    state={
        search: null,
    }
    
    componentDidMount=()=>{
        
    }
    componentDidUpdate=()=>{
       
    }
    handleClick = (e) => {
        // let page = 1
        // if(e.target.value === 'next' && (this.props.currentMoviePage !== this.props.movieNumOfPages)){
        //     page = this.props.currentMoviePage + 1;
        // }else if(e.target.value === 'previous' && (this.props.currentMoviePage !== 1)){
        //     page = this.props.currentMoviePage - 1;
        // }else if(e.target.value === 'first'){
        //     page = 1;
        // }else if(e.target.value === 'last'){
        //     page = this.props.movieNumOfPages;
            
        // }
        // axios.post('http://localhost:5000',{type:'movies',page:page})
        // .then(res=>{
        //   this.props.addMovies(res.data, 'popular', 419, page) ;
        // })
        

        let page = 1
        let url = null;
        
        if(e.target.value === 'next' && (this.props.currentMoviePage !== this.props.movieNumOfPages)){
            page = this.props.currentMoviePage + 1;
        }else if(e.target.value === 'previous' && (this.props.currentMoviePage !== 1)){
            page = this.props.currentMoviePage - 1;
        }else if(e.target.value === 'first'){
            page = 1;
        }else if(e.target.value === 'last'){
            page = this.props.movieNumOfPages;
            
        }
        
        if(this.props.moviesCategory === 'search'){
            url = 'https://api.themoviedb.org/3/search/movie?api_key=097d34079b54c8168395f4f85943271b&language=en-US&query='+this.state.search+'&page='+page;
        }else{
            url = 'https://api.themoviedb.org/3/movie/'+this.props.moviesCategory+'?api_key=097d34079b54c8168395f4f85943271b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page='+page;
        }
      
        axios.get(url)
        .then( (res) => {

            this.props.addMovies(res.data.results, this.props.moviesCategory, this.props.movieNumOfPages,res.data.page);

        })    
       
    }
    handleCategoryClick = (e) =>{
        let category = e.target.value;
        let url = 'https://api.themoviedb.org/3/movie/'+category+'?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1';
        axios.get(url)
        .then( (res) => {
            this.props.addMovies(res.data.results, category, res.data.total_pages, res.data.page);
        })
    }

    handleSearchChange = (e) =>{
        this.setState({
            ...this.state,
            search:e.target.value})
    }

    handleSearchSubmit = (e) =>{
        let searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=097d34079b54c8168395f4f85943271b&language=en-US&query='+this.state.search+'&page=1'
        axios.get(searchUrl)
        .then((res) => {
                this.props.addMovies(res.data.results,"search",res.data.total_pages,1);
            }
        )
        e.preventDefault();
    }

    categoryButtons = () =>{
        return(
            <div className={styles.categoryBtns}>
                <button onClick={this.handleCategoryClick} value="top_rated">Top Rated</button>
                <button onClick={this.handleCategoryClick} value="popular">Popular</button> 
                <button onClick={this.handleCategoryClick} value="now_playing">Now Playing</button>
                <button onClick={this.handleCategoryClick} value="upcoming">Up Coming</button>
                <form onSubmit={this.handleSearchSubmit}>
                    <input autoComplete="off" placeholder="Search for a movie" required={true} className="white-text" type="text" onChange={this.handleSearchChange} name="searchRequest"/>
                    <button type="submit" >Search</button>
                </form>

            </div>
    

        )
    } 

    pagesButtons = () => {
            return(
                <div className={styles.pageBtns}
                >
                    <button onClick={this.handleClick} value="first">First</button>
                    <button onClick={this.handleClick} value="previous">Previous</button>
                    <button className={styles.currentPage} onClick={this.handleClick} value="currentPage">{this.props.currentMoviePage}</button>
                    <button onClick={this.handleClick} value="next">Next</button>
                    <button onClick={this.handleClick} value="last">Last</button>
                </div>
              
            )
    
     }
     categoryTitle = ()=>{
        return <h1 className={styles.title}>{categoryTypes[this.props.moviesCategory]?.title}</h1>  
     }
    render(){
        const categoryTitleText = this.categoryTitle();
        const moviesList = this.props.movies?.length > 0 ? (
                    this.props.movies.map( movie => {
                        let logoPath = 'http://image.tmdb.org/t/p/w185'+ movie.poster_path;
                        return( 
                          <Tile key={movie.id}
                          logo={logoPath}          
                          title={movie.original_title}
                          overview={movie.overview} 
                          release={movie.release_date}
                          id={movie.id} 
                          type="movie"
                          />
                        
                        )
                    }
                   )
        ) : (
                <div className="preloader-wrapper big active">
                    <div className="spinner-layer spinner-blue-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
        )


        return(
            <div className={styles.movies}> 
                    {categoryTitleText}
                <div className={styles.moviesPanel}>
                    {moviesList}
                </div>
                    {this.pagesButtons()}
            </div> 
        )
    }
 
}

const mapStateToProps = (state) => {
        return {
            movies: state.movies,
            moviesCategory: state.moviesCategory,
            movieNumOfPages: state.movieNumOfPages,
            currentMoviePage: state.currentMoviePage
        }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMovies: (movies, moviesCategory, movieNumOfPages, currentMoviePage) => {
            dispatch(addMovies(movies, moviesCategory, movieNumOfPages, currentMoviePage))
        },
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Movies)