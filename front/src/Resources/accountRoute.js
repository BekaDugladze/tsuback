import React from 'react';
import Account from './account';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './profile';

function AccountRoute(){
    return (
        <Router>
            <Routes>
                <Route path="/account" element={<Account />} />
                <Route path="/account/profile" element={<Profile />} />
            </Routes>
        </Router>
    )
}

export default AccountRoute