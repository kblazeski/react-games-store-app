import React, {useEffect, useState} from 'react';
import classes from './SignUp.module.css';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';


const SignUp = props => {
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

    const signUpHandler = (event) => {
        event.preventDefault();
        props.signUp(email.value,pw.value);
    }
    if(props.authenticated){
        props.history.push('/store');
    }
    return (
        <div className={classes.SignUpOuterContainer}>
            {props.loading?<ProgressBar/>:null}
            <div className={classes.SignUpContainer}>
                <h3>Sign up</h3>
                <form onSubmit={signUpHandler}>
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
                    <button disabled={!validated}>Sign up</button>
                </form>
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
        signUp: (email,pw) => dispatch(action.signUp(email,pw))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);