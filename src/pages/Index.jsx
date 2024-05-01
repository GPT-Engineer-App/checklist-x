import { useState } from 'react';
import { Box, Input, Button, List, ListItem, ListIcon, IconButton } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTask = { id: Date.now(), text: input, isCompleted: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={4}>
      <Input
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
      />
      <Button onClick={handleAddTask} mt={2} colorScheme="blue">Add Task</Button>
      <List spacing={3} mt={4}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" alignItems="center">
            <ListIcon as={FaCheck} color={task.isCompleted ? 'green.500' : 'gray.500'} cursor="pointer" onClick={() => handleToggleComplete(task.id)} />
            <Box flex="1" as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <IconButton
              icon={<FaTrash />}
              colorScheme="red"
              onClick={() => handleDeleteTask(task.id)}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;