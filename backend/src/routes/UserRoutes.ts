import { Router } from "express";
import UserController from "../controllers/UserController";
import { validateCreateUser } from "../schemas/UserSchema";
import AuthenticateController from "../middlewares/AuthenticateController";
import auth from "../middlewares/auth";

const userRouter = Router();
const userController = new UserController();
const authenticateController = new AuthenticateController();

userRouter.post("/create", validateCreateUser, userController.create);
userRouter.get("/search", auth, userController.findAll);
userRouter.get("/search/:id", auth,  userController.findById);
userRouter.put("/update/:id", auth, userController.update);
userRouter.delete("/delete/:id", auth, userController.delete);
userRouter.post("/authenticate", authenticateController.authenticateUser);


export default userRouter;
