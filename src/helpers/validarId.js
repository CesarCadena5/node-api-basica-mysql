import { conexion } from "../db/conexion.js";

export const validarId = async (id) => {
    if (id === '') {
        throw new Error('El id es requerido');
    }

    const [existeId] = await conexion.query('SELECT id FROM empleados WHERE id = ?', [id]);
    if (existeId.length <= 0) {
        throw new Error('El empleado no existe por dicho ID');
    }
};