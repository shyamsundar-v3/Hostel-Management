import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push(`/`)
    }
  }
  return (
    <Form onSubmit={submitHandler} inline className='hms-search'>
      <div style={{ position: 'relative' }}>
        <svg
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='rgba(255,255,255,0.35)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 2 }}
        >
          <circle cx='11' cy='11' r='8' />
          <line x1='21' y1='21' x2='16.65' y2='16.65' />
        </svg>
        <Form.Control
          type='text'
          value={keyword}
          name='q'
          placeholder='Search students...'
          className='hms-search__input'
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <Button className='hms-search__btn' type='submit'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
