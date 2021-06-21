import { Router } from "express";
import PersonalDevelopmentController from "../controllers/PersonalDevelopmentController";
import {validateCreatePersonalDevelopment} from "../schemas/PersonalDevelopmentSchema";

const personalDevelopmentRouter = Router();
const personalDevelopmentController = new PersonalDevelopmentController();

personalDevelopmentRouter.post("/create", validateCreatePersonalDevelopment, personalDevelopmentController.create);
personalDevelopmentRouter.get("/search", personalDevelopmentController.findAll);
personalDevelopmentRouter.get("/search/:id",  personalDevelopmentController.findById);
personalDevelopmentRouter.put("/update/:id", personalDevelopmentController.update);
personalDevelopmentRouter.delete("/delete/:id", personalDevelopmentController.delete);


export default personalDevelopmentRouter;
