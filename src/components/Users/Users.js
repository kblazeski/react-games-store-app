import React from 'react'
import classes from './Users.module.css'
import AlbumItem from './UserItem/UserItem'
import UserItem from './UserItem/UserItem'

const Users = (props) => {
  let users = <div style={{ color: 'white' }}>No results found!</div>
  if (props.users.length) {
    users = props.users.map((item) => {
      return <UserItem key={item.id} loadDetails={props.loadDetails} user={item} />
    })
  }
  return <div className={classes.Users}>{users}</div>
}
export default React.memo(Users)
