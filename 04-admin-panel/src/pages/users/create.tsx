import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitErrorHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
    nome: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  const createUserFormSchema = yup.object().shape({
    nome: yup.string().required('Nome obrigatório'),
    email: yup.string().email().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        yup.ref('password'), 
        null
    ], 'As senhas não conferem'),
});

export default function CreateUser() {

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema),
    });

    const { errors } = formState;

    const handleCreateUser: SubmitErrorHandler<CreateUserFormData> = async (values) => {

        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log(values);
    }
    
    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    backgroundColor="gray.800"
                    p={["6","8"]}
                    onSubmit={handleSubmit(handleCreateUser)}
                >
                    <Heading size="lg" fontWeight="normal">Criar Usuários</Heading>
                    
                    <Divider my="6" borderColor="gray.700" />
                    
                    <VStack spacing={8}>
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input
                              name="nome"
                              label="Nome Completo"
                              error={errors.nome}
                              {...register('nome')}
                            />
                            
                            <Input
                              name="email"
                              type="email"
                              label="E-mail"
                              error={errors.email}
                              {...register('email')}
                            />
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input
                              name="password"
                              type="password"
                              label="Senha"
                              error={errors.password}
                              {...register('password')}
                            />

                            <Input
                              name="password_confirmation"
                              type="password"
                              label="Confirmação da Senha"
                              error={errors.password_confirmation}
                              {...register('password_confirmation')}
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justifyContent="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>

            </Flex>
        </Box>
    )
}