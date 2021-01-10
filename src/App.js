import './App.css';
//importing components
import Form from './components/Form';
import TodoList from './components/ToDoList';
import React, {useEffect, useState} from "react";



function App() {
  //States
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setfilteredTodos] = useState([]);
  //Functions
  function filterHandler() {
    switch(status){
      case 'completed':
        setfilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setfilteredTodos(todos.filter(todo => todo.completed === false))
        break; 
      default:
        setfilteredTodos(todos);
        break;
    }
  }
  //save to local
  function saveLocalTodos() {
{
      localStorage.setItem('todos', JSON.stringify(todos))
    }
    }
    function getLocalTodos() {
      if (localStorage.getItem('todos') === null) {
        localStorage.setItem('todos', JSON.stringify([]));
      }else{
        let todoLocal = JSON.parse(localStorage.getItem("todos"));
        setTodos(todoLocal);
      }
      }
    //RUN ONCE AT THE START
    useEffect(() => {
      console.log('hello')
      getLocalTodos();
    }, []);
    //USE EFFECT
    useEffect(() => {
      saveLocalTodos();
      filterHandler();

    }, [todos, status]);




  return (
    <div className="App">
      <header>
        <h1>Todo List </h1>
      </header>
      <Form 
      todos={todos}
      setTodos={setTodos}
      setInputText={setInputText}
      inputText={inputText}
      setStatus={setStatus}
      
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
