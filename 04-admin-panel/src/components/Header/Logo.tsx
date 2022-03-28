import { Text } from "@chakra-ui/react";

export function Logo(){
    return (
        <Text
            fontSize={["2xl", "3xl", "4xl"]}
            fontWeight={'bold'}
            letterSpacing="tight"
            w="64"
        >
            dashgo
            <Text as="span" marginLeft="1" color="pink.500">.</Text>
        </Text>
    );
}