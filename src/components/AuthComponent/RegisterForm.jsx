import React from 'react'
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/actionCreators/authActionCreater';
import { useNavigate } from "react-router-dom"

function RegisterForm () {

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [Password, setPassword] = React.useState("");
    const [passwordconfirmation, setPasswordConfirmation] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!name || !email || !passwordconfirmation || !Password){
            ("plz fill in all felds")
            return;
        }       
        if(Password != passwordconfirmation){
            ("pwd not match")
            return;
        }

        dispatch(signUpUser(name, email, Password, setSuccess));

    }

    React.useEffect(() => {
        if(success){
            navigate("/dashboard")
        }
    },[success])

  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
        <div className="form-group my-2">
            <input type="txet"
            name='Name'
            className='form-control'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="form-group my-2">
            <input type="email"
            name='email'
            className='form-control'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group my-2">
            <input type="password"
            name='password'
            className='form-control'
            placeholder='Password'
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="form-group my-2">
            <input type="re-type password"
            name='passwordconfirmation'
            className='form-control'
            placeholder='password'
            value={passwordconfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
        </div>
        <button type='submit' className='btn btn-primary my-2 form-control'>Register</button>
    </form>
  )
}


export default RegisterForm;

