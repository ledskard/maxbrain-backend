import { Router } from "express";
import TeamController from "../controllers/TeamController";

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.post("/create", teamController.create);
teamRouter.get("/search", teamController.findAll);
teamRouter.get("/search/user/:id", teamController.findByUserIdAndPeriod);
teamRouter.get("/search/:id",  teamController.findById);
teamRouter.put("/update/:id", teamController.update);
teamRouter.delete("/delete/:id", teamController.delete);

export default teamRouter;
