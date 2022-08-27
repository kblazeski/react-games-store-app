import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { useDidComponentUpdate } from '../../hooks/useDidComponentUpdate'
import * as action from '../../store/actions/index'
import classes from './FindUsers.module.css'
import { useEffect } from 'react'
import { FirebaseApi } from '../../api/FirebaseApi'
import Users from '../../components/Users/Users'

const FindUsers = (props) => {
  const [users, setUsers] = useState([])
  const [timeoutState, setTimeoutState] = useState(0)
  const [userName, setUserName] = useState('')
  const [userNameInputText, setUserNameInputText] = useState('')

  useEffect(() => {
    const queryParams = new URLSearchParams(props.location.search)
    const userName = queryParams.get('userName')

    setUserName(userName)
    setUserNameInputText(userName)
  }, [])

  useDidComponentUpdate(() => {
    if (userName) {
      props.history.replace('/users?userName=' + userName)

      FirebaseApi.getUsers(userName).then((res) => {
        setUsers(res)
      })
    }
  }, [userName])

  const showDetails = useCallback((id) => {
    props.history.push('/users/details?id=' + id)
  }, [])

  const inputChangeHandler = (event) => {
    let string = event.target.value
    setUserNameInputText(string)
    if (timeoutState) clearTimeout(timeoutState)
    setTimeoutState(
      setTimeout(() => {
        string = string.trim()
        setUserName(string)
      }, 600)
    )
  }

  return (
    <div className={classes.FindUsersContainer}>
      <input
        onChange={inputChangeHandler}
        value={userNameInputText}
        className={classes.Input}
        type="text"
        placeholder="Search users for given username"
      />
      <Users loadDetails={showDetails} users={users} />
      {/* <Albums loadDetails={showDetails} users={users} userName={userName} /> */}
    </div>
  )
}
export default FindUsers
