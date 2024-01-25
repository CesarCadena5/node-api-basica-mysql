import { conexion } from "../db/conexion.js";

export const validarNombre = async (nombre) => {
    const [existeNombre] = await conexion.query('SELECT nombre FROM empleados WHERE nombre = ?', [nombre]);
    if (existeNombre.length > 0) {
        throw new Error('El nombre que digitó, ya existe. Use otro.');
    }
};