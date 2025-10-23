import {
  Container,
  Text,
  SimpleGrid,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Checkbox,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useGameStore } from "../store/game";
import { useEffect } from "react";
import { GameCard } from "../components/GameCard";
import { useState } from "react";
import { colors } from "../components/ui/colors";

const HomePage = () => {
  const { fetchGames, games } = useGameStore();

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const [checkedItems, setCheckedItems] = useState([true, true]);
  const [filter, setFilter] = useState({
    boardChecked: true,
    cardChecked: true,
  });

  const resetFilter = () => {
    setFilter({ boardChecked: true, cardChecked: true });
    setCheckedItems([true, true]);
  };

  const filterGames = () => {
    return games.filter((game) => {
      const gameMinPlayers = parseInt(game.minPlayers);
      const gameMaxPlayers = parseInt(game.maxPlayers);
      const gameDuration = parseInt(game.duration);

      // Players filter
      if (
        typeof filter.minPlayers === "number" &&
        !isNaN(filter.minPlayers) &&
        filter.minPlayers > gameMaxPlayers
      ) {
        return false;
      }
      if (
        typeof filter.maxPlayers === "number" &&
        !isNaN(filter.maxPlayers) &&
        filter.maxPlayers < gameMinPlayers
      ) {
        return false;
      }
      if (
        typeof filter.minDuration === "number" &&
        !isNaN(filter.minDuration) &&
        filter.minDuration > gameDuration
      ) {
        return false;
      }
      if (
        typeof filter.maxDuration === "number" &&
        !isNaN(filter.maxDuration) &&
        filter.maxDuration < gameDuration
      ) {
        return false;
      }
      if (
        (typeof filter.boardChecked === "boolean" ||
          typeof filter.cardChecked === "boolean") &&
        !(
          (filter.boardChecked && game.gameType === "Board Game") ||
          (filter.cardChecked && game.gameType === "Card Game")
        )
      ) {
        return false;
      }

      return true;
    });
  };

  return (
    <Container maxW={"container.xl"} pb={12}>
      <Text
        fontSize={"40"}
        fontWeight={"bold"}
        color={useColorModeValue(`${colors.lightBlue}`, `${colors.purple}`)}
        textAlign={"center"}
        mb={8}
      >
        Your Games
      </Text>

      <Flex
        alignItems="flex-start"
        justifyContent="flex-start"
        flexDir={{ base: "column", md: "row" }}
        gap={8}
        w="full"
      >
        <Box
          w={{ base: "100%", md: "240px" }}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
          mb={{ base: 8, md: 0 }}
        >
          <Flex
            flexDir={{ base: "row", md: "column" }}
            flexWrap={{ base: "wrap", md: "nowrap" }}
            gap={4}
            align={{ base: "center", md: "stretch" }}
          >
            <Flex align="center" gap={4}>
              <Text fontSize="20" fontWeight="bold" textAlign="left">
                Minimum Players:
              </Text>
              <NumberInput
                size="sm"
                maxW={20}
                defaultValue={1}
                min={1}
                onChange={(value) =>
                  setFilter({ ...filter, minPlayers: parseInt(value) })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Flex align="center" gap={4}>
              <Text fontSize="20" fontWeight="bold" textAlign="left">
                Maximum Players:
              </Text>
              <NumberInput
                size="sm"
                maxW={20}
                defaultValue={6}
                min={1}
                onChange={(value) =>
                  setFilter({ ...filter, maxPlayers: parseInt(value) })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Flex align="center" gap={4}>
              <Text fontSize="20" fontWeight="bold" textAlign="left">
                Minimum Duration:
              </Text>
              <NumberInput
                size="sm"
                maxW={20}
                defaultValue={0}
                min={0}
                step={5}
                onChange={(value) =>
                  setFilter({ ...filter, minDuration: parseInt(value) })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Flex align="center" gap={4}>
              <Text fontSize="20" fontWeight="bold" textAlign="left">
                Maximum Duration:
              </Text>
              <NumberInput
                size="sm"
                maxW={20}
                defaultValue={60}
                min={0}
                step={5}
                onChange={(value) =>
                  setFilter({ ...filter, maxDuration: parseInt(value) })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Flex align="center" gap={4}>
              <Text fontSize="20" fontWeight="bold">
                Game Type:
              </Text>
              <Checkbox
                size="sm"
                isChecked={checkedItems[0]}
                onChange={(e) => {
                  setFilter({ ...filter, boardChecked: e.target.checked });
                  setCheckedItems([e.target.checked, checkedItems[1]]);
                }}
              >
                Board Game
              </Checkbox>
              <Checkbox
                size="sm"
                isChecked={checkedItems[1]}
                onChange={(e) => {
                  setFilter({ ...filter, cardChecked: e.target.checked });
                  setCheckedItems([checkedItems[0], e.target.checked]);
                }}
              >
                Card Game
              </Checkbox>
            </Flex>
            <Flex w="100%" justify="center" mt={4}>
              <Button colorScheme={"gray"} onClick={resetFilter}>
                Clear Filters
              </Button>
            </Flex>
          </Flex>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} flex="1">
          {filterGames().map((game) => (
            <GameCard key={game._id} game={game} />
          ))}
        </SimpleGrid>
      </Flex>

      {games.length === 0 && (
        <Text
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}
        >
          No Games Found{" "}
          <Link to={"/add"}>
            <Text
              as={"span"}
              color={`${colors.darkBlue}`}
              _hover={{ textDecoration: "underline" }}
            >
              Add a Game
            </Text>
          </Link>
        </Text>
      )}
    </Container>
  );
};

export default HomePage;
