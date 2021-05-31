import React from 'react';
import { Route } from 'react-router-dom';

type Props = {
  component: any;
}

const UnknownRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    return (
        <Route
            children={() => (
                <Component {...rest}/>
            )}
        />
    );
}

export default UnknownRoute;