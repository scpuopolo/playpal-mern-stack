import {
  Container,
  Heading,
  Box,
  Input,
  VStack,
  Select,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGameStore } from "../store/game";
import { colors } from "../components/ui/colors";

const AddPage = () => {
  const [newGame, setNewGame] = useState({
    title: "",
    minPlayers: "",
    maxPlayers: "",
    duration: "",
    gameType: "",
  });

  const { addGame } = useGameStore();

  const toast = useToast();

  const handleAddGame = async () => {
    const { success, message } = await addGame(newGame);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setNewGame({
        title: "",
        minPlayers: "",
        maxPlayers: "",
        duration: "",
        gameType: "",
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={8}
          color={useColorModeValue(`${colors.lightBlue}`, `${colors.purple}`)}
        >
          Add a Game
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeHolder="Game Title"
              name="title"
              value={newGame.title}
              onChange={(e) =>
                setNewGame({ ...newGame, title: e.target.value })
              }
            />
            <Input
              placeHolder="Minimum Players"
              name="min-players"
              value={newGame.minPlayers}
              type="number"
              onChange={(e) =>
                setNewGame({ ...newGame, minPlayers: e.target.value })
              }
            />
            <Input
              placeHolder="Maximum Players"
              name="max-players"
              value={newGame.maxPlayers}
              type="number"
              onChange={(e) =>
                setNewGame({ ...newGame, maxPlayers: e.target.value })
              }
            />
            <Input
              placeHolder="Game Duration (minutes)"
              name="duration"
              value={newGame.duration}
              type="number"
              onChange={(e) =>
                setNewGame({ ...newGame, duration: e.target.value })
              }
            />
            <Select
              placeholder="Select Game Type"
              value={newGame.gameType}
              onChange={(e) =>
                setNewGame({ ...newGame, gameType: e.target.value })
              }
            >
              <option value="Board Game">Board Game</option>
              <option value="Card Game">Card Game</option>
            </Select>
            <Button colorScheme={"blue"} onClick={handleAddGame}>
              Add Game
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default AddPage;
