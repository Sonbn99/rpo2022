import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import NavigationBar from './components/NavigationBar';
import Home from "./components/Home"
import Login from './components/Login';
import Utils from './utils/Utils';
import { connect } from 'react-redux';
import SideBar from './components/SideBar';
import CountryList from './components/CountryList';
import Country from './components/Country';
import ArtistList from './components/ArtistList';
import Artist from './components/Artist';
import MuseumList from './components/MuseumList';
import Museum from './components/Museum';
import UserList from './components/UserList';
import User from './components/User';
import PaintingList from './components/PaintingList';
import Painting from './components/Painting';
import Account from './components/Account';

const ProtectedRoute = ({ children }) => {
    let user = Utils.getUser();
    return user ? children : <Navigate to={'/login'} />
}
const App = props => {
    const [exp, setExpanded] = useState(true);
    return (
        <div className="App">
            <BrowserRouter>
                <NavigationBar toggleSideBar={() => setExpanded(!exp)} />
                <div className='wrapper'>
                    <SideBar expanded={exp} />
                    <div className='container-fluid'>
                        {props.error_message &&
                            <div className="alert alert-danger m-1">{props.error_message}</div>}
                        <Routes>
                            <Route path="login" element={<Login />} />
                            <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                            <Route path="countries" element={<ProtectedRoute><CountryList /></ProtectedRoute>} />
                            <Route path="countries/:id" element={<ProtectedRoute><Country /></ProtectedRoute>} />
                            <Route path="artists" element={<ProtectedRoute><ArtistList /></ProtectedRoute>} />
                            <Route path="artists/:id" element={<ProtectedRoute><Artist /></ProtectedRoute>} />
                            <Route path="museums" element={<ProtectedRoute><MuseumList /></ProtectedRoute>} />
                            <Route path="museums/:id" element={<ProtectedRoute><Museum /></ProtectedRoute>} />
                            <Route path="users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
                            <Route path="users/:id" element={<ProtectedRoute><User /></ProtectedRoute>} />
                            <Route path="paintings" element={<ProtectedRoute><PaintingList /></ProtectedRoute>} />
                            <Route path="paintings/:id" element={<ProtectedRoute><Painting /></ProtectedRoute>} />
                            <Route path="account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}
function mapStateToProps(state) {
    const { msg } = state.alert;
    return { error_message: msg }
}
export default connect(mapStateToProps)(App);