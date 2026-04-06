import React from 'react'
import { Container } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='hms-footer'>
      <Container>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()} Hostel Management System &middot; All rights reserved
        </p>
      </Container>
    </footer>
  )
}

export default Footer
