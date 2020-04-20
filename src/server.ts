// src/server.ts
import "./utils/config"
import app from "./app";
const PORT: number = parseInt(process.env.PORT || '3100');
const MYHOSTNAME = process.env.MYHOSTNAME || 'localhost';

// console.log(`Database: ${process.env.Database}`);
app.listen(PORT, MYHOSTNAME, () => console.log(`Example app listening on port ${MYHOSTNAME}:${PORT}!`));
