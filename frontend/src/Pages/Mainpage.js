import React, { useState } from "react";
import { ReqState } from "../Context/requestProvider";
import Navbar from "../Components/miscellaneous/Navbar";
import Sidebar from "../Components/miscellaneous/Sidebar";
import ReqTable from "../Components/miscellaneous/ReqTable";
import { Box } from "@chakra-ui/react";


const Mainpage = () => {
  const { user} = ReqState();
  const [content, setContent] = useState('renderEntries');

  const handleClick = () =>{
    if(content === "renderEntries"){
        setContent("renderMyrequest")
    }
    else{
        setContent('renderEntries')
    }
  }

  return (
    <div style={{ width: "100%" }}>
      {user && <Navbar></Navbar>}
      <Box display="flex" justifyContent="center" maxW="100vw" padding={"0vw 1vw"} marginBottom={"1.5vh"}>
        {user && <Sidebar content = {content} handleClick={handleClick}></Sidebar>}
        {user && <ReqTable content={content}></ReqTable>}
      </Box>
    </div>
  );
};

export default Mainpage;
 