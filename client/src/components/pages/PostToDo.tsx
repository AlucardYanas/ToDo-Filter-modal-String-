import { Box, Button, Input, Stack, Select } from '@chakra-ui/react';
import React from 'react';
import useCards from '../hooks/useCards';

export default function PostToDo(): JSX.Element {
  const { cardSubmitHandler } = useCards();

  return (
    <Box onSubmit={cardSubmitHandler} as="form" mt={3}>
      <Stack spacing={3}>
        <Input name="title" placeholder="Title" size="md" type="text" required />
        <Input name="description" placeholder="Description" size="md" type="text" required />
        <Select name="status" placeholder="Select status" required>
          <option value="Новая">Новая</option>
          <option value="В обработке">В обработке</option>
          <option value="Завершена">Завершена</option>
        </Select>
        <Button type="submit" colorScheme="blue">
          OK
        </Button>
      </Stack>
    </Box>
  );
}
