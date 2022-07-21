//Para no hacer tantas importaciones en el archivo index.js de src
//Creamos un archivos con las importaciones
//hacemos las importaciones y luego exportamos las mismas importaciones que hicimos
//Para luego hacer solo la importaciones de este archivo en el index.js

import { Todo } from './todo.class';
import { TodoList } from './todo-list.class';

export { Todo, TodoList };
