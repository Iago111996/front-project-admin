import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

//IMPORT ADMIN
import Dashboard from '../pages/admin/dashboard/index';

import Mercants from '../pages/admin/merchants/index';
import MercantsEdit from '../pages/admin/merchants/merchants.edit';
import MercantsRegister from '../pages/admin/merchants/merchants.register.js';

import Requests from '../pages/admin/requests/index';
import RequestsEdit from '../pages/admin/requests/requests.edit';
import RequestsRegister from '../pages/admin/requests/requests.register.js';

import Users from '../pages/admin/users/index';
import UsersEdit from '../pages/admin/users/users.edit';
import UsersRegister from '../pages/admin/users/users.register.js';



//IMPORT CLIENT
import Home from '../pages/client/home/index';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                 {/**rout client*/}
                <Route path='/' exact component={Home} />

                 {/**rout client*/}
                 <Route path='/admin' exact component={Dashboard} />
                 <Route path='/admin/merchants' exact component={Mercants} />
                 <Route path='/admin/merchants/register' exact component={MercantsRegister} />
                 <Route path='/admin/merchants/edit/:idMerchant' exact component={MercantsEdit} />

                 <Route path='/admin/requests' exact component={Requests} />
                 <Route path='/admin/requests/register' exact component={RequestsRegister} />
                 <Route path='/admin/requests/edit/:idRequest' exact component={RequestsEdit} />

                 <Route path='/admin/users' exact component={Users} />
                 <Route path='/admin/users/register' exact component={UsersRegister} />
                 <Route path='/admin/users/edit/:idUser' exact component={UsersEdit} />
            </Switch>
        </BrowserRouter>
    );
};
