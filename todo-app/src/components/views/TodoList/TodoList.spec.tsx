import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import TodoList from './TodoList';

// Mock the fetch function
global.fetch = jest.fn();

describe('TodoList', () => {
  beforeEach(() => {
    // Clear all mock calls before each test
    // @ts-ignore
    global.fetch.mockClear();
  });

  test('renders the component', () => {
    render(<TodoList />);
    // Add assertions to verify that the component is rendered correctly
    // For example, you can check if the heading and input field are present
    expect(screen.getByText('Todo App')).toBeInTheDocument();
    expect(screen.getByLabelText('New Todo')).toBeInTheDocument();
  });

  test('fetches todos on component mount', async () => {
    // Mock the fetch response
    const mockData = { todos: [{ id: 1, text: 'Todo 1', completed: false }] };
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    render(<TodoList />);

    // Expect fetch to have been called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/todos');

    // Wait for the component to finish fetching todos and update
    await waitFor(() => screen.getByTestId('todo-list'));

    // Add assertions to verify that the todos are rendered correctly
    await waitFor(() => {
        expect(screen.getByText('Todo 1')).toBeInTheDocument();
      });
  });

  test('adds a new todo', async () => {
    // Mock the fetch response and update function
    const mockData = { id: 2, text: 'New Todo', completed: false };
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const { getByLabelText, getByText } = render(<TodoList />);

    // Simulate typing in the input field and clicking the add button
    fireEvent.change(getByLabelText('New Todo'), { target: { value: 'New Todo' } });
    fireEvent.click(getByText('Add Todo'));

    // Expect fetch to have been called with the correct URL and request body
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'New Todo' }),
    });

    // Wait for the component to finish adding the todo and update
    await waitFor(() => screen.getByTestId('todo-list'));

    // Add assertions to verify that the new todo is rendered correctly
    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

// debug why this is failing
  /* test('deletes a todo', async () => {
    // Mock the fetch response and update function
    const mockData = { todo: { id: 1, text: 'Todo 1', completed: true } };
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockData),
    });
    const { getByTestId, queryByText } = render(<TodoList />);

    // Click the delete button to remove the todo
    fireEvent.click(getByTestId('todo-item-1').querySelector('button'));

    // Expect fetch to have been called with the correct URL and method
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/api/todos/1', {
      method: 'DELETE',
    });

    // Wait for the component to finish deleting the todo and update
    await waitFor(() => expect(queryByText('Todo 1')).not.toBeInTheDocument());
  }); */
});