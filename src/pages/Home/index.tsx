import {Box, Stack, Text} from '@chakra-ui/core'
import {useObserver} from 'mobx-react-lite'
import React from 'react'
import {AddExtraCostButton} from "./AddExtraCostButton";

export const Home: React.FC = () => {

  return useObserver(() => (
    <Stack as='main' maxWidth='800px' mx='auto' p='4'>
      <Box>
        <Text as='h2' fontSize='2em'>
          Cadastro de área comum
        </Text>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <AddExtraCostButton />
        </form>
      </Box>
    </Stack>
  ))
}
