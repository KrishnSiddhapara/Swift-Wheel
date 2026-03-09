import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return <>
    <Nav />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
}

export default Layout