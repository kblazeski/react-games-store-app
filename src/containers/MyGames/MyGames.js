import React, {useEffect, useState} from 'react';
import classes from './MyGames.module.css';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import axios from 'axios';
import {connect} from 'react-redux';

const MyGames = props => {
    const [myGames,setMyGames] = useState([]);

    useEffect(() => {
        if(props.userId){
            axios.get('https://games-store-project.firebaseio.com/myGames.json?orderBy="userId"&equalTo="'+props.userId+'"')
                .then(res => {
                    const array = Object.values(res.data);
                    const finalArray = [];
                    array.map(item => {
                        return item.data.map(item => {
                            finalArray.push(item);
                        })
                    })
                    const uniqueArray = [...new Map(finalArray.map(item => [item['id'], item])).values()];
                    setMyGames(uniqueArray);
                })
        }
        else{
            props.history.push('/store');
        }
    },[props.userId]);
    let progressBar = null;
    if(myGames.length === 0){
        progressBar = <ProgressBar/>;
    }
    let items = myGames.map(item => {
        return (
            <div key={item.id} className={classes.CartItem}>
                <img alt='' src={item.img}/>
                <div>{item.name}</div>
            </div>
        );
    })
    return (
       <div className={classes.MyGamesContainer}>
           {progressBar}
           <div className={classes.MyGames}>
               {items}
           </div>
       </div>
    );
}
const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    }
}
export default connect(mapStateToProps)(MyGames);
