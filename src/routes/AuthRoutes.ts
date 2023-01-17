import BaseRoutes from "./BaseRoutes";
import { auth } from "../Middlewares/AuthMiddleware";
import validate from "../Middlewares/AuthValidator";

// Controller
import AuthController from "../Controllers/AuthController";

class AuthRoutes extends BaseRoutes{    
    public routes(): void {
        this.router.post("/register", validate, AuthController.register);
        this.router.post("/login", validate, AuthController.login);
        //this.router.post("/profil", validate, AuthController.profil);
        // "/..." = merupakn end point
    }
}

export default new AuthRoutes().router;