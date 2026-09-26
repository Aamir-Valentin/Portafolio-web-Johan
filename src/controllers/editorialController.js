import { getDB, saveDB } from './dbController.js';

export function getEditorial() {
    const db = getDB();
    return db.editoriales;
}

export function getEditorialById(id) {
    const db = getDB();
    return db.editoriales.find(editorial => editorial.id === Number(id));
}

export function createEditorial(nombre, pais) {
    const db = getDB();
    const newId = db.editoriales.length > 0 ? Math.max(...db.editoriales.map(e => e.id)) + 1 : 1;

    db.editoriales.push({ id: newId, nombre, pais });
    saveDB(db);
}

export function updateEditorial(id, nuevoNombre, nuevoPais) {
    const db = getDB();
    const index = db.editoriales.findIndex(e => e.id === Number(id));

    if (index !== -1) {
        db.editoriales[index].nombre = nuevoNombre;
        db.editoriales[index].pais = nuevoPais;
        saveDB(db);
    }
}

export function deleteEditorial(id) {
    const db = getDB();
    db.editoriales = db.editoriales.filter(e => e.id !== Number(id));
    saveDB(db);
}