import { Router } from "express";
import PillarController from "../controllers/PillarController";

const pillarRouter = Router();
const pillarController = new PillarController();

pillarRouter.post("/create", pillarController.create);
pillarRouter.get("/search", pillarController.findAll);
pillarRouter.get("/search/goals",  pillarController.findAllWithGoal);

export default pillarRouter;
