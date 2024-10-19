import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, Button, MenuButton, Avatar, MenuList, MenuItem } from "@chakra-ui/react";
import { ReqState } from "../../Context/requestProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";

const Navbar = () => {

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
      };

    const {user} = ReqState();
    const history = useHistory();

  return (
    <div>
      <div className="navbar">
        <div className="nav"></div>
        <div className="nav box1">Connect Now</div>
        <div className="nav">
          <Menu >
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} m={2}>
              <Avatar size="sm" cursor = "pointer" name={user.name} src={user.pic}/>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
                <MenuItem onClick={logoutHandler}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
