import React, {useCallback, useEffect, useState} from 'react';
import classes from './Store.module.css';
import GameItems from '../../components/GameItems/GameItems';
import axios from 'axios';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';

const Store = props => {
    const [games,setGames] = useState({});
    const [timeoutState,setTimeoutState] = useState(0);
    const [genres,setGenres] = useState([]);
    const [searchQuery,setSearchQuery] = useState('');
    const [searchGenre,setSearchGenre] = useState('');
    const [pageNumber,setPageNumber] = useState(1);

    useEffect(() => {
        search();
    },[searchQuery,searchGenre,pageNumber])

    useEffect(() => {
        axios.get('https://api.rawg.io/api/genres')
            .then(res => {
                const genreArray = Object.values(res.data.results).map(item => {
                    return {id: item.id,name: item.name};
                })
                setGenres(genreArray);
            })
    },[]);

    const showDetails = useCallback( id => {
        props.history.push('/store/details/'+id)},[]
    );

    const addGameToCart = id => {
        let game = Object.values(games).filter(item => item.id === id);
        const object = {
            id: game[0].id,
            name: game[0].name,
            img: game[0].background_image,
            released: game[0].released
        }
        props.addGameInCart(object);
    }

    const search = () => {
        axios.get('https://api.rawg.io/api/games?page='+pageNumber+'&page_size=8&search='+searchQuery+'&'+searchGenre)
            .then(res => {
                const data  = res.data.results;
                setGames(data);
            })
    }

    const inputChangeHandler = event => {
        let string = event.target.value;
        if(timeoutState)
            clearTimeout(timeoutState);
        setTimeoutState(setTimeout(() => {
            string = string.trim();
            setSearchQuery(string);
            resetPageNumber();
        },600))
    }

    const genreChangeHandler = event => {
        let genreId = event.target.value;
        let string = 'genres='+genreId;
        if(genreId === 'default'){
            setSearchGenre('');
        }
        else
            setSearchGenre(string);
        resetPageNumber();
    }

    const loadMoreHandler = () =>{
        if(Object.values(games).length > 4){
            setPageNumber(pageNumber+1);
        }
    }

    const loadLessHandler = () => {
        if(pageNumber > 1){
            setPageNumber(pageNumber-1);
        }
    }

    const resetPageNumber = () => {
        setPageNumber(1);
    }

    let options = null;
    if(genres){
        options = genres.map(item => {
            return <option key={item.id} value={item.id}>{item.name}</option>
        })
    }

    return (
        <div className={classes.StoreContainer}>
            <input onChange={inputChangeHandler} className={classes.Input} type='text' placeholder='Search'/>
            <select onChange={genreChangeHandler} size='18' className={classes.Select}>
                <option value="default">Choose genre / Reset genre</option>
                {options}
            </select>
            <div className={classes.Buttons}>
                <input className={classes.Button} type='button' value='<<' onClick={loadLessHandler}/>
                <input className={classes.Button} type='button' value='>>' onClick={loadMoreHandler}/>
            </div>
            <GameItems addToCart={addGameToCart} loadDetails={showDetails} gamesArray={games}/>
        </div>

    );
}
const mapDispatchToProps = dispatch => {
    return{
        addGameInCart: (game) => dispatch(action.addGameInCart(game))
    }
}
export default connect(null,mapDispatchToProps)(Store);