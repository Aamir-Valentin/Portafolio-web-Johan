import { getDB, saveDB } from './dbController.js';

export function getAuthors() {
    const db = getDB();
    return db.autores;
}

export function getAuthorById(id) {
    const db = getDB();
    // .find() busca un solo elemento cuya 'id' coincida con el parámetro
    return db.autores.find(autor => autor.id === Number(id));
}

export function createAuthor(nombre, apellido) {
    const db = getDB();
    // Generamos un ID autoincrementable simple
    const newId = db.autores.length > 0 ? Math.max(...db.autores.map(a => a.id)) + 1 : 1;

    db.autores.push({ id: newId, nombre, apellido });
    saveDB(db);
}

export function updateAuthor(id, nuevoNombre, nuevoApellido) {
    const db = getDB();
    // Buscamos la posición (índice) del autor en la lista
    const index = db.autores.findIndex(a => a.id === Number(id));

    if (index !== -1) {
        db.autores[index].nombre = nuevoNombre;
        db.autores[index].apellido = nuevoApellido;
        saveDB(db);
    }
}

export function deleteAuthor(id) {
    const db = getDB();
    // .filter() conserva todos los autores EXCEPTO el que tiene ese ID
    db.autores = db.autores.filter(a => a.id !== Number(id));
    saveDB(db);
}