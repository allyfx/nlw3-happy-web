import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Route from './components/Route';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';

import Login from './pages/admin/Login';
import ForgotPassword from './pages/admin/ForgotPassword';
import ResetPassword from './pages/admin/ResetPassword';

import Dashboard from './pages/admin/dashboard/Dashboard';
import EditPendingOrphanage from './pages/admin/dashboard/EditPendingOrphanage';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing} />
            <Route path="/app" component={OrphanagesMap} />

            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanages/:id" component={Orphanage} />

            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />

            <Route path="/dashboard" component={Dashboard} isPrivate />
            <Route path="/pending/edit-orphanage/:id" component={EditPendingOrphanage} isPrivate />
        </BrowserRouter>
    );
}

export default Routes;