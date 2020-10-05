import React, { Component } from 'react'
import {connect} from 'react-redux'
import styles from './details.module.css'
import axios from 'axios'
import { faClock, faStar, faCalendarCheck, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// methods
import {getSingleMovie} from '../actions/rootActions'
class Details extends Component{
   
    state={
        data:null
    }
    
    componentDidMount=()=>{
        const detailsPath = 'https://api.themoviedb.org/3/'+this.props.match.params.type+'/'+this.props.match.params.id+'?api_key=097d34079b54c8168395f4f85943271b&append_to_response=videos,images'
        axios.get(detailsPath)
        .then((res)=>{
            console.log(res.data);
            this.setState({ data:res.data});
        })
        //this.props.getSingleMovie(this.props.match.params.id)
        console.log('=========>>',axios.get(detailsPath))
    }

  
    render(){
       let posterURL= 'http://image.tmdb.org/t/p/w1280'+this.state.data?.backdrop_path
        return(
          
            <div style={{backgroundImage: 'url('+posterURL+')'}} className={styles.detailsWraper}>
             {  
                this.state.data &&
                <div className={styles.details}>
                    <h1 className={styles.contentTitle}> {this.state.data.original_title || this.state.data.original_name} </h1>
                    <iframe className={styles.trailer} title={this.state.data.videos.results[0].name} width="1000" height="450" src={"https://www.youtube.com/embed/"+this.state.data.videos.results[0].key} frameBorder="0" allowFullScreen={true}></iframe>

                    <div className={styles.detailsBox}>
                        <div className={styles.textDetails}>    
                            <h2>Overview</h2>
                            <p>{this.state.data.overview}</p> 
                            <h2>Genres</h2>
                                { this.state.data.genres.map((genre, index)=>{
                                    return  <span key={index}> {genre.name} </span>})}
                            <h2>Produced By</h2>     
                            <p>{this.state.data.production_companies?.map((company, index)=><span key={index}>{company.name}  </span>)}
                            </p>
                            <p>
                            <FontAwesomeIcon icon={faClock}/> {this.state.data.runtime || this.state.data.episode_run_time} mins<br></br>
                            <FontAwesomeIcon icon={faStar} /> {this.state.data.vote_average} <br></br>
                            <FontAwesomeIcon icon={faCalendarCheck} /> {this.state.data.release_date || this.state.data.first_air_date}<br></br>
                            <FontAwesomeIcon icon={faGlobe} /> {this.state.data.original_language} <br></br>
                            </p>
                            {this.state.data.created_by && <p>
                            Created by: {this.state.data.created_by.map((creator, index)=><span key={index}>{creator.name}  </span>)}
                            </p>}
                            
                            {this.state.data.networks &&
                            <p>Networks: {this.state.data.networks.map((network, index)=><span key={index}>{network.name}  </span>)}
                            </p>}
                            {this.state.data.number_of_episodes &&
                            <p>Number of episodes: {this.state.data.number_of_episodes}
                            </p>}
                            {this.state.data.number_of_seasons &&
                            <p>Number of seasons: {this.state.data.number_of_seasons}
                            </p>}
                        </div>
                        <img src={'http://image.tmdb.org/t/p/w185'+this.state.data.poster_path} alt="Movie poster"/>
                    </div>
                </div>
                 }
            </div>
            
        )
    }
   
}

const mapStateToProps = (state)=>{
    return {
        movies : state.movies
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        getSingleMovie:id=>dispatch(getSingleMovie(id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Details)