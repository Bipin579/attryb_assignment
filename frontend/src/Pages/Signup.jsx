import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../Redux/Auth/action";
import { FcGoogle } from "react-icons/fc";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaSpinner } from "react-icons/fa";

const Signup = () => {
  // hide show passs
  const [showPassword, setShowPassword] = useState(false);
  const [showC, setCPassword] = useState(false);

  // input states
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let toast = useToast();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  let newToastSucess = (message) => {
    return toast({
      title: message,
      description: `Welcome ${email}`,
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };
  let newToastFail = () => {
    return toast({
      title: "Unable to create Account.",
      status: "error",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  const navigateUser = () => {
    navigate("/login");
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && password === confirmPassword) {
      let user = {
        email,
        password,
      };
      dispatch(signup(user, newToastSucess, newToastFail,navigateUser));
    } else {
      return toast({
        title: "Please fill all credentials",
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      bgImg="url(https://img.freepik.com/free-vector/panoramic-view-foliage-tropical-forest-trees_23-2148271242.jpg?w=900&t=st=1684046136~exp=1684046736~hmac=a9ed07015f1837c93209f1bbed516888825036a30db68ab15b1b76aa44c04a3e)"
      bgPos="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      maxH={"100vh"}
    >
      <Box
        bg="rgb(0,0,0,0)"
        p={12}
        maxW={{ base: "90vw", md: "500px" }}
        borderRadius="lg"
        border="2px solid white"
        textAlign="center"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        backdropFilter="blur(8px)"
        opacity="0.9"
      >
        <Box align="center" justify="center">
          <Image
            src="https://attryb.com/assets/attrybNavLog.svg"
            h="40px"
            rounded={"lg"}
            my="10px"
          />
          <Heading as="h1" fontSize="2xl" ml={2}>
            REGISTER
          </Heading>
        </Box>
        <Box mt={10}>
          <form onSubmit={handleSubmit}>
            <Box mt={5}>
              <InputGroup>
                <InputLeftAddon
                  bgGradient="linear-gradient(90deg, #4ede7c 0%, #FFFB7D 65%, #ecd933 100%)"
                  bgColor="#85FFBD"
                  children="Email"
                  color="black"
                />
                <Input
                  color="white"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  required
                />
              </InputGroup>
              <Box mt={5}>
                <InputGroup>
                  <InputLeftAddon
                    bgGradient="linear-gradient(90deg, #4ede7c 0%, #FFFB7D 65%, #ecd933 100%)"
                    bgColor="#85FFBD"
                    children="Password"
                    color="black"
                  />
                  <Input
                    color="white"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    required
                  />
                  <InputRightElement width="3rem">
                    <Button
                      variant={"unstyled"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? (
                        <ViewIcon color="linear-gradient(90deg, #4ede7c 0%, #FFFB7D 65%, #ecd933 100%)" />
                      ) : (
                        <ViewOffIcon color="linear-gradient(90deg, #4ede7c 0%, #FFFB7D 65%, #ecd933 100%)" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box mt={5}>
                <InputGroup>
                  <InputLeftAddon
                    bgGradient="linear-gradient(90deg, #4ede7c 0%, #FFFB7D 65%, #ecd933 100%)"
                    bgColor="#85FFBD"
                    color="black"
                    children="Confirm Password"
                  />
                  <Input
                    color="white"
                    type={showC ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <InputRightElement width="3rem">
                    <Button
                      variant={"unstyled"}
                      onClick={() => setCPassword((showC) => !showC)}
                    >
                      {showC ? (
                        <ViewIcon color="linear-gradient(90deg, #4ede7c 0%, #FFFB7D 65%, #ecd933 100%)" />
                      ) : (
                        <ViewOffIcon olor="linear-gradient(90deg, #4ede7c 0%, #FFFB7D 65%, #ecd933 100%)" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Box mt={5} mr="70%">
                <Checkbox>
                  <Text fontSize="sm" fontWeight="semibold" display="inline">
                    Remember me
                  </Text>
                </Checkbox>
              </Box>
              <Box mt={5}>
                <Button
                  type="submit"
                  size="lg"
                  w="50%"
                  bgGradient="linear-gradient(90deg, #4ede7c 0%, #FFFB7D 65%, #ecd933 100%)"
                  bgColor="#85FFBD"
                  isDisabled={loading}
                  leftIcon={loading && <FaSpinner className="spin" />}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </Box>
            </Box>
          </form>
          <Text mt="1rem" color="white">
            Continue with google
          </Text>
          <Button
            w="55px"
            h="55px"
            bgColor="none"
            borderRadius="100%"
            my="1rem"
          >
            <FcGoogle size="55px" />
          </Button>

          <Text color="white">Alredy have an account ? <Text color={"orange.800"} as={"span"}><Link to="/login">Login</Link></Text></Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Signup;
