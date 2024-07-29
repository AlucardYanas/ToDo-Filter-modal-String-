import { Box, Menu, MenuButton, MenuItem, MenuList, Button, Text } from '@chakra-ui/react';
import React from 'react';
import ToDoCard from '../ui/ToDoCard';
import useCards from '../hooks/useCards';

export default function ToDoPage(): JSX.Element {
  const { filteredCards, deleteHandler, editHandler, filterHandler, updateStatusHandler, selectedStatus } = useCards();

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} colorScheme="blue">
          Filter by Status
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => filterHandler('Новая')}>Новая</MenuItem>
          <MenuItem onClick={() => filterHandler('В обработке')}>В обработке</MenuItem>
          <MenuItem onClick={() => filterHandler('Завершена')}>Завершена</MenuItem>
        </MenuList>
      </Menu>
      {selectedStatus ? (
        filteredCards.map((el) => (
          <ToDoCard
            editHandler={editHandler}
            key={el.id}
            deleteHandler={deleteHandler}
            card={el}
            updateStatusHandler={updateStatusHandler}
          />
        ))
      ) : (
        <Text mt={4}>Please select a status to view the cards.</Text>
      )}
    </Box>
  );
}
