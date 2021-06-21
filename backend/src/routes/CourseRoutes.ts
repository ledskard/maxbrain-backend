import { Router } from "express";
import CourseController from "../controllers/CourseController";
import {validateCreateCourse} from "../schemas/CourseSchema";

const courseRouter = Router();
const courseController = new CourseController();

courseRouter.post("/create", courseController.create);
courseRouter.get("/search", courseController.findAll);
courseRouter.get("/search/:id",  courseController.findById);
courseRouter.put("/update/:id", courseController.update);
courseRouter.delete("/delete/:id", courseController.delete);

export default courseRouter;
