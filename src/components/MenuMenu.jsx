import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ButtonComp } from "./ButtonComp";
import data from "../data/Sidebar.json";

export const MenuMenu = () => {
  return (
    <div>
      <Box>
        <Box
          bgColor={"#373737"}
          display={"flex"}
          flexDirection={"column"}
          pl={"7%"}
          pt={"5%"}>
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <ButtonComp
              Children={"Add Cutomer"}
              widthL='90%'
              color={"#E45159"}></ButtonComp>
            <ButtonComp
              Children={"Daily Indents"}
              widthL='90%'
              color={"#18B83B"}></ButtonComp>
          </Box>
          <Box
            mt={4}
            borderRadius='8px'
            border='1px solid #E45159'
            w='90%'
            dispaly='flex'
            justifyContent='center'>
            {data.map((item, index) => (
              <Box mt='15px'>
                <Text
                  color='#ffff'
                  key={index}
                  mb='4px'
                  textAlign='left'
                  ml='30px'
                  marginBottom='10px'>
                  {item.name}
                </Text>
                {item.subdata.length !== 0 &&
                  item.subdata.map((ele, index) => (
                    <Accordion defaultIndex={[1]} allowMultiple color='white'>
                      <AccordionItem borderStyle='none'>
                        <h2>
                          <AccordionButton>
                            <Box ml={10}>{ele.name}</Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          pb={4}
                          d='flex'
                          flexDirection='column'
                          ml={10}>
                          {ele.data.map((item) => {
                            return (
                              <Text pr={4} mt={1}>
                                {item.val}
                              </Text>
                            );
                          })}
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                    // <>
                    //   <Text>{ele.name}</Text>
                    //   <Text>{ele.data}</Text>
                    // </>
                  ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

// if (e.AdditionalData.length > 0) {
//   console.log("e.AdditionalData", e.AdditionalData);
//   {
//     e.AdditionalData.map((item) => {
//       if (item.name !== undefined) console.log("eachitem:", item.name);
//       <p>{item.name}</p>;
//       item.data.map((eachItem) => {
//         console.log("eachInnItem", eachItem.name);
//       });
//     });
//   }
// }
