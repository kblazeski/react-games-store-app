import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { musicApi } from '../../api/MusicApi'
import Albums from '../../components/Albums/Albums'
import { useDidComponentUpdate } from '../../hooks/useDidComponentUpdate'
import * as action from '../../store/actions/index'
import classes from './Store.module.css'
import { uniqBy } from 'lodash'

const Store = (props) => {
  const [albums, setAlbums] = useState({})
  const [timeoutState, setTimeoutState] = useState(0)
  const [artistName, setArtistName] = useState('')

  useDidComponentUpdate(() => {
    if (artistName) {
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
    props.history.push('/store/details/' + id)
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
    if (timeoutState) clearTimeout(timeoutState)
    setTimeoutState(
      setTimeout(() => {
        string = string.trim()
        setArtistName(string)
      }, 600)
    )
  }

  return (
    <div className={classes.StoreContainer}>
      <input onChange={inputChangeHandler} className={classes.Input} type="text" placeholder="Search" />
      <Albums addToCart={addGameToCart} loadDetails={showDetails} albums={albums} />
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    addGameInCart: (game) => dispatch(action.addGameInCart(game)),
  }
}
export default connect(null, mapDispatchToProps)(Store)
