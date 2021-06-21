import { Router } from "express";
import UserGoalController from "../controllers/UserGoalController";
import {validateCreateUserGoal} from "../schemas/UserGoalSchema";

const userGoalRouter = Router();
const userGoalController = new UserGoalController();

userGoalRouter.post("/create", validateCreateUserGoal, userGoalController.create);
userGoalRouter.get("/search/:id", userGoalController.findCompletedGoalsByUserId);

export default userGoalRouter;
