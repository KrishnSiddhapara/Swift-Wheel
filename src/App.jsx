import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserRoute from './routes/UserRoute'
import AdminRoute from './routes/AdminRoute'
import SellerRoute from './routes/SellerRoute'
import NotFound from './pages/NotFound'

import Login from './pages/user/Login'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/*' element={<UserRoute />} />
        <Route path='/seller/*' element = {<SellerRoute />}/>
        <Route path='/admin/*' element = {<AdminRoute />}/>

        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App