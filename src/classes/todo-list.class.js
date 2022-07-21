import { Todo } from './todo.class';

//Para hacer uso de clases se recomienda utilizar la primer letra de una palabra en mayúscula y asi sucesivamente
export class TodoList {
    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        //Insertar valores a "todo"
        this.todos.push(todo);
        //Dado que hemos hecho un cambio a todo lo necesitamos en storage
        this.guardarLocalStorage();
    }

    //Eliminar un todo mediante el uso de "filter"
    eliminarTodo(id) {
        //verificamos que los id´s sean diferentes
        //Y esto sera almacenado en this.todos = [] y regresara un nuevo arreglo
        this.todos = this.todos.filter(todo => todo.id != id);
        //Dado que hemos hecho un cambio a todo lo necesitamos en storage
        this.guardarLocalStorage();
    }

    todoCompletado(id) {
        for (const todo of this.todos) {
            // console.log(id, todo.id);

            if (todo.id == id) {
                //Haremos el cambio de false a true y viceversa haciendo un todo.completado en negación con el "!"
                todo.completado = !todo.completado;
                //Dado que hemos hecho un cambio a todo lo necesitamos en storage
                this.guardarLocalStorage();
                //Hacemos en break para salir de ciclo
                break;
            }
        }
    }

    eliminarCompletados() {
        //Nos regresara los que no estén completados
        //Por eso el todo.completado lo ponemos en negación
        this.todos = this.todos.filter(todo => !todo.completado);
        //Dado que hemos hecho un cambio a todo lo necesitamos en storage
        this.guardarLocalStorage();
    }

    //Recuperando todos
    guardarLocalStorage() {
        //Como el localStorage solo acepta o reconoce strings la forma de lograr guardar los valores del arreglo "todo" debemos convertirlo o transformarlo a un JSON string que en si es como crear objetos y almacenarlos en un arreglo pero siendo string
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage() {
        //forma tradicional del if-else

        /*  if (localStorage.getItem('todo')) {
            this.todos = JSON.parse(localStorage.getItem('todo'));
        } else {
            this.todos = [];
        } */
        //Como hemos transformado nuestro arreglo en un string ahora debemos revertir el cambio y vuelva hacer un arreglo
        //Y prácticamente igual con la diferencia que ahora usaremos "parse"

        //Forma moderna con operador ternario

        this.todos = localStorage.getItem('todo')
            ? JSON.parse(localStorage.getItem('todo'))
            : [];

        this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }
}
