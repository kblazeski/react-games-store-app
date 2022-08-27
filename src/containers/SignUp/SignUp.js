import React, { useEffect, useState } from 'react'
import classes from './SignUp.module.css'
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { useUser } from '../../context/UserProvider'

const SignUp = (props) => {
  const [userName, setUserName] = useState({ valid: false, touched: false, value: '' })
  const [email, setEmail] = useState({ valid: false, touched: false, value: '' })
  const [pw, setPw] = useState({ valid: false, touched: false, value: '' })
  const [pwConfirm, setPwConfirm] = useState({ valid: false, touched: false, value: '' })
  const [validated, setValidated] = useState(false)

  const user = useUser()

  useEffect(() => {
    checkValidation()
  }, [email, pw, pwConfirm])

  const checkValidation = () => {
    let valid = true
    const arrayCheck = []
    arrayCheck.push(email)
    arrayCheck.push(pw)
    arrayCheck.push(userName)
    arrayCheck.push(pwConfirm)
    for (let i in arrayCheck) {
      if (!arrayCheck[i].valid) {
        valid = false
        break
      }
    }
    let checkPws = pw.value === pwConfirm.value
    valid = valid && checkPws
    setValidated(valid)
  }

  const inputUsernameHandler = (event) => {
    const valid = event.target.value.trim() !== ''
    setUserName({ valid: valid, touched: true, value: event.target.value })
  }

  const inputEmailHandler = (event) => {
    const pattern = new RegExp('\\S+@\\S+\\.\\S+')
    let string = event.target.value
    let valid = pattern.test(string)
    setEmail({ valid: valid, touched: true, value: string })
  }

  const inputPasswordHandler = (event) => {
    const pattern = new RegExp('^.{6,}$')
    let string = event.target.value
    let valid = pattern.test(string)
    setPw({ valid: valid, touched: true, value: string })
  }

  const inputConfirmPasswordHandler = (event) => {
    let string = event.target.value
    let valid = string === pw.value
    setPwConfirm({ valid: valid, touched: true, value: string })
  }

  const styleUsername = [classes.Input]
  const styleEmail = [classes.Input]
  const stylePw = [classes.Input]
  const styleConfirmedPw = [classes.Input]

  if (!userName.valid && userName.touched) {
    styleUsername.push(classes.Invalid)
  }

  if (!email.valid && email.touched) {
    styleEmail.push(classes.Invalid)
  }
  if (!pw.valid && pw.touched) {
    stylePw.push(classes.Invalid)
  }
  if (!pwConfirm.valid && pwConfirm.touched) {
    styleConfirmedPw.push(classes.Invalid)
  }

  const signUpHandler = async (event) => {
    event.preventDefault()
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, pw.value)
    await updateProfile(auth.currentUser, { displayName: userName.value })
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      id: userCredential.user.uid,
      userName: userName.value,
      email: email.value,
      albums: [],
    })
    props.history.push('/find-albums')
  }
  return (
    <div className={classes.SignUpOuterContainer}>
      {props.loading ? <ProgressBar /> : null}
      <div className={classes.SignUpContainer}>
        <h3>Sign up</h3>
        <form onSubmit={signUpHandler}>
          <label>
            <strong>Username: </strong>
          </label>
          <br />
          <input
            onChange={inputUsernameHandler}
            className={styleUsername.join(' ')}
            value={userName.value}
            type="text"
            placeholder="Enter your username"
          />
          <label>
            <strong>Email:</strong>
          </label>
          <br />
          <input
            onChange={inputEmailHandler}
            className={styleEmail.join(' ')}
            value={email.value}
            type="email"
            placeholder="Enter your email"
          />
          <label>
            <strong>Password:</strong>
          </label>
          <input
            className={stylePw.join(' ')}
            onChange={inputPasswordHandler}
            value={pw.value}
            type="password"
            placeholder="Enter your password"
          />
          <label>
            <strong>Confirm password:</strong>
          </label>
          <input
            className={styleConfirmedPw.join(' ')}
            onChange={inputConfirmPasswordHandler}
            value={pwConfirm.value}
            type="password"
            placeholder="Confirm your password"
          />
          <button disabled={!validated}>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
