import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode } from "./ui/color-mode";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useProductStore } from "../store/product";



const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  useProductStore
  return (
  <Container maxW={"1140px"} p={4} >
    <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ 
            base: "column", 
            sm: "row" 
        }}
    >
        <Text 
            fontSize={{ base: "22", sm: "28" }} 
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient="to-r" gradientFrom="cyan.400" gradientTo="blue.500"
            bgClip={"text"}
        >
            <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>            
            <Link to={"/create"}>
                <Button>                
                    <CiSquarePlus />                
                </Button>
            </Link>
            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
            </Button>
        </HStack>
    </Flex>
  </Container>
  )
}

export default Navbar