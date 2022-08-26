import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { musicApi } from '../../api/MusicApi'
import Albums from '../../components/Albums/Albums'
import { useDidComponentUpdate } from '../../hooks/useDidComponentUpdate'
import * as action from '../../store/actions/index'
import classes from './FindAlbums.module.css'
import { uniqBy } from 'lodash'
import { useEffect } from 'react'

const FindAlbums = (props) => {
  const [albums, setAlbums] = useState({})
  const [timeoutState, setTimeoutState] = useState(0)
  const [artistName, setArtistName] = useState('')
  const [artistNameInputText, setArtistNameInputText] = useState('')

  useEffect(() => {
    const queryParams = new URLSearchParams(props.location.search)
    const artistName = queryParams.get('artistName')

    setArtistName(artistName)
    setArtistNameInputText(artistName)
  }, [])

  useDidComponentUpdate(() => {
    if (artistName) {
      props.history.replace('/find-albums?artistName=' + artistName)

      musicApi.getAlbumsForArtist(artistName).then((res) => {
        const albums = res.data.results.bindings
        const uniqueAlbums = uniqBy(albums, (item) => {
          return item.albumName.value
        })
        console.log(uniqueAlbums)
        setAlbums(uniqueAlbums)
      })
    }
  }, [artistName])

  const showDetails = useCallback((id) => {
    props.history.push('/album/details?' + id)
  }, [])

  const addGameToCart = (id) => {
    let game = Object.values(albums).filter((item) => item.id === id)
    const object = {
      id: game[0].id,
      name: game[0].name,
      img: game[0].background_image,
      released: game[0].released,
    }
    props.addGameInCart(object)
  }

  const inputChangeHandler = (event) => {
    let string = event.target.value
    setArtistNameInputText(string)
    if (timeoutState) clearTimeout(timeoutState)
    setTimeoutState(
      setTimeout(() => {
        string = string.trim()
        setArtistName(string)
      }, 600)
    )
  }

  return (
    <div className={classes.FindAlbumsContainer}>
      <input
        onChange={inputChangeHandler}
        value={artistNameInputText}
        className={classes.Input}
        type="text"
        placeholder="Search albums for given artists name"
      />
      <Albums addToCart={addGameToCart} loadDetails={showDetails} albums={albums} artistName={artistName} />
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    addGameInCart: (game) => dispatch(action.addGameInCart(game)),
  }
}
export default connect(null, mapDispatchToProps)(FindAlbums)
