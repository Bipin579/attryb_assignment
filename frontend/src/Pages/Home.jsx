import { Box, Button, Text } from "@chakra-ui/react";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../Redux/Auth/action";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  console.log(user);
  return (
    <Box
      m="30px"
      display={"flex"}
      justifyContent={"center"}
      flexDir={"column"}
      textAlign={"center"}
    >
      <Text fontSize={"3xl"} fontWeight={"bold"} textAlign={"center"}>
        Welcome {user}
      </Text>
      <Button onClick={logout} w="max-content" my="20px" m="auto">
        Logout
      </Button>
    </Box>
  );
};

export default Home;
