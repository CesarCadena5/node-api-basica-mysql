import { Router } from "express";
import { check } from 'express-validator';

import { validarCampos } from "../middlewares/validarCampos.js";
import { actualizarEmpleado, crearEmpleado, eliminarEmpleados, getEmpleados } from "../controllers/empleados.controller.js";
import { validarNombre } from "../helpers/validarNombre.js";
import { validarId } from "../helpers/validarId.js";

export const empleadosRouter = Router();

// Obtener los empleados
empleadosRouter.get('/', getEmpleados);

// Crear empleados
empleadosRouter.post('/crear', [
    check('nombre', 'El nombre es requerido').custom(validarNombre),
    check('apellido', 'El apellido es requerido').trim().notEmpty().escape(),
    check('salario', 'El salario debe ser número').trim().notEmpty().escape().isNumeric(),
    validarCampos
], crearEmpleado);

empleadosRouter.put('/actualizar/:id', [
    check('id').custom(validarId),
    check('nombre').optional().trim().escape(),
    check('apellido').optional().trim().escape(),
    check('salario', 'El salario debe ser números').optional().trim().escape().isNumeric(),
    validarCampos
], actualizarEmpleado);

empleadosRouter.delete('/eliminar/:id', [
    check('id').custom(validarId),
    validarCampos
], eliminarEmpleados);