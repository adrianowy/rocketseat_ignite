import { Box, Button, Flex, Heading, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

export default function UserList() {
    return (
        <Box>
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} backgroundColor="gray.800" p="8">
                    <Flex mb="8" justifyContent={'space-between'} alignContent={'center'}>
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>

                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="pink"
                          leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                        >
                            Criar novo
                        </Button>
                    </Flex>

                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px="6" color="gray.300" width="8">
                                    <Checkbox colorScheme={'pink'} />
                                </Th>
                                <Th>Usuário</Th>
                                <Th>Data de Cadastro</Th>
                                <Th width={"8"}></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>
                                    <Checkbox colorScheme={'pink'} />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Adriano de Abreu</Text>
                                        <Text fontSize="sm" color="gray.300">adrianoabreu.wy@gmail.com</Text>
                                    </Box>
                                </Td>
                                <Td>
                                    04 de Abril, 2021
                                </Td>
                                <Td>
                                    <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="purple"
                                    leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                                    >
                                        Editar
                                    </Button>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>

            </Flex>
        </Box>
    )
}