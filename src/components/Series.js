import React, { Component } from 'react'
import axios from 'axios'
import Tile from './Tile'
import {connect} from 'react-redux'
import styles from './series.module.css'
import {categoryTypes} from '../utils/constants'

class Series extends Component {
    state={
        search: null,
    }
        componentDidMount(){
    
    }
    componentDidUpdate(){
    }
    categoryTitle = ()=>{
        return <h1 className={styles.title}>{categoryTypes[this.props.seriesCategory]?.title}</h1>  
     }
    handleClick = (e) => {
        // let page = 1
        
        // if(e.target.value === 'next' && (this.props.seriesCurrentPage !== this.props.seriesNumOfPages)){
        //     page = this.props.seriesCurrentPage + 1;
        // }else if(e.target.value === 'previous' && (this.props.seriesCurrentPage !== 1)){
        //     page = this.props.seriesCurrentPage - 1;
        // }else if(e.target.value === 'first'){
        //     page = 1;
        // }else if(e.target.value === 'last'){
        //     page = this.props.seriesNumOfPages;
        // }
        
        // axios.post('http://localhost:5000',{type:'series',page:page})
        // .then(res=>{
        //   this.props.addSeries(res.data, 'popular', 500, page) ;
        // })
        let page = 1
        let url = null;
        if(e.target.value === 'next' && (this.props.seriesCurrentPage !== this.props.seriesNumOfPages)){
            page = this.props.seriesCurrentPage + 1;
        }else if(e.target.value === 'previous' && (this.props.seriesCurrentPage !== 1)){
            page = this.props.seriesCurrentPage - 1;
        }else if(e.target.value === 'first'){
            page = 1;
        }else if(e.target.value === 'last'){
            page = this.props.seriesNumOfPages;
        }
        
        if(this.props.seriesCategory === 'search'){
            url = 'https://api.themoviedb.org/3/search/tv?api_key=097d34079b54c8168395f4f85943271b&language=en-US&query='+this.state.search+'&page='+page;
        }else{
            url = 'https://api.themoviedb.org/3/tv/'+this.props.seriesCategory+'?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page='+page;
        }
      
        axios.get(url)
        .then( (res) => {
              this.props.addSeries(res.data.results, this.props.seriesCategory, this.props.seriesNumOfPages, res.data.page)
        })
       
    }
    handleCategoryClick = (e) =>{
        let category = e.target.value;
        let url = 'https://api.themoviedb.org/3/tv/'+category+'?api_key=097d34079b54c8168395f4f85943271b&language=en-US';
        axios.get(url)
        .then( (res) => {
            this.props.addSeries(res.data.results, category, res.data.total_pages, res.data.page)
        })
    }

    handleSearchChange = (e) =>{
        this.setState({
            ...this.state,
            search:e.target.value})
    }

    handleSearchSubmit = (e) =>{
        let searchUrl = 'https://api.themoviedb.org/3/search/tv?api_key=097d34079b54c8168395f4f85943271b&language=en-US&query='+this.state.search+'&page=1'
        axios.get(searchUrl)
        .then((res) => {
            this.props.addSeries(res.data.results, 'search',res.data.total_pages, 1)
            }
        )
        e.preventDefault();
    }

    categoryButtons = () =>{
        return(
            <div className={styles.categoryBtns}>
                <button onClick={this.handleCategoryClick} value="top_rated">Top Rated</button>
                <button onClick={this.handleCategoryClick} value="popular">Popular</button> 
                <button onClick={this.handleCategoryClick} value="on_the_air">On Air</button>
                <button onClick={this.handleCategoryClick} value="airing_today">Airing Today</button>
                <form onSubmit={this.handleSearchSubmit}>
                    <input autoComplete="off" placeholder="Search for a series" required={true} className="white-text" type="text" onChange={this.handleSearchChange} name="searchRequest"/>
                    <button type="submit">Search</button>
                </form>

            </div>
    

        )
    } 

    pagesButtons = () => {
            return(
                <div className={styles.pageBtns}>
                <button onClick={this.handleClick} value="first">First</button>
                <button onClick={this.handleClick} value="previous">Previous</button>
                <button className={styles.currentPage} onClick={this.handleClick} value="seriesCurrentPage">{this.props.seriesCurrentPage}</button>
                <button onClick={this.handleClick} value="next">Next</button>
                <button onClick={this.handleClick} value="last">Last</button>
            </div>
              
            )
    
     }
    

    render(){
        const categoryTitleText = this.categoryTitle();
        const seriesList = this.props.series ? (
            this.props.series.map( series => {
                let logoPath = 'http://image.tmdb.org/t/p/w185'+ series.poster_path;
                return( 
                  <Tile key={series.id}
                  logo={logoPath}
                  title={series.original_name}
                  overview={series.overview} 
                  release={series.release_date}
                  id={series.id} 
                  type="tv"
                  />
                )
            }
           )
        ):(
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
            <div className={styles.series}>
                {categoryTitleText}
            <div className={styles.seriesPanel}>
                {seriesList}
            </div>
                {this.pagesButtons()}
            </div>
        )
    }
 
}

const mapStateToProps = (state) => {
    return {
        series: state.series,
        seriesCategory: state.seriesCategory,
        seriesNumOfPages: state.seriesNumOfPages,
        seriesCurrentPage: state.seriesCurrentPage
    }
}

const mapDispatchToProps = (dispatch) => {
return {
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



export default connect(mapStateToProps, mapDispatchToProps)(Series)