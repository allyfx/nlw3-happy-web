import React, { useState, useEffect } from 'react';

import {
    RouteProps as ReactRouteProps,
    Route as ReactRoute,
    Redirect,
} from 'react-router-dom';

interface RouteProps extends ReactRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

export default function Route({ component: Component, isPrivate = false, ...rest }: RouteProps) {
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        if (isPrivate) {
            const sessionToken = sessionStorage.getItem('@Happy:token');

            setToken(sessionToken !== null ? sessionToken : '');

            const localstorageToken = localStorage.getItem('@Happy:token');

            if (localstorageToken !== null) {
                return setToken(localstorageToken);
            }
        }
    }, [isPrivate]);

    return (
        <ReactRoute 
            {...rest}
            render={({ location }) => {
                return isPrivate === (token !== '') ? (
                    <Component />
                ) : (
                    <Redirect 
                        to={{
                            pathname: isPrivate ? '/' : '/dashboard',
                            state: { from: location }
                        }}
                    />
                )
            }}
        />
    );
}