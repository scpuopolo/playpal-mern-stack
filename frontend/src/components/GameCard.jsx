import {
  Box,
  Heading,
  Text,
  HStack,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  VStack,
  ModalCloseButton,
  Button,
  ModalFooter,
  useToast,
  useDisclosure,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useGameStore } from "../store/game";
import { useState } from "react";

export const GameCard = ({ game }) => {
  const [updatedGame, setUpdatedGame] = useState(game);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteGame, updateGame } = useGameStore();
  const toast = useToast();
  const handleDeleteGame = async (id) => {
    const { success, message } = await deleteGame(id);
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
    }
  };
  const handleUpdateGame = async (id, updatedGame) => {
    const { success, _message } = await updateGame(id, updatedGame);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: "Failed to Update Game",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Game Updated Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Heading
        as={"h3"}
        size={"lg"}
        ml={4}
        mb={4}
        mt={2}
        mr={4}
        textAlign={"center"}
      >
        {game.title}
      </Heading>

      <Text
        fontWeight={"bold"}
        fontSize={"xl"}
        color={textColor}
        mb={4}
        ml={4}
        mr={4}
      >
        Players: {game.minPlayers}-{game.maxPlayers}
      </Text>

      <Text
        fontWeight={"bold"}
        fontSize={"xl"}
        color={textColor}
        mb={4}
        ml={4}
        mr={4}
      >
        Duration: {game.duration} min
      </Text>

      <HStack spacing={2}>
        <IconButton
          icon={<EditIcon />}
          size={"sm"}
          ml={4}
          mb={2}
          onClick={onOpen}
          colorScheme={"blue"}
        />
        <IconButton
          icon={<DeleteIcon />}
          size={"sm"}
          mb={2}
          mr={4}
          onClick={() => handleDeleteGame(game._id)}
          colorScheme={"red"}
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Game</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeHolder="Game Title"
                name="title"
                value={updatedGame.title}
                onChange={(e) =>
                  setUpdatedGame({ ...updatedGame, title: e.target.value })
                }
              />
              <Input
                placeHolder="Minimum Players"
                name="min-players"
                type="number"
                value={updatedGame.minPlayers}
                onChange={(e) =>
                  setUpdatedGame({ ...updatedGame, minPlayers: e.target.value })
                }
              />
              <Input
                placeHolder="Maximum Players"
                name="max-players"
                type="number"
                value={updatedGame.maxPlayers}
                onChange={(e) =>
                  setUpdatedGame({ ...updatedGame, maxPlayers: e.target.value })
                }
              />
              <Input
                placeHolder="Game Duration"
                name="duration"
                type="number"
                value={updatedGame.duration}
                onChange={(e) =>
                  setUpdatedGame({ ...updatedGame, duration: e.target.value })
                }
              />
              <Select
                placeholder="Select Game Type"
                onChange={(e) =>
                  setUpdatedGame({ ...updatedGame, gameType: e.target.value })
                }
              >
                <option value="Board Game">Board Game</option>
                <option value="Card Game">Card Game</option>
              </Select>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme={"blue"}
              mr={3}
              onClick={() => handleUpdateGame(game._id, updatedGame)}
            >
              Update
            </Button>
            <Button variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
