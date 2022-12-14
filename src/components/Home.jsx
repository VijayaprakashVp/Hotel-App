import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { FormikForm } from "./FormikForm";
import { Header } from "./Header";
import { LeftMenu } from "./LeftMenu";

export const Home = () => {
  return (
    <>
      <Box>
        <Header />
        <Box>
          <Grid templateColumns='20% 78%' gap={4}>
            <GridItem>
              <Box>
                <LeftMenu />
              </Box>
            </GridItem>
            <GridItem>
              <FormikForm />
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};
