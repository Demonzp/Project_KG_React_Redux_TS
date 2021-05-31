import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Spinner from '../components/Spinner/Spinner';
import { routeNames } from '../types/routeNames';
import useAuth from '../hooks/useAuth';

type Props = {
  path: string;
  component: any;
}

const GuestRoute: React.FC<Props> = ({ component: Component, ...rest }) => {

  const { authAttempted, user } = useAuth();

  return (
    <Route
      children={({ location }) => (
        authAttempted
          ?
          (
            !user
              ?
              <Component {...rest} />
              :
              <Redirect
                to={{
                  pathname: routeNames.EMPLOYEES,
                  state: { from: location }
                }}
              />
          )
          :
          <Spinner />
      )}
    />
  );
}

export default GuestRoute;