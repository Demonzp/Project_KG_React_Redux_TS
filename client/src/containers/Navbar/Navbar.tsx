import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

import cssStyles from './Navbar.module.css';

import Homepage from '../../components/Home';
import EmployeePage from '../EmployeePage';
import Signin from '../Signin';
import Signup from '../Signup';
import GuestRoute from '../../middlewares/guest';
import UserRoute from '../../middlewares/user';
import Spinner from '../../components/Spinner';
import useAuth from '../../hooks/useAuth';
import {routeNames} from '../../types/routeNames';
import UnknownRoute from '../../middlewares/unknown';
import Unknown from '../404';

const Navbar = () => {

  const { authAttempted, user, signout,  isLoading} = useAuth();

  return (
    <Router>
      <nav className={cssStyles.nav}>
        <h3>Project_KG</h3>
        <ul className={cssStyles.navLinks}>
          <Link className={cssStyles.navRefs} to={routeNames.HOME}>
            <li>Homepage</li>
          </Link>
          {authAttempted && !isLoading?
            <React.Fragment>
              {user ?
                <React.Fragment>
                  <Link className={cssStyles.navRefs} to={routeNames.EMPLOYEES}>
                    <li>Employees</li>
                  </Link>
                  <Link className={cssStyles.navRefs} to={routeNames.HOME} onClick={signout}>
                    <li>SignOut</li>
                  </Link>
                </React.Fragment> :
                null
              }
              {!user ?
                <React.Fragment>
                  <Link className={cssStyles.navRefs} to={routeNames.SIGNIN}>
                    <li>SignIn</li>
                  </Link>
                  <Link className={cssStyles.navRefs} to={routeNames.SIGNUP}>
                    <li>SignUp</li>
                  </Link>
                </React.Fragment> :
                null
              }
            </React.Fragment> :
            <Spinner />
          }
        </ul>
      </nav>

      <Switch>
        <Route exact path={routeNames.HOME} component={Homepage} />
        <UserRoute path={routeNames.EMPLOYEES} component={EmployeePage} />
        <GuestRoute path={routeNames.SIGNIN} component={Signin} />
        <GuestRoute path={routeNames.SIGNUP} component={Signup} />
        <UnknownRoute component={Unknown} />
      </Switch>
    </Router>
  );
};

export default Navbar;