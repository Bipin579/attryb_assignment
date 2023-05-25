import { useToast } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const toast = useToast();

  if (!user) {
    toast({
      title: "Please login first",
      status: "error",
      duration: 3000,
      position: "top",
      isClosable: true,
    });

    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
