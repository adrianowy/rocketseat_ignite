import {Button, Flex, Stack} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'


export default function SignIn() {

  const { register, handleSubmit } = useForm();

  function handleSignIn(){
    
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Flex
        as='form' 
        width="100%" 
        maxWidth={360}
        backgroundColor='gray.800'
        p={8}
        borderRadius={8}
        flexDir={'column'}
      >

        <Stack spacing={4}>
          <Input name='email' label='E-mail' type={'email'} />
          <Input name='password' label='Senha' type={'password'} />
        </Stack>

        <Button type='submit' mt="6" colorScheme={'pink'}>
          Entrar
        </Button>

      </Flex>
    </Flex>
  )
}
