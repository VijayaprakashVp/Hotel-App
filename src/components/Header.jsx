import React from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import HOTEL from "../assets/HOTEL.png";
import TEAM from "../assets/TEAM.png";
import Sneha from "../assets/sneha logo red 1.png";
import { HamburgerIcon } from "@chakra-ui/icons";
import { SideBar } from "./SideBar";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      display={"flex"}
      textAlign={"center"}
      paddingTop={"1%"}
      paddingBottom={"1%"}
      justifyContent={"center"}
      bgColor={"#E2E2E2"}>
      <HStack>
        <Image src={Sneha} alt='' />
        <Image src={HOTEL} alt='' />
        <Image src={TEAM} alt='' />

        <Box display={{ lg: "none", sm: "block" }}>
          <Button colorScheme='blue' onClick={onOpen}>
            <HamburgerIcon fontSize={"36px"} cursor={"pointer"} />
          </Button>
          <Drawer onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
              <DrawerBody>
                <SideBar />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </HStack>
    </Box>
  );
};
