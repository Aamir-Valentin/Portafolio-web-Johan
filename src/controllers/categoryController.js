import { getDB, saveDB } from './dbController.js';

export function getCategory() {
    const db = getDB();
    return db.categorias;
}

export function getCategoryById(id) {
    const db = getDB();
    return db.categorias.find(categoria => categoria.id === Number(id));
}

export function createCategory(nombre) {
    const db = getDB();
    const newId = db.categorias.length > 0 ? Math.max(...db.categorias.map(c => c.id)) + 1 : 1;

    db.categorias.push({ id: newId, nombre });
    saveDB(db);
}

export function updateCategory(id, nuevoNombre) {
    const db = getDB();
    const index = db.categorias.findIndex(c => c.id === Number(id));

    if (index !== -1) {
        db.categorias[index].nombre = nuevoNombre;
        saveDB(db);
    }
}

export function deleteCategory(id) {
    const db = getDB();
    db.categorias = db.categorias.filter(c => c.id !== Number(id));
    saveDB(db);
}