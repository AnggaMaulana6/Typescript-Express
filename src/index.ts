// Server dengan TypeScript
import express, { Application, Request, Response } from "express";

//Library yg dibutuhkan
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";

//Membaca file .env
import { config as dotenv} from "dotenv";


// Routes
import UserRoutes from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import TodoRoutes from "./routes/TodoRoutes";

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
        dotenv();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes():void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("Ini adalah route menggunakan TS")
        });

        this.app.use("/api/v1/users", UserRoutes);
        this.app.use("/api/v1/auth", AuthRoutes);
        this.app.use("/api/v1/Todos", TodoRoutes);
        // this.app.route("/users").post((req: Request, res: Response) => {
        //     res.send(req.body)
        // });
    }
}

const port: number = 8000;
const app = new App().app;
app.listen(port, () =>{
    console.log("Aplikasi ini berjalan di port " + port);

    // .env = Tempat menyimpan data data rahasia
    console.log(process.env.DB_USER);
});

// Server dgn Javascript

//import express from "express";

// const app = express();

// app.route("/").get((req, res) => {
//      res.send("Hallo, ini port pertama saya");
// });

// app.listen(8000);