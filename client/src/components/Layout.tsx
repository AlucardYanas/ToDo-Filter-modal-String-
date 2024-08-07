import React from 'react'
import {Container} from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

export default function Layout(): JSX.Element {
  return (
    <Container maxW='container.xl'>
      <Outlet/>
    </Container>
  )
}
