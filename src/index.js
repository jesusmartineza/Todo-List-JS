import './style.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';
// import { Todo } from './classes/todo.class.js';
// import { TodoList } from './classes/todo-list.class';

export const todoList = new TodoList();

// const tarea = new Todo('Aprender JavaScript');

// t odoList.nuevoTodo(tarea);

// crearTodoHtml(tarea);

// console.log(todoList);

todoList.todos.forEach(todo => crearTodoHtml(todo));

console.log('todos', todoList.todos);
