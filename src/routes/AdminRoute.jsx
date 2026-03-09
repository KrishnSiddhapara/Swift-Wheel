import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from '../components/Layout'
import Home from '../pages/user/Home'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'


const AdminRoute = () => {
    return (
    < Routes >
        <Route element={<Layout />}>
            <Route path='/' index element={<Home />} />
        </Route>
      </Routes >
  )
}

export default AdminRoute