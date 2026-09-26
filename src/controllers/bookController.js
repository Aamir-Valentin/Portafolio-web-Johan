import { getDB, saveDB } from './dbController.js';

export function getBook() {
    const db = getDB();

    return db.libros.map(libro => {
        const autor = db.autores.find(a => a.id === libro.id_autor);
        const categoria = db.categorias.find(c => c.id === libro.id_categoria);
        const editorial = db.editoriales.find(e => e.id === libro.id_editorial);

        return {
            ...libro,
            autorNombre: autor ? `${autor.nombre} ${autor.apellido}` : 'Sin Autor',
            categoriaNombre: categoria ? categoria.nombre : 'Sin Categoría',
            editorialNombre: editorial ? editorial.nombre : 'Sin Editorial'
        };
    });
}

export function getBookByISBN(ISBN) {
    const db = getDB();
    return db.libros.find(libro => libro.ISBN === Number(ISBN));
}

export function createBook(ISBN, titulo, id_categoria, id_autor, id_editorial, anio) {
    const db = getDB();
    const newISBN = Number(ISBN);

    if (db.libros.some(libro => libro.ISBN === newISBN)) {
        return false;
    }

    db.libros.push({
        ISBN: newISBN,
        titulo: titulo,
        id_categoria: Number(id_categoria),
        id_autor: Number(id_autor),
        id_editorial: Number(id_editorial),
        anio: Number(anio)
    });
    saveDB(db);
    return true;
}

export function updateBook(ISBN, nuevoTitulo, id_categoria, id_autor, id_editorial, nuevoAnio) {
    const db = getDB();
    const index = db.libros.findIndex(l => l.ISBN === Number(ISBN));

    if (index !== -1) {
        db.libros[index] = {
            ISBN: Number(ISBN),
            titulo: nuevoTitulo,
            id_categoria: Number(id_categoria),
            id_autor: Number(id_autor),
            id_editorial: Number(id_editorial),
            anio: Number(nuevoAnio)
        }
        saveDB(db);
    }
}

export function deleteBook(ISBN) {
    const db = getDB();
    db.libros = db.libros.filter(l => l.ISBN !== Number(ISBN));
    saveDB(db);
}