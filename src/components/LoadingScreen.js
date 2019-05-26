import React from 'react'

import { LoaderContainer, TriangleContainer } from '../styles/styled-components/loader'

export default ({ overlay }) => (
  <LoaderContainer className={overlay && 'loader-overlay'}>
    <TriangleContainer>
      <span className='triangle tri-one' />
      <span className='triangle tri-two' />
      <span className='triangle tri-three' />
    </TriangleContainer>
    <h1>Loading...</h1>
  </LoaderContainer>
)
