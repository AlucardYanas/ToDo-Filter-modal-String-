import { Box, Button, Input, Stack, Select } from '@chakra-ui/react';
import React from 'react';
import useCards from '../hooks/useCards';

export default function PostToDo(): JSX.Element {
  const { cardSubmitHandler } = useCards();

  return (
    <Box onSubmit={cardSubmitHandler} as="form" mt={3}>
      <Stack spacing={3}>
        <Input name="title" placeholder="title" size="md" type="text" required />
        <Input name="description" placeholder="description" size="md" type="text" required />
        <Select name="status" placeholder="Select status" required>
          <option value="New">New</option>
          <option value="Pending">Pending</option>
          <option value="Fullfilled">Fullfilled</option>
        </Select>
        <Button type="submit" colorScheme="blue">
          ok
        </Button>
      </Stack>
    </Box>
  );
}
