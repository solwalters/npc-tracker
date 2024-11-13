import { NavLink } from "react-router-dom";
import { useUser } from '../lib/customHooks';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const NavBar = () => {
  const { user, authenticated } = useUser();
  const isLoggedIn = user !== null;
  return (
    <nav>
      <ButtonGroup>
        <Button component={NavLink} to="/">Home</Button>
        {/* Unauthenticated User Menu */}
        {!isLoggedIn && <Button component={NavLink} to="/register">Register</Button>}
        {!isLoggedIn && <Button component={NavLink} to="/login">Login</Button>}
        {/* Logged In Menu */}
        {isLoggedIn && <Button component={NavLink} to="/authorized">AUTHORIZED ONLY</Button>}
        {isLoggedIn && <Button component={NavLink} to="/worlds">Worlds</Button>}
        {isLoggedIn && <Button component={NavLink} to="/logout">Log Out</Button>}
      </ButtonGroup>
    </nav>
  );
};

export default NavBar;

