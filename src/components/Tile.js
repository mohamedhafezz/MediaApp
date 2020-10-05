import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './tile.module.css'
import Snippet from './Snippet'


class Tile extends Component{
 state={
     hover:0,
     dropdown:0
 }

    componentDidUpdate(){
    }

   setHover = ()=>{
       this.setState({
           ...this.state,
           hover:1
       })
       setTimeout(()=>{
        if(this.state.hover===1){
        this.setState({
            ...this.state,
            dropdown:1
        })
    }
},1500)
   }
  
   clearHover = ()=>{
    this.setState({
        ...this.state,
        hover:0
    })
}

   
    render(){
        let url = '/'+this.props.type+'/'+this.props.id
       
        return(
            <div className={styles.tile}>
                <div onMouseOver={this.setHover} onMouseOut={this.clearHover} className={ this.state.dropdown ? styles.dropON:''} >
                    <NavLink to={url}><img src={this.props.logo} alt="logo"/></NavLink>
                    <div className={styles.popUpBox}>
                    <Snippet id={this.props.id} type={this.props.type}
                    />
                    </div>
                </div>
            </div>
        )
    }
}

export default Tile