
import { Link } from 'react-router-dom';

import { useSelector} from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../redux/actionCreators/authActionCreater';
import './Navigation.css'

import React, { useState } from "react";



function NavigationComponent() {
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  function burger() {
    var btnMenu = document.querySelector(".btn-menu");
    if (btnMenu.style.display === "none") {
      btnMenu.style.display = "block"; // or "inline" or any other valid display value
    } else {
      btnMenu.style.display = "none";
    }
  }
  

  return (
    <>
    <div style={{backgroundColor:"#FFFFFF"}}>
<div className="header">
  <h1>Narbariya</h1>
  
</div>

<div className="colunm ">

  <div className="parta col-3 col-s-3 menu" >
    <ul>
      {isAuthenticated ? (
      <>
      <li className='fw-bold'>Hello! <span>{user.displayName}</span></li>
      <li className='fw-bold'>Our Website</li>
      <li><Link to="/dashboard" className="text-primary fw-bold">Dashboard</Link></li>
      <li className='fw-bold' onClick={ () => dispatch(signOutUser())}>Logout</li>
      </>
      ):(
        <>
        <li className='fw-bold'><Link className='login-link' to="/login">Login</Link></li>
        <li className='fw-bold'><Link className='login-link' to="/register" >Register</Link></li>
        </>
      )
}
    </ul>
  </div>

  <div className='narbariya'>
    <h1>Narbariya</h1>
    <p>Chania is the capital of the Chania region on the island of Crete. The city can be divided in two parts, the old town and the modern city.</p>
  </div>

  <div className="">

    <div className="aside" >
      <h2>Audit</h2>
      <p>Chania is a city on the island of Crete.</p>
      <h2>Gst</h2>
      <p>Crete is a Greek island in the Mediterranean Sea.</p>
      <h2>Income Tax</h2>
      <p>You can reach Chania airport from all over Europe.</p>
     
    </div>
  </div>
</div>

<div className="footer footer-fixed">
  <p>Resize the browser window to see how the content responds to the resizing.</p>
</div>
</div>

    </>
  )
}
export default NavigationComponent;
