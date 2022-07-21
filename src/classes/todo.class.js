export class Todo {
    //Ahora vamos a volver a crear la o las instancias de la clase Todo

    static fromJson({ id, tarea, completado, creado }) {
        //Creamos una nueva instancia
        const temporalTodo = new Todo(tarea);

        //Haciendo referencia a las propiedades
        temporalTodo.id = id;
        temporalTodo.completado = completado;
        temporalTodo.creado = creado;

        return temporalTodo;
    }

    constructor(tarea) {
        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }
}
