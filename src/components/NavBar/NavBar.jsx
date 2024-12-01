// src/components/NavBar/NavBar.jsx
import {Link} from 'react-router-dom'
const NavBar = (props) => {
  return (
{ user ? 
    <ul>
      <li><Link to='/'>HOME</Link></li>
      <li><Link to='/hoots'>HOOTS</Link></li>
      <li><Link to="/hoots/new">NEW HOOT</Link></li>
      <li><Link to='' onClick={handleSignout}>SIGN OUT</Link></li>
    </ul>
  : null }

)}