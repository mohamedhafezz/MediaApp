import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import styles from './navbar.module.css'
import cn from 'classnames'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Navbars extends Component{
  state = {
    searchField: "",
    searchType: 'movie'
  }

  componentDidUpdate(){
    
  }

  handleMovieChange = (e)=>{
     let cat = e.target.value;
     
    axios.get('https://api.themoviedb.org/3/movie/'+cat+'?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1')
        .then( (res) => {
          this.props.addMovies(res.data.results, cat, res.data.total_pages, 1) ;
        })
    this.props.history.push("/movies");
    // axios.post('http://localhost:5000',{type:'movies',page:1})
    // .then(res=>{
    //   this.props.addMovies(res.data, 'popular', 419, 1) ;
    // })
    //     this.props.history.push("/movies");
  
}
handleSearchChange =(e)=>{
  this.setState({
    ...this.state,
    searchField: e.target.value
  })
}

handleSearchSubmit =(e)=>{
 
  let headingURL =null;
  let searchURL = null;
  if(this.state.searchType === 'movie'){
    headingURL = '/movies'
    searchURL = 'https://api.themoviedb.org/3/search/movie?api_key=097d34079b54c8168395f4f85943271b&language=en-US&query='+this.state.searchField+'&page=1'
        axios.get(searchURL)
        .then((res) => {
                this.props.addMovies(res.data.results,"search",res.data.total_pages,1);
            }
        )
  this.props.history.push(headingURL);
  
  }else if(this.state.searchType ==='tv'){
    headingURL = '/series'
    searchURL = 'https://api.themoviedb.org/3/search/tv?api_key=097d34079b54c8168395f4f85943271b&language=en-US&query='+this.state.searchField+'&page=1'

    axios.get(searchURL)
    .then((res) => {
            this.props.addSeries(res.data.results,"search",res.data.total_pages,1);
        }
    )
    this.props.history.push(headingURL);

  }
  
  
  this.setState({
    ...this.state,
    searchField:""
  })
  e.preventDefault();
}

handleSearchTypeChange = (e)=>{

  this.setState({
    ...this.state,
    searchType: e.target.value
  })
}

handleSeriesChange = (e)=>{
    let cat = e.target.value;
    
    axios.get('https://api.themoviedb.org/3/tv/'+cat+'?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1')
      .then( (res) => {
        this.props.addSeries(res.data.results, cat, res.data.total_pages, 1) ;
      })
     this.props.history.push("/series")
    // axios.post('http://localhost:5000',{type:'series',page:1})
    // .then(res=>{
    //   this.props.addSeries(res.data, 'popular', 500, 1) ;
    // })
    //     this.props.history.push("/series");

}

handleClick = (url)=>{
  this.props.history.push(url);
}
    render(){
        return(
          <div className={styles.navbar}>
          <div className={styles.navbarWrapper}>
            <button onClick={()=>{this.handleClick('/')}} className={cn(styles.brandlogo, styles.navBtn)}>Media App</button>
            <div className={styles.right}>
              <div className={styles.searchForm}>
              <form  onSubmit={this.handleSearchSubmit}>
                <select  onChange={this.handleSearchTypeChange} className={styles.searchSelect}>
                  <option value="movie">Movies</option>
                  <option value="tv">Series</option>
                </select>
                <input className={styles.serachInput} onChange={this.handleSearchChange} type="text" name="searchField" placeholder="Search.." autoComplete="off" required={true} value={this.state.searchField} />

                <button className={styles.searchBtn} type="submit"><FontAwesomeIcon icon={faSearch}/> </button>
              </form>
              </div>

              <button className={styles.navBtn} onClick={()=>{this.handleClick('/')}}>Home</button>

              <div className={styles.dropdown}>
              <button className={styles.navBtn} onClick={this.handleMovieChange} value="popular">Movies</button>
              <div className={styles.dropdownContnet}>
                <button className={styles.navBtn}  onClick={this.handleMovieChange} value="popular">Popular</button>
                <button className={styles.navBtn}  onClick={this.handleMovieChange} value="top_rated">Top rated</button>
                <button className={styles.navBtn}  onClick={this.handleMovieChange} value="now_playing">Now Playing</button>
                <button className={styles.navBtn}  onClick={this.handleMovieChange} value="upcoming">upcoming</button>
              </div>
              </div>

              <div className={styles.dropdown}>
              <button className={styles.navBtn}  onClick={this.handleSeriesChange} value="popular">Series</button>
              <div className={styles.dropdownContnet}>
                <button className={styles.navBtn}  onClick={this.handleSeriesChange} value="top_rated">Top Rated</button>
                <button className={styles.navBtn}  onClick={this.handleSeriesChange} value="popular">Popular</button> 
                <button className={styles.navBtn}  onClick={this.handleSeriesChange} value="on_the_air">On Air</button>
                <button className={styles.navBtn}  onClick={this.handleSeriesChange} value="airing_today">Airing Today</button>
              </div>
              </div>
              
            <button className={styles.navBtn}  onClick={()=>{this.handleClick('/about')}}>About</button>
            </div>
            </div>    
          </div>

        )
    }
}

const mapStateToProps = (state)=>{
  return {
      movies: state.movies,
      moviesCategory: state.moviesCategory,
      numOfPages: state.numOfPages
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    addMovies: (movies, moviesCategory, movieNumOfPages, currentMoviePage) => {
      dispatch({
        type: "ADD_MOVIES",
        movies: movies,
        moviesCategory: moviesCategory,
        movieNumOfPages: movieNumOfPages,
        currentMoviePage: currentMoviePage
      })
    },
    addSeries: (series, seriesCategory, seriesNumOfPages, seriesCurrentPage) => {
      dispatch({
          type: "ADD_SERIES",
          series: series,
          seriesCategory: seriesCategory,
          seriesNumOfPages: seriesNumOfPages,
          seriesCurrentPage: seriesCurrentPage
      })
  },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navbars)