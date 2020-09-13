import React from 'react'
import styled from 'styled-components'

import './themed'

export const App = () => {
  return <Container>this is my first ts-react-app</Container>
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: indianred;
  font-weight: bold;
  font-size: 50px;
`
