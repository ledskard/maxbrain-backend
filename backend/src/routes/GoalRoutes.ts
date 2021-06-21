import { Router } from "express";
import GoalController from "../controllers/GoalController";
import {validateCreateGoal} from "../schemas/GoalSchema";

const goalRouter = Router();
const goalController = new GoalController();

goalRouter.post("/create", validateCreateGoal, goalController.create);
goalRouter.get("/search", goalController.findAll);
goalRouter.get("/search/active", goalController.findActiveGoals);
goalRouter.get("/search/:id",  goalController.findById);
goalRouter.put("/update/:id", goalController.update);
goalRouter.delete("/delete/:id", goalController.delete);

export default goalRouter;
