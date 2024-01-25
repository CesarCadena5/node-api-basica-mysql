import { validationResult } from 'express-validator';

export const validarCampos = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({
            errores: result.array()
        });
    }

    next();
};  