import React, {useEffect, useState} from 'react';
import classes from './Login.module.css';
import ProgressBar from "../../components/UI/ProgressBar/ProgressBar";
import * as action from "../../store/actions";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

const Login = props => {
    const [email,setEmail] = useState({valid: false,touched: false,value: ''});
    const [pw,setPw] = useState({valid: false,touched: false,value: ''});
    const [pwConfirm,setPwConfirm] = useState({valid: false,touched: false,value: ''});
    const [validated,setValidated] = useState(false);

    useEffect(() => {
        checkValidation();
    },[email,pw,pwConfirm]);

    const checkValidation = () => {
        let valid = true;
        const arrayCheck = [];
        arrayCheck.push(email);
        arrayCheck.push(pw);
        arrayCheck.push(pwConfirm);
        for(let i in arrayCheck){
            if(!arrayCheck[i].valid){
                valid = false;
                break;
            }
        }
        let checkPws = pw.value === pwConfirm.value
        valid = valid && checkPws;
        setValidated(valid);
    }

    const inputEmailHandler = event => {
        const pattern = new RegExp("\\S+@\\S+\\.\\S+");
        let string = event.target.value;
        let valid = pattern.test(string);
        setEmail({valid: valid,touched:true,value:string});
    }

    const inputPasswordHandler = event => {
        const pattern = new RegExp('^.{6,}$');
        let string = event.target.value;
        let valid = pattern.test(string);
        setPw({valid:valid,touched:true,value:string});
    }

    const inputConfirmPasswordHandler = event => {
        let string = event.target.value;
        let valid = string === pw.value;
        setPwConfirm({valid:valid,touched:true,value:string});
    }

    const styleEmail = [classes.Input];
    const stylePw = [classes.Input];
    const styleConfirmedPw = [classes.Input];

    if(!email.valid && email.touched){
        styleEmail.push(classes.Invalid);
    }
    if(!pw.valid && pw.touched){
        stylePw.push(classes.Invalid);
    }
    if(!pwConfirm.valid && pwConfirm.touched){
        styleConfirmedPw.push(classes.Invalid);
    }

    const loginHandler = (event) => {
        event.preventDefault();
        props.login(email.value,pw.value);
    }

    let loginContent = (
        <React.Fragment>
            <h3>Login</h3>
            <form onSubmit={loginHandler}>
                <label><strong>Email:</strong></label>
                <br/>
                <input onChange={inputEmailHandler}
                       className={styleEmail.join(' ')}
                       value={email.value}
                       type='email' placeholder='Enter your email'/>
                <label><strong>Password:</strong></label>
                <input className={stylePw.join(' ')}
                       onChange={inputPasswordHandler}
                       value={pw.value}
                       type='password' placeholder='Enter your password'/>
                <label><strong>Confirm password:</strong></label>
                <input className={styleConfirmedPw.join(' ')}
                       onChange={inputConfirmPasswordHandler}
                       value={pwConfirm.value}
                       type='password'
                       placeholder='Confirm your password'/>
                <br/>
                <p>Dont have account? Sign up <NavLink to='/signup'>here!</NavLink></p>
                <button disabled={!validated}>Login</button>
            </form>
        </React.Fragment>
    );

    if(props.authenticated){
        loginContent = (
            <button onClick={props.logout}>Sign out</button>
        )
    }
    return (
        <div className={classes.LoginOuterContainer}>
            {props.loading?<ProgressBar/>:null}
            <div className={classes.LoginContainer}>
                {loginContent}
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        authenticated: state.auth.userId !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        login: (email,pw) => dispatch(action.login(email,pw)),
        logout: () => dispatch(action.logout())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);