import {Button, Flex, Stack} from '@chakra-ui/react'
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import { Input } from '../components/Form/Input'

type SignInFormData = {
  email: string;
  password: string;
}


export default function SignIn() {

  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const handleSignIn: SubmitErrorHandler<SignInFormData> = async (values) => {

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
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
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >

        <Stack spacing={4}>
          <Input
            name="email"
            label="E-mail"
            type="email"
            error={errors.email}
            {...register('email', {required: 'E-mail is obrigatorio'})}
            />
          <Input
            name="password"
            label="Senha"
            type="password"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type='submit'
          mt="6"
          colorScheme={'pink'}
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>

      </Flex>
    </Flex>
  )
}
