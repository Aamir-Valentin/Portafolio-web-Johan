import libraryData from '../data/library_data.json';

const DB_KEY = 'valentinweb_library_db';

export function getDB() {
    //Copiamos los valores en la constante local
    const local = localStorage.getItem(DB_KEY);
    //Si no hay datos en la constante local
    if (!local) {
        //Guardamos la info de library_data en la memoria del navegador
        localStorage.setItem(DB_KEY, JSON.stringify(libraryData));
        //devolvemos el objeto
        return libraryData;
    }
    //Si hay datos, convierte el texto guardado a un objeto
    return JSON.parse(local);
}

export function saveDB(data) {
    //Recibe el parametro data para actualizar la memoria del navegador
    localStorage.setItem(DB_KEY, JSON.stringify(data));
}

export function resetDB() {
    //Borra la memoria del navegador
    localStorage.removeItem(DB_KEY);
}