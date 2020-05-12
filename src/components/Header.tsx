import { Box, Flex, Heading, Link as ChakraLink } from '@chakra-ui/core'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

declare module '@chakra-ui/core' {
  interface ILink {
    as: NavLink
  }
}

export const Header: React.FC = (props) => {
  const MyLink = ChakraLink as any
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding='1rem'
      bg='teal.500'
      color='white'
      {...props}
    >
      <Flex align='center' mr={5}>
        <Heading as='h1' size='lg' letterSpacing={'-.1rem'}>
          <Link to='/'>rApartment</Link>
        </Heading>
      </Flex>
      <Box display='flex' width='auto' alignItems='center' flexGrow={1}>
        <MyLink as={NavLink} to='/commonArea' ml='4'>
          Área comum
        </MyLink>
      </Box>
    </Flex>
  )
}
