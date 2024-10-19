import React, { useEffect } from "react";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";
import {
  Box,
  Container,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

const Homepage = () => {

      const history = useHistory();
    
    useEffect(() => {
        const userInformation = JSON.parse(localStorage.getItem("userInformation"));
    
        if (!userInformation) history.push("/");
      }, [history]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0px"
        borderRadius="lg"
        borderWidth="2px"
        borderColor={"darkblue"}
      >
        <Text fontSize={"4xl"} fontWeight={"600"} color={"darkblue"}>
          Connect Now
        </Text>
      </Box>
      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        color="black"
        borderWidth={"2px"}
        marginBottom={"40px"}
        borderColor={"darkblue"}
      >
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width={"50%"}>Log In</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
