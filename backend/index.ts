import express from "express";
import expressWs from "express-ws";
import cors from "cors";

const  app = express();
expressWs(app);

app.use(cors());

const port = 8000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});