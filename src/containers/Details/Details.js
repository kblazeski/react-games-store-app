import React, {useEffect,useState} from 'react';
import classes from './Details.module.css';
import {Carousel,CarouselItem} from 'react-bootstrap';
import axios from 'axios';

const Details = props => {
    const [details,setDetails] = useState({});
    const [pictures,setPictures] = useState([]);
    useEffect(() => {
        axios.get('https://api.rawg.io/api/games/'+props.match.params.id)
            .then(res => {
                let platforms =  Object.values(res.data.platforms);
                platforms = platforms.map(item => {
                    return item.platform.name;
                });
                platforms = platforms.join(' , ');
                let genres = Object.values(res.data.genres);
                genres = genres.map(item => {
                    return item.name
                })
                genres = genres.join(' , ');
                let req = res.data.platforms[0].requirements?res.data.platforms[0].requirements
                    :{requirements:{minimum:{}}};
                const payload = {
                    name: res.data.name,
                    description: res.data.description_raw,
                    backgroundImage: res.data.background_image,
                    metacritic: res.data.metacritic,
                    playtime: res.data.playtime,
                    platforms: platforms,
                    requirements: req,
                    developers: res.data.developers,
                    genres: genres,
                    released: res.data.released
                }
                setDetails(payload);
            });
        axios.get('https://api.rawg.io/api/games/'+props.match.params.id+'/screenshots')
            .then(
                res => {
                    setPictures(res.data.results);
                }
            )
    },[props.match.params.id]);
    let carousel = null;
    if(pictures.length > 0){
        carousel = pictures.map(picture => {
            return <CarouselItem key={picture.id}><img alt='img' src={picture.image}/></CarouselItem>
        });
    }
    let content = null;
    if(Object.keys(details).length !== 0){
        content = (
            <React.Fragment>
                <div className={classes.Carousel}>
                    <Carousel>
                        {carousel}
                    </Carousel>
                </div>
                <div className={classes.Outer}>
                    <div className={classes.Inner}>
                        <strong>Name:  </strong>
                        {details.name}
                    </div>
                    <div className={classes.Inner}>
                        <strong>Metacritic:  </strong>
                        {details.metacritic}
                    </div>
                    <div className={classes.Inner}>
                        <strong>Description:  </strong>
                        {details.description}
                    </div>
                    <div className={classes.Inner}>
                        <strong>Requirements:  </strong>
                        {details.requirements.minimum?
                            <div dangerouslySetInnerHTML={{__html: details.requirements.minimum}}/>:
                            <p><strong>Minimum: </strong>Not Available</p>}
                        {details.requirements.recommended?
                            <div dangerouslySetInnerHTML={{__html: details.requirements.recommended}}/>:
                            <p><strong>Recommended: </strong>Not Available</p>}
                    </div>
                    <div className={classes.Inner}>
                        <strong>Released:  </strong>
                        {details.released}
                    </div>
                    <div className={classes.Inner}>
                        <strong>Platforms:  </strong>
                        {details.platforms}
                    </div>
                    <div className={classes.Inner}>
                        <strong>Genres:  </strong>
                        {details.genres}
                    </div>
                </div>
            </React.Fragment>
        );
    }
    return (
        <div className={classes.Details}>
            {content}
        </div>
    );
}
export default Details;