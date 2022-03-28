import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps{
    showProfileData: boolean;
}

export function Profile ({showProfileData = true}: ProfileProps){
    return (
        <Flex alignItems="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Adriano de Abreu</Text>
                    <Text color="gray.300" fontSize="small">
                        adrianoabreu.wy@gmail.com
                    </Text>
                </Box>
            )}
            
            <Avatar size="md" name="Adriano de Abreu" src='http://github.com/adrianowy.png'/>

        </Flex>
    );
}