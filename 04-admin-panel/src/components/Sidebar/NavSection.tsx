import { Box, Stack, Text } from "@chakra-ui/react";

interface NAvSectionProps{
    title: string;
    children: React.ReactNode;
}

export function NavSection({title, children}: NAvSectionProps){
    return (
        <Box>
            <Text fontWeight={"bold"} color="gray.400" fontSize="small">{title}</Text>
            <Stack spacing={4} mt="8" alignItems={'stretch'}>
                {children}
            </Stack>
        </Box>
    );
}