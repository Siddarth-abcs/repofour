import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux/es/hooks/useSelector';
import './Navbar.css'
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../../redux/actionCreators/authActionCreater';

function Navbar() {
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();




  return (
    <nav>
      <div className="container">

        <div className="logo">
          <div className="img"><img src="https://firebasestorage.googleapis.com/v0/b/website-photo-c97aa.appspot.com/o/Logo%20fevicon.png?alt=media&token=1e68da2d-ecfd-4421-986f-13b1af26b9fb&_gl=1*1ny0vc3*_ga*MTQ4MzY0NjgyNi4xNjk2MzI3NjEy*_ga_CW55HF8NVT*MTY5NjMyNzYxMi4xLjEuMTY5NjMyODA3My42MC4wLjA. " className='narbariya-logo'/></div>
          <h2>Narbariya</h2>
        </div>

       <div className="link">
          <div className='btnlinks linksa'>Project</div>
          <div className='btnlinks'>Services</div>
          <div className='btnlinks'>About us</div>
          <div className='btnlinks'>Contact</div>
        </div> 

        <div className="btns">
          <Link to="/" className='btn btn-outline-primary fw-bold' style={{marginRight:"1rem"}}>Home</Link>
          <Link to="/" className='btn btn-outline-primary bg-primary text-light fw-bold' onClick={ () => dispatch(signOutUser())}>Logout</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
