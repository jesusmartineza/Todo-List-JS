//Creando las tareas en el HTML

import { Todo } from '../classes';
import { todoList } from '../index';

//Referencias

const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const todoFiltros = document.querySelector('.filters');
const btnFiltro = document.querySelectorAll('.filtro');

export const crearTodoHtml = todo => {
    const htmlTodo = ` <li class="${
        todo.completado ? 'completed' : ''
    }" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox"  ${
            todo.completado ? 'checked' : ''
        }  >
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
</li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
};

//Eventos
txtInput.addEventListener('keyup', event => {
    //El 13 representa la tecla enter y con esto la detectamos
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        // console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', event => {
    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement;
    //getAttribute es para obtener el atributo que nosotros necesitemos
    const todoId = todoElemento.getAttribute('data-id');

    //Aquí veremos si en el nombre del elemento incluye input y usaremos "includes"
    if (nombreElemento.includes('input')) {
        //Click en el check
        todoList.todoCompletado(todoId);
        //Para cambiar una clase si tiene una quitarla y poner otra
        //Para esto usaremos toggle
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        //Esto nos borrara el todo que seleccionemos
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);
    }

    // console.log(todoElemento);
    // console.log(todoId);
    // console.log(todoList);
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    //Creamos un ciclo for para ala inversa para eliminar un todo
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];

        //Para eliminar solo los completado nos ayudamos si tiene la clase completed el todo
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

todoFiltros.addEventListener('click', event => {
    const filtro = event.target.text;

    if (!filtro) {
        return;
    }

    btnFiltro.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
            default:
                break;
        }
    }
});
