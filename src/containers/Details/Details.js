import React, { useEffect, useState } from 'react'
import { musicApi } from '../../api/MusicApi'
import classes from './Details.module.css'

const Details = (props) => {
  const [details, setDetails] = useState()
  useEffect(() => {
    const queryParams = new URLSearchParams(props.location.search)
    const albumName = queryParams.get('albumName')
    const artistName = queryParams.get('artistName')
    
    musicApi.getAlbumForArtist(albumName, artistName).then((data) => {
      const returnedArray = data.data.results.bindings
      if (returnedArray && returnedArray.length > 0) {
        const returnedObject = returnedArray[0]
        const detailsObject = {
          artistName,
          albumName,
          abstract: returnedObject.abstract.value,
          year: returnedObject.year.value,
          genre: returnedObject.genre.value,
        }
        setDetails(detailsObject)
      }
    })
  }, [])
  return (
    <div className={classes.Details}>
      {details ? (
        <div className={classes.Outer}>
          <div className={classes.Inner}>
            <strong>Album Name: </strong>
            {details.albumName}
          </div>
          <div className={classes.Inner}>
            <strong>Artist Name: </strong>
            {details.artistName}
          </div>
          <div className={classes.Inner}>
            <strong>Year: </strong>
            {details.year}
          </div>
          <div className={classes.Inner}>
            <strong>Genre: </strong>
            <div dangerouslySetInnerHTML={{ __html: details.genre }} />
          </div>
          <div className={classes.Inner}>
            <strong>Description: </strong>
            {details.abstract}
          </div>
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: 'white' }}>No results found</p>
      )}
    </div>
  )
}
export default Details
