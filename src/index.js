import 'dotenv/config'
import express from "express";
import { empleadosRouter } from "./routes/empleados.js";

const app = express();

console.log(process.env);
app.use(express.json());

app.use('/empleados', empleadosRouter);
app.use((req, res) => {
    res.status(404).json({
        msg: 'Not Found'
    })
});

app.listen(process.env.PORT, () => {
    console.log('corriendo app en el puerto: ', process.env.PORT);
});