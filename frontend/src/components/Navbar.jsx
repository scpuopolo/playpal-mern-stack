import { Container, Flex, Text, HStack, Button, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PlusSquareIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { colors } from '../components/ui/colors';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"container.xl"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "30", sm: "36" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={`linear(to-r, ${colors.purple}, ${colors.lightBlue})`}
          bgClip={"text"}
        >
          <Link to={"/"}>PlayPal</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/add"}>
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <MoonIcon size={20} />
            ) : (
              <SunIcon size={20} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
