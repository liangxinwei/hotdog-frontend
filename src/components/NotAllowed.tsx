import React, { useEffect } from 'react'
import styled from 'styled-components'

import { $t } from '@/locales/LocaleProvider'

export const NotAllowed: React.FC = () => {
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    window.document.title = $t('无访问权限')
  })
  return (
    <Container>
      <Message>{$t('无访问权限')}</Message>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
const Message = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  color: #62646d;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  transform: translate(-50%, -50%);
`
