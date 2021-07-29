import React from 'react'
import Sidebar from './Sidebar'
import HeadSection from './HeadSection'

const Layout = ({children}) => {
    return (
        // <div className="layout_container">
        //     {children}
        // </div>
        <>
            <HeadSection/>
            <div style={main_container}>
                <Sidebar/>
                {children}
            </div>
        </>
        
    )
}

const main_container = {
    display: 'grid',
    gridTemplateColumns: '1fr 4fr',
    height: '100vh',
    overflow: 'hidden',
  }

export default Layout
