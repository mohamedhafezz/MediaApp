import React, { Component } from 'react'
import axios from 'axios'
import Tile from './Tile'
import styles from './home.module.css'
import cx from 'classnames'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Home extends Component {
    state={
        popularMovies:null,
        popularMoviesPanel:1,
        topRatedMovies:null,
        topRatedMoviesPanel:1,
        upcomingMovies:null,
        upcomingMoviesPanel:1,
        nowPlayingMovies: null,
        nowPlayingMoviesPanel:1,
        popularSeries:null,
        popularSeriesPanel:1,
        topRatedSeries: null,
        topRatedSeriesPanel: 1,
        onAirSeries: null,
        onAirSeriesPanel: 1,
        airingTodaySeries: null,
        airingTodaySeriesPanel: 1

    }
    componentDidMount(){
        let popularMoviesURL = 'https://api.themoviedb.org/3/movie/popular?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1'
        let topRatedMoviesURL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1'
        let upcomingMoviesURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1'
        let nowPlayingMoviesURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1'

        let popularSeriesURL = 'https://api.themoviedb.org/3/tv/popular?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1'
        let topRatedSeriesURL = 'https://api.themoviedb.org/3/tv/top_rated?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1'
        let onAirSeriesURL = 'https://api.themoviedb.org/3/tv/on_the_air?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1'
        let airingTodaySeriesURL = 'https://api.themoviedb.org/3/tv/airing_today?api_key=097d34079b54c8168395f4f85943271b&language=en-US&page=1'

        
        
        const requestOne = axios.get(popularMoviesURL)
        const requestTwo = axios.get(topRatedMoviesURL)
        const requestThree = axios.get(upcomingMoviesURL)
        const requestFour = axios.get(nowPlayingMoviesURL)
        
        const requestFive = axios.get(popularSeriesURL)
        const requestSix = axios.get(topRatedSeriesURL)
        const requestSeven = axios.get(onAirSeriesURL)
        const requestEight = axios.get(airingTodaySeriesURL)

        axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix, requestSeven, requestEight]).then(axios.spread((...responses) => {
            const responseOne = responses[0]
            const responseTwo = responses[1]
            const responseThree = responses[2]
            const responseFour = responses[3]
            const responseFive = responses[4]
            const responseSix = responses[5]
            const responseSeven = responses[6]
            const responseEight = responses[7]
            
            this.setState({
                ...this.state,
                popularMovies: responseOne.data.results,
                topRatedMovies: responseTwo.data.results,
                upcomingMovies: responseThree.data.results,
                nowPlayingMovies: responseFour.data.results,
                popularSeries: responseFive.data.results,
                topRatedSeries: responseSix.data.results,
                onAirSeries: responseSeven.data.results,
                airingTodaySeries: responseEight.data.results,
            })
    }))
}

    componentDidUpdate(){
    }


    handleMovieNavClick = (e, category) =>{
        if(category==='popularMovies'){
            if(e.target.value==="next"){
                if(this.state.popularMoviesPanel<4){
                this.setState({
                    ...this.state,
                    popularMoviesPanel : this.state.popularMoviesPanel +1
                })
                 }else{
                    this.setState({
                        ...this.state,
                        popularMoviesPanel : 1
                    })
                 }
            }else if(e.target.value === "pre"){
                if(this.state.popularMoviesPanel>1){
                    this.setState({
                        ...this.state,
                        popularMoviesPanel : this.state.popularMoviesPanel - 1
                    })
                     }else{
                        this.setState({
                            ...this.state,
                            popularMoviesPanel : 4
                        })
                     }
            }
        }else if(category === 'topRatedMovies'){
            if(e.target.value==="next"){
                if(this.state.topRatedMoviesPanel<4){
                this.setState({
                    ...this.state,
                    topRatedMoviesPanel : this.state.topRatedMoviesPanel +1
                })
                 }else{
                    this.setState({
                        ...this.state,
                        topRatedMoviesPanel : 1
                    })
                 }
            }else if(e.target.value === "pre"){
                if(this.state.topRatedMoviesPanel>1){
                    this.setState({
                        ...this.state,
                        topRatedMoviesPanel :this.state.topRatedMoviesPanel - 1
                    })
                     }else{
                        this.setState({
                            ...this.state,
                            topRatedMoviesPanel : 4
                        })
                     }
            }
        }else if(category === 'upcomingMovies'){
            if(e.target.value==="next"){
                if(this.state.upcomingMoviesPanel<4){
                this.setState({
                    ...this.state,
                    upcomingMoviesPanel : this.state.upcomingMoviesPanel +1
                })
                 }else{
                    this.setState({
                        ...this.state,
                        upcomingMoviesPanel : 1
                    })
                 }
            }else if(e.target.value === "pre"){
                if(this.state.upcomingMoviesPanel>1){
                    this.setState({
                        ...this.state,
                        upcomingMoviesPanel : this.state.upcomingMoviesPanel - 1
                    })
                     }else{
                        this.setState({
                            ...this.state,
                            upcomingMoviesPanel : 4
                        })
                     }
            }
        }else if(category==='nowPlayingMovies'){
  if(e.target.value==="next"){
            if(this.state.nowPlayingMoviesPanel<4){
            this.setState({
                ...this.state,
                nowPlayingMoviesPanel : this.state.nowPlayingMoviesPanel +1
            })
             }else{
                this.setState({
                    ...this.state,
                    nowPlayingMoviesPanel : 1
                })
             }
        }else if(e.target.value === "pre"){
            if(this.state.nowPlayingMoviesPanel>1){
                this.setState({
                    ...this.state,
                    nowPlayingMoviesPanel : this.state.nowPlayingMoviesPanel - 1
                })
                 }else{
                    this.setState({
                        ...this.state,
                        nowPlayingMoviesPanel : 4
                    })
                 }
        }
        }
      
    }

    handleSeriesNavClick = (e, category) =>{
       if(category==='popularSeries') {
           if(e.target.value==="next"){
            if(this.state.popularSeriesPanel<4){
            this.setState({
                ...this.state,
                popularSeriesPanel : this.state.popularSeriesPanel +1
            })
             }else{
                this.setState({
                    ...this.state,
                    popularSeriesPanel : 1
                })
             }
        }else if(e.target.value === "pre"){
            if(this.state.popularSeriesPanel>1){
                this.setState({
                    ...this.state,
                    popularSeriesPanel : this.state.popularSeriesPanel - 1
                })
                 }else{
                    this.setState({
                        ...this.state,
                        popularSeriesPanel : 4
                    })
                 }
        }}
        if(category==='topRatedSeries') {
            if(e.target.value==="next"){
             if(this.state.topRatedSeriesPanel<4){
             this.setState({
                 ...this.state,
                 topRatedSeriesPanel : this.state.topRatedSeriesPanel +1
             })
              }else{
                 this.setState({
                     ...this.state,
                     topRatedSeriesPanel : 1
                 })
              }
         }else if(e.target.value === "pre"){
             if(this.state.topRatedSeriesPanel>1){
                 this.setState({
                     ...this.state,
                     topRatedSeriesPanel : this.state.topRatedSeriesPanel - 1
                 })
                  }else{
                     this.setState({
                         ...this.state,
                         topRatedSeriesPanel : 4
                     })
                  }
         }}
         if(category==='onAirSeries') {
            if(e.target.value==="next"){
             if(this.state.onAirSeriesPanel<4){
             this.setState({
                 ...this.state,
                 onAirSeriesPanel : this.state.onAirSeriesPanel +1
             })
              }else{
                 this.setState({
                     ...this.state,
                     onAirSeriesPanel : 1
                 })
              }
         }else if(e.target.value === "pre"){
             if(this.state.onAirSeriesPanel>1){
                 this.setState({
                     ...this.state,
                     onAirSeriesPanel : this.state.onAirSeriesPanel - 1
                 })
                  }else{
                     this.setState({
                         ...this.state,
                         onAirSeriesPanel : 4
                     })
                  }
         }}
         if(category==='airingTodaySeries') {
            if(e.target.value==="next"){
             if(this.state.airingTodaySeriesPanel<4){
             this.setState({
                 ...this.state,
                 airingTodaySeriesPanel : this.state.airingTodaySeriesPanel +1
             })
              }else{
                 this.setState({
                     ...this.state,
                     airingTodaySeriesPanel : 1
                 })
              }
         }else if(e.target.value === "pre"){
             if(this.state.airingTodaySeriesPanel>1){
                 this.setState({
                     ...this.state,
                     airingTodaySeriesPanel : this.state.airingTodaySeriesPanel - 1
                 })
                  }else{
                     this.setState({
                         ...this.state,
                         airingTodaySeriesPanel : 4
                     })
                  }
         }}
    }

    tilesList = (type, category) =>{ 
        let array=null;
        let panel=null;
        if(type==='movies'){
            if(category==='popularMovies'){
                array = this.state.popularMovies;
                panel = this.state.popularMoviesPanel
            }else if(category === 'topRatedMovies'){
                array = this.state.topRatedMovies;
                panel = this.state.topRatedMoviesPanel
            }else if(category === 'upcomingMovies'){
                array = this.state.upcomingMovies;
                panel = this.state.upcomingMoviesPanel
            }else if(category==='nowPlayingMovies'){
                array = this.state.nowPlayingMovies;
                panel = this.state.nowPlayingMoviesPanel
            }
        return array?.length > 0 ? (
            array.slice((panel*5)-5,panel*5).map( movie => {
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
)}else{
    if(category==='popularSeries'){
        array = this.state.popularSeries;
        panel = this.state.popularSeriesPanel
    }else if(category === 'topRatedSeries'){
        array = this.state.topRatedSeries;
        panel = this.state.topRatedSeriesPanel
    }else if(category === 'onAirSeries'){
        array = this.state.onAirSeries;
        panel = this.state.onAirSeriesPanel
    }else if(category==='airingTodaySeries'){
        array = this.state.airingTodaySeries;
        panel = this.state.airingTodaySeriesPanel
    }
    return array?.length > 0 ? (
        array.slice((panel*5)-5,panel*5).map( series => {
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
}
     }

    render(){
        return(
            <div className={styles.home}>
                <div className={styles.moviesSection}>
                    <h1>Popular Movies</h1>
                    <div className={styles.tilesPanel}>
                        <button onClick={(e)=>{this.handleMovieNavClick(e,'popularMovies')}} className={cx(styles.btn, styles.preBtn)} value="pre"><FontAwesomeIcon icon={faChevronLeft}/></button>
                        {this.tilesList('movies','popularMovies')}
                        <button onClick={(e)=>{this.handleMovieNavClick(e,'popularMovies')}}  className={cx(styles.btn, styles.nextBtn)} value="next"><FontAwesomeIcon icon={faChevronRight}/></button>
                    </div>     
                </div>
                <div className={styles.moviesSection}>
                    <h1>Top Rated Movies</h1>
                    <div className={styles.tilesPanel}>
                        <button onClick={(e)=>{this.handleMovieNavClick(e,'topRatedMovies')}} className={cx(styles.btn, styles.preBtn)} value="pre"><FontAwesomeIcon icon={faChevronLeft}/></button>
                        {this.tilesList('movies','topRatedMovies')}
                        <button onClick={(e)=>{this.handleMovieNavClick(e,'topRatedMovies')}}  className={cx(styles.btn, styles.nextBtn)} value="next"><FontAwesomeIcon icon={faChevronRight}/></button>
                    </div>     
                </div>
                <div className={styles.moviesSection}>
                    <h1>Upcpming Movies</h1>
                    <div className={styles.tilesPanel}>
                        <button onClick={(e)=>{this.handleMovieNavClick(e,'upcomingMovies')}} className={cx(styles.btn, styles.preBtn)} value="pre"><FontAwesomeIcon icon={faChevronLeft}/></button>
                        {this.tilesList('movies','upcomingMovies')}
                        <button onClick={(e)=>{this.handleMovieNavClick(e,'upcomingMovies')}}  className={cx(styles.btn, styles.nextBtn)} value="next"><FontAwesomeIcon icon={faChevronRight}/></button>
                    </div>     
                </div>
                <div className={styles.moviesSection}>
                    <h1>Now Playing Movies</h1>
                    <div className={styles.tilesPanel}>
                        <button onClick={(e)=>{this.handleMovieNavClick(e,'nowPlayingMovies')}} className={cx(styles.btn, styles.preBtn)} value="pre"><FontAwesomeIcon icon={faChevronLeft}/></button>
                        {this.tilesList('movies','nowPlayingMovies')}
                        <button onClick={(e)=>{this.handleMovieNavClick(e,'nowPlayingMovies')}} className={cx(styles.btn, styles.nextBtn)} value="next"><FontAwesomeIcon icon={faChevronRight}/></button>
                    </div>     
                </div>
          
                <div className={styles.seriesSection}>
                        <h1>Popular Series</h1>
                        <div className={styles.tilesPanel}>
                             <button  onClick={(e)=>{this.handleSeriesNavClick(e,'popularSeries')}} className={cx(styles.btn, styles.preBtn)} value="pre"><FontAwesomeIcon icon={faChevronLeft}/></button>
                            {this.tilesList('series','popularSeries')}
                            <button onClick={(e)=>{this.handleSeriesNavClick(e,'popularSeries')}}className={cx(styles.btn, styles.nextBtn)} value="next"><FontAwesomeIcon icon={faChevronRight}/></button> 
                        </div>
                  
                </div> 

                <div className={styles.seriesSection}>
                        <h1>Top Rated Series</h1>
                        <div className={styles.tilesPanel}>
                             <button onClick={(e)=>{this.handleSeriesNavClick(e,'topRatedSeries')}} className={cx(styles.btn, styles.preBtn)} value="pre"><FontAwesomeIcon icon={faChevronLeft}/></button>
                            {this.tilesList('series','topRatedSeries')}
                            <button onClick={(e)=>{this.handleSeriesNavClick(e,'topRatedSeries')}} className={cx(styles.btn, styles.nextBtn)} value="next"><FontAwesomeIcon icon={faChevronRight}/></button> 
                        </div>
                  
                </div> 

                <div className={styles.seriesSection}>
                        <h1>On Air Series</h1>
                        <div className={styles.tilesPanel}>
                             <button onClick={(e)=>{this.handleSeriesNavClick(e,'onAirSeries')}} className={cx(styles.btn, styles.preBtn)} value="pre"><FontAwesomeIcon icon={faChevronLeft}/></button>
                            {this.tilesList('series','onAirSeries')}
                            <button onClick={(e)=>{this.handleSeriesNavClick(e,'onAirSeries')}} className={cx(styles.btn, styles.nextBtn)} value="next"><FontAwesomeIcon icon={faChevronRight}/></button> 
                        </div>
                  
                </div> 

                <div className={styles.lastSeriesSection}>
                        <h1>Airing Today Series</h1>
                        <div className={styles.tilesPanel}>
                             <button onClick={(e)=>{this.handleSeriesNavClick(e,'airingTodaySeries')}}  className={cx(styles.btn, styles.preBtn)} value="pre"><FontAwesomeIcon icon={faChevronLeft}/></button>
                            {this.tilesList('series','airingTodaySeries')}
                            <button onClick={(e)=>{this.handleSeriesNavClick(e,'airingTodaySeries')}} className={cx(styles.btn, styles.nextBtn)} value="next"><FontAwesomeIcon icon={faChevronRight}/></button> 
                        </div>
                  
                </div> 
            </div>
            
        )
    }
 
}

export default Home