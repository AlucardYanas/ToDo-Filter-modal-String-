import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ToDoPage from './components/pages/ToDoPage';
import Layout from './components/Layout';
import PostToDo from './components/pages/PostToDo';


function App(): JSX.Element {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <ToDoPage />,
        },
        {
          path: '/PostToDo',
          element: <PostToDo />,}
      ],
    },
  ]);

  return (
    
      <RouterProvider router={router} />
    
  );
}

export default App;
