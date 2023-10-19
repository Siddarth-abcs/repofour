import React from 'react'
import { Link } from 'react-router-dom'

import RegisterForm from '../../../components/AuthComponent/RegisterForm'

const Register = () => {
  return (
    <div className='container-fluid'>
    <h1 className='display-1 my-5 text-center'>Register</h1>
    <div className='row'>
        <div className='col-md-5 mx-auto mt-5'>
            <RegisterForm/>
            <Link to="/login">
            if you already member login
            </Link>
        </div>
    </div>
   </div>
  )
}

export default Register;