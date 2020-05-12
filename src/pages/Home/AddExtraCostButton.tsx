import { Button } from '@chakra-ui/core'
import React from 'react'
import { MdFitnessCenter } from 'react-icons/md'

declare global {
    interface Navigator {
        wakeLock: any
    }
}

export const AddExtraCostButton = React.memo(() => {
    return (
        <Button
            leftIcon={MdFitnessCenter}
            id='ios-speak'
            type='submit'
            variantColor='teal'
        >
            Novo Custo Extra
        </Button>
    )
})
