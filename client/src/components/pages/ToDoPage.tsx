import React from 'react';
import { Box, Menu, MenuButton, MenuItem, MenuList, Button, Text } from '@chakra-ui/react';
import ToDoCard from '../ui/ToDoCard';
import useCards from '../hooks/useCards';

export default function ToDoPage(): JSX.Element {
  const { filteredCards, deleteHandler, filterHandler, updateStatusHandler, selectedStatus } = useCards();

  const handleDelete = async (id: number): Promise<void> => {
    await deleteHandler(id);
  };

  const handleUpdateStatus = async (id: number, status: string): Promise<void> => {
    await updateStatusHandler(id, status);
  };

  const handleDeleteWrapper = (id: number): void => {
    void handleDelete(id).catch((error) => console.error('Failed to delete card', error));
  };

  const handleUpdateStatusWrapper = (id: number, status: string):void  => {
    void handleUpdateStatus(id, status).catch((error) => console.error('Failed to update status', error));
  };

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
            key={el.id}
            card={el}
            deleteHandler={() => handleDeleteWrapper(el.id)}
            updateStatusHandler={(status) => handleUpdateStatusWrapper(el.id, status)}
          />
        ))
      ) : (
        <Text mt={4}>Please select a status to view the cards.</Text>
      )}
    </Box>
  );
}
