import type { FC } from 'react';
import React from 'react';

import { 
  Container,
  Box
} from '@mui/material';

import { Sidebar } from '../components/sidebar'
import { Navbar } from '../components/navbar'

type UserLayoutProps = {
  sideComponent: React.ReactNode
};

/**
 * Base component for the logged-in user UI.
 * Receives a sideComponent to place in the right side.
 * @param props
 * @returns A dashbaord-like layout.
 */
export const UserLayout: FC<UserLayoutProps> = (props) => {
  return (
    <Container
      maxWidth={false}
      disableGutters={true}
      sx={{
        display: "flex",
        flexFlow: "row",
      }}
    >
      <Sidebar />
      
      <Box flexGrow={1} sx={{display: "flex", flexFlow: "column"}}>
        <Navbar />
        {props.sideComponent}
      </Box>
    </Container>
  );
};