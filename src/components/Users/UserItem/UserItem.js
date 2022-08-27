import React from 'react'
import classes from './UserItem.module.css'
import { ImUser } from 'react-icons/im'

const UserItem = (props) => {
  return (
    <div className={classes.UserItemOuter}>
      <div onClick={() => props.loadDetails(props.user.id)} className={classes.UserItemClickable}>
        <div className={classes.PicturePart}>
          <ImUser color="white" size={100} style={{ width: '90%', height: '90%' }} />
        </div>
        <div className={classes.TextPart}>{props.user.userName}</div>
      </div>
      <div className={classes.Button}></div>
    </div>
  )
}
export default UserItem
