import { conexion } from "../db/conexion.js";

export const getEmpleados = async (req, res, next) => {
    try {
        const [empleados] = await conexion.query('SELECT * FROM empleados');

        return res.json({
            ok: true,
            data: empleados
        });
    } catch (error) {
        return res.status(500).json({
            errores: 'Ocurrió un error al listar los empleados',
            ok: false
        })
    }
}

export const crearEmpleado = async (req, res, next) => {
    const { nombre, apellido, salario } = req.body;

    try {
        const [rows] = await conexion.query('INSERT INTO empleados(nombre, apellido, salario) VALUES (?, ?, ?)', [nombre, apellido, salario]);

        if (rows.affectedRows > 0) {
            return res.json({
                ok: true,
                msg: `El empleado ${nombre}, fue guardado.`
            });
        };

    } catch (error) {
        return res.status(500).json({
            errores: 'Ocurrió un error al guardar el empleado',
            ok: false
        });
    }
};

export const actualizarEmpleado = async (req, res, next) => {
    const { nombre, apellido, salario } = req.body;
    const { id } = req.params;

    try {
        const [result] = await conexion.query('UPDATE empleados SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), salario = IFNULL(?, salario) WHERE id = ?', [nombre, apellido, salario, id]);

        if (result.affectedRows > 0) {
            return res.json({
                ok: true,
                msg: `El empleado fue actualizado.`
            });
        };
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errores: 'Ocurrió un error al actualizar el empleado',
            ok: false
        });
    }
};

export const eliminarEmpleados = async (req, res, next) => {
    const { id } = req.params;

    try {
        const [result] = await conexion.query('DELETE FROM empleados WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return res.json({
                ok: true,
                msg: `El empleado fue eliminado.`
            });
        };
    } catch (error) {
        return res.status(500).json({
            errores: 'Ocurrió un error al eliminar el empleado',
            ok: false
        });
    }
};