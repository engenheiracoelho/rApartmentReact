import {Box, Stack, Text} from '@chakra-ui/core'
import {useObserver} from 'mobx-react-lite'
import React, {Component} from 'react'

export const ListCommonArea: React.FC = () => {

    return useObserver(()=> (
        <Stack as='main' maxWidth='800px' mx='auto' p='4'>
            <Text as='h1' fontSize='xl' fontWeight='bold'>
                About
            </Text>
            <Text as='h5' fontSize='xl' fontWeight='bold'><h5>{ListCommonArea.name}</h5></Text>
        </Stack>
    ))
}