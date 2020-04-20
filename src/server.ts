// src/server.ts
import "./utils/config"
import app from "./app";
const PORT: number = parseInt(process.env.PORT || '3100');
const HOSTNAME = process.env.HOSTNAME || 'localhost';

// console.log(`Database: ${process.env.Database}`);
app.listen(PORT, HOSTNAME, () => console.log(`Example app listening on port ${HOSTNAME}:${PORT}!`));
