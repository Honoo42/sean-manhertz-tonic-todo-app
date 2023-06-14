import React, { useCallback, useEffect, useState } from 'react';
import { Container,
    Button,
    Checkbox,
    FormControlLabel,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    TextField,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
/* import storage from '../../../utils'; */ // removed for upgrade to API/MongoDB layer

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const useStyles = makeStyles((theme) => ({
    container: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    todoList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: 0,
    },
    todoItem: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1),
    },
    todoText: {
      marginRight: theme.spacing(2),
    },
  }));
  

const TodoList = (): JSX.Element => {
    const classes = useStyles();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoText, setNewTodoText] = useState('');

    const fetchTodos = async () => {
        try {
        const response = await fetch('http://localhost:5000/api/todos');
        const data = await response.json();

        setTodos(data);
        } catch (error) {
        console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (text: string) => {
        try {
        const response = await fetch('http://localhost:5000/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });
        const data = await response.json();
        setTodos((prevTodos) => {
                if (prevTodos) {
                    return [...prevTodos, data];
                } else {
                    return [data];
                }
        });
        setNewTodoText('');
        } catch (error) {
        console.error('Error adding todo:', error);
        }
    };

    const toggleTodo = async (id: number, checked: boolean) => {
        try {
        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: checked }),
        });
        const data = await response.json();

        setTodos((prevTodos) =>
            prevTodos?.map((todo) => (todo?.id === id ? { ...todo, completed: !data.completed ?? true } : todo))
        );
        } catch (error) {
        console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
        const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
            method: 'DELETE',
        });
        if (response.status === 204 || response.status === 200) {
            setTodos((prevTodos) => prevTodos?.filter((todo) => todo?.id !== id));
        } else {
            console.error('Error deleting todo:', response.status);
        }
        } catch (error) {
        console.error('Error deleting todo:', error);
        }
    };

    const handleAddTodo = useCallback(() => {
        addTodo(newTodoText);
    }, [newTodoText]);

    const handleToggleTodo = useCallback((id: number, checked: boolean) => {
        toggleTodo(id, checked);
    }, []);

    const handleDeleteTodo = useCallback((id: number) => {
        deleteTodo(id);
    }, []);

    useEffect(() => {
        fetchTodos();
      }, []);

  return (
    <Container className={classes.container}>
      <Typography variant="h4" component="h1">Todo App</Typography>
            <List  className={classes.todoList} data-testid="todo-list">
                {!todos || !todos.length && (
                    <Typography variant="h6" component="h3" data-testid="no-todos">Please add a todo item</Typography>
                )}
              {todos?.map((todo, index) => (
                <ListItem  key={todo.id} className={classes.todoItem} data-testid={`todo-item-${index+1}`}>
                  <FormControlLabel
                    control={
                    <Checkbox
                        aria-label={`Checkbox status is ${todo.completed}`}
                        checked={todo.completed ?? false}
                        onChange={() => handleToggleTodo(todo?.id, !todo.completed)}
                        />}
                        label={''}
                    />
                  <ListItemText primary={todo.text} />
                  <ListItemSecondaryAction>
                    <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => handleDeleteTodo(todo?.id)}>
                        Delete
                    </Button>

                  </ListItemSecondaryAction>
                </ListItem >
              ))}
            </List >
            <TextField
              label="New Todo"
              id="newTodo"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
            />
            <Button
                variant="contained"
                endIcon={<CloudUploadIcon />}
                color='primary'
                onClick={handleAddTodo}
                disabled={!newTodoText}
                style={{marginTop: 8}}
            >
              Add Todo Item
            </Button>
    </Container>
  );

}

export default TodoList;