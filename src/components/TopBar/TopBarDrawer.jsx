// src/components/TopBarDrawer.jsx
import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Button,
  Link,
  Flex,
  IconButton,
  useColorMode,
  Input
} from '@chakra-ui/react';
import { HiOutlineHome } from 'react-icons/hi';
import { IoExtensionPuzzleOutline } from 'react-icons/io5';
import { BiWorld } from 'react-icons/bi';
import { AiOutlineSkin } from 'react-icons/ai';
import { TbWorld } from 'react-icons/tb';
import { CiLogout } from 'react-icons/ci';
import { FaGithub, FaYoutube, FaMoon, FaSun } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import ProfileLink from './ProfileLink';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase'
import useSignout from "../../hooks/useSignout";

const TopBarDrawer = ({ isOpen, onClose }) => {
  const [user] = useAuthState(auth);
  const { colorMode, toggleColorMode } = useColorMode();
  const { handleLogout, isLoggingOut } = useSignout()
  const renderUser = user;

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Menu</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4}>
            <Flex display={{ base: "block", md: "none" }} w={'full'}>
              <Input placeholder="Search" display={{ base: "block", md: "none" }} w={'full'} />
            </Flex>
            {renderUser ? (
              <>
                <ProfileLink onClose={onClose} />
                <Button as={RouterLink} to="/" onClick={onClose} w="100%" gap={2}><HiOutlineHome /> Home</Button>
                <Button as={RouterLink} to="/addons" onClick={onClose} w="100%" gap={2}><IoExtensionPuzzleOutline /> under development</Button>
                <Button as={RouterLink} to="/worlds" onClick={onClose} w="100%" gap={2}><BiWorld /> under development</Button>
                <Button as={RouterLink} to="/skins" onClick={onClose} w="100%" gap={2}><AiOutlineSkin /> under development</Button>
                <Button as={RouterLink} to="/servers" onClick={onClose} w="100%" gap={2}><TbWorld /> under development</Button>
                <Button w="100%" gap={2} onClick={handleLogout} isLoading={isLoggingOut}><CiLogout /> Logout</Button>
              </>
            ) : (
              <>
                <Button as={RouterLink} to="/guest" onClick={onClose} w="100%" gap={2}>Register</Button>
                <Button as={RouterLink} to="/" onClick={onClose} w="100%" gap={2}><HiOutlineHome /> Home</Button>
                <Button as={RouterLink} to="/addons" onClick={onClose} w="100%" gap={2}><IoExtensionPuzzleOutline /> under development</Button>
                <Button as={RouterLink} to="/worlds" onClick={onClose} w="100%" gap={2}><BiWorld /> under development</Button>
                <Button as={RouterLink} to="/skins" onClick={onClose} w="100%" gap={2}><AiOutlineSkin /> under development</Button>
                <Button as={RouterLink} to="/servers" onClick={onClose} w="100%" gap={2}><TbWorld /> under development</Button>
              </>
            )}
            <Flex gap={2} justifyContent="center">
              <Link href="https://github.com/OverhandBook79" isExternal>
                <IconButton icon={<FaGithub />} />
              </Link>
              <Link href="https://youtube.com/@overhandbook79" isExternal>
                <IconButton icon={<FaYoutube />} />
              </Link>
              <IconButton onClick={toggleColorMode}>
                {colorMode === 'light' ? <FaMoon /> : <FaSun />}
              </IconButton>
            </Flex>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default TopBarDrawer;
