// src/server.ts
import "./utils/config"
import app from "./app";
const PORT = process.env.PORT || 3100;

console.log(`Database: ${process.env.Database}`);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
