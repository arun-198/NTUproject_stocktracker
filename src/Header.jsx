import { Flex, Heading, Icon, IconButton, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiStockLine } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import LogIn from './pages/LogIn';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const navigate = useNavigate(); 
  
  const handleNavigation = () => { navigate('/login')};

  return (
    
    <VStack height={'100%'} >
        <Flex w="100vw"  position="relative" top={0} background="linear-gradient(to right, #008080 , #20B2AA)" paddingBottom={5} alignItems={"center"}>
          
          <Heading 
            ml="8" fontSize="1.8em" fontWeight="semibold" color="white" marginLeft={"10vw"}>Stock Portfo</Heading>
          <Icon as={RiStockLine} boxSize={8} marginTop={5} marginLeft={0} color={"black"}></Icon>
          <Heading 
            ml="8" fontSize="1.5em" fontWeight="semibold" color="white" marginLeft={0}>o</Heading>
          <IconButton aria-label="Login" 
                      marginTop={5} 
                      marginLeft={"60%"} 
                      icon={<IoPersonCircleOutline size={"2em"} ></IoPersonCircleOutline> } 
                      onClick={handleNavigation}
                      backgroundColor={"transparent"}></IconButton>
        </Flex>
    </VStack>  
    
  );
};


export default Header;
