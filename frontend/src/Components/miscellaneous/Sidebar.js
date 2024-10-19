import { Box, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";



const Sidebar = ({handleClick, content}) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [requestExists, setRequestExists] = useState(false);
  const [toggle, setToggle] = useState("none")

  useEffect(() => {

    
    const checkRequest = async () => {

      setLoading(true);

      const userInformation = JSON.parse(
        localStorage.getItem("userInformation")
      );
      if (userInformation && userInformation.email) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "User-Email": userInformation.email,
            },
          };
          const { data } = await axios.get("/api/req/check-request", config);

          if(data){
              setRequestExists(data.exists);
              setToggle("one")
          }
        } catch (error) {
          console.error("Error checking request:", error);
        }finally {
            setLoading(false);}
      }
      else{
        setLoading(false);
      }
    };

    checkRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const oneToggle = () => {
    if(toggle !== "one"){
        setToggle("one")
    }
  }

  const twoToggle = () => {
    if(toggle !== "two"){
        setToggle("two")
    }
  }
  
  const accessRequest = async () => {
    if(!requestExists){
        history.push("/form");
        setLoading(false);
    }
    else{
        twoToggle()
        if (content === "renderEntries") {
            handleClick();
    }
  };
}

  const accessTable = async () => {
    oneToggle()
    if (content === "renderMyrequest") {
        handleClick();
    }
  }

  return (
    <Box className="sidebar">
      <Button
        colorScheme={toggle === "one" ? "blue" : "gray"}
        width={"80%"}
        onClick={accessTable}
        isLoading={loading}
      >
        Show Entries
      </Button>
      <Button
        colorScheme={toggle === "two" ? "blue" : "gray"}
        width={"80%"}
        onClick={accessRequest}
        style={{ marginTop: 15 }}
        isLoading={loading}
      >
        { requestExists ? "Show my request" : "Make a request"}
      </Button>
    </Box>
  );
};

export default Sidebar;
