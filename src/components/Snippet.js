import React, { Component } from 'react'
import {connect} from 'react-redux'
import styles from './snippet.module.css'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { faClock, faStar, faCalendarCheck, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Snippet extends Component{
   
    state={
        data:null
    }
    
    componentDidMount(){
        const detailsPath = 'https://api.themoviedb.org/3/'+this.props.type+'/'+this.props.id+'?api_key=097d34079b54c8168395f4f85943271b&append_to_response=videos,images'
        axios.get(detailsPath)
        .then((res)=>{
            this.setState({ data:res.data});
        })

    }


    render(){
        let url = '/'+this.props.type+'/'+this.props.id;
        return(
            <div>
             {  
                this.state.data &&
                <div className={styles.snippet}>
                    
                    <iframe className={styles.trailer} title={this.state.data?.videos?.results[0]?.name} width="350" height="190" src={"https://www.youtube.com/embed/"+this.state.data?.videos?.results[0]?.key} frameBorder="0" allowFullScreen={true}></iframe>
                    
                    
                    <div className={styles.detailsBox1}>
                        <p> <FontAwesomeIcon icon={faClock}/> {this.state.data.runtime || this.state.data.episode_run_time} mins</p>
                        <p> <FontAwesomeIcon icon={faStar} /> {this.state.data.vote_average} </p>
                        <p> <FontAwesomeIcon icon={faCalendarCheck} /> {this.state.data.release_date || this.state.data.first_air_date}</p>
                        <p> <FontAwesomeIcon icon={faGlobe} /> {this.state.data.original_language}  </p>
                    </div>                   
                    <div className={styles.detailsBox2}>
                        <p> { this.state.data.genres.map((genre, index)=>{
                                return  <span key={index}> {genre.name} </span>})}<br/>
                        </p>
                        <NavLink to={url}> <button className={styles.infoBtn}>More Info</button></NavLink>
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

export default connect(mapStateToProps)(Snippet)