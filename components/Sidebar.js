import React from 'react'
import Link from "next/link"

const Sidebar = () => {
    return (
        <div className="sidebar_container" style={container}>
    
            <div style={menuContainer}>
                <div>
                    <Link href="/" passHref>
                        <p style={linkText}>Dashboard</p>
                    </Link>
                </div>

                <div>
                    <Link href="/students" passHref>
                       <p style={linkText}>Students</p> 
                    </Link>
                </div>

                <div>
                    <Link href="/subjects" passHref>
                        <p style={linkText}>Subjects</p> 
                    </Link>
                </div>

                <div>
                    <Link href="/assign_subjects_to_student" passHref>
                        <p style={linkText}>Assign Subject to Student</p> 
                    </Link>
                </div>

                <div>
                    <Link href="/subject_with_student" passHref>
                       <p style={linkText}>Subject List with Students</p> 
                    </Link>
                </div>
            </div>
    
        </div>
    )
}

const container = {
    backgroundColor: '#9A9696',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const menuContainer = {
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '60%',
    margin: '0 auto'
    
}

const linkText = {
    color: '#fff',
    fontSize: '30px',
    fontFamily: "Red Hat Text",
    fontWeight: '700',
    cursor: 'pointer',
    textAlign: 'left',
    margin: '15px 0'
}



export default Sidebar
