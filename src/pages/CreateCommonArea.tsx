import {Box, Stack, Text} from '@chakra-ui/core'
import {useObserver} from 'mobx-react-lite'
import React from 'react'

export const CreateCommonArea: React.FC = () => {

    return useObserver(() => (
        <Stack as='main' maxWidth='800px' mx='auto' p='4'>
            <Box>
                <Text as='h2' fontSize='2em'>
                    Cadastro de área comum
                </Text>

                // eslint-disable-next-line
              {/*//  Show commonArea <CommonArea commonArea={this.state.commonArea} />*/}

                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                >
                </form>

            </Box>
        </Stack>
    ))
}
