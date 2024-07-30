import { Box, Menu, MenuButton, MenuItem, MenuList, Button, Text } from '@chakra-ui/react';
import React from 'react';
import ToDoCard from '../ui/ToDoCard';
import useCards from '../hooks/useCards';

export default function ToDoPage(): JSX.Element {
  const { filteredCards, deleteHandler, filterHandler, updateStatusHandler, selectedStatus } = useCards();
  console.log(filteredCards);
  // Определение сообщения по умолчанию
  let content: JSX.Element;

  if (selectedStatus) {
    if (filteredCards.length > 0) {
      content = (
        <div>
          {filteredCards.map((el) => (
            <ToDoCard
              key={el.id}
              card={el}
              deleteHandler={deleteHandler}
              updateStatusHandler={updateStatusHandler}
            />
          ))}
        </div>
      );
    } else {
      content = <Text mt={4}>No cards found for the selected status.</Text>;
    }
  } else {
    content = <Text mt={4}>Please select a status to view the cards.</Text>;
  }

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} colorScheme="blue">
          Filter by Status
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => filterHandler('New')}>New</MenuItem>
          <MenuItem onClick={() => filterHandler('Pending')}>Pending</MenuItem>
          <MenuItem onClick={() => filterHandler('Fullfilled')}>Fullfilled</MenuItem>
        </MenuList>
      </Menu>

      {/* Отображение содержимого на основе промежуточной переменной */}
      {content}
    </Box>
  );
}
