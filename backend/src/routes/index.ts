import { Router } from 'express';
import userRouter from "./UserRoutes";
import auth from "../middlewares/auth";
import goalRouter from "./GoalRoutes";
import personalDevelopmentRouter from "./PersonalDevelopmentRoutes";
import courseRouter from "./CourseRoutes";
import teamRouter from "./TeamRoutes";
import pillarRouter from "./PillarRoutes";
import userGoalRouter from "./UserGoalRoutes";

const routes = Router();


routes.use("/user", userRouter);
routes.use("/user/goal", userGoalRouter);
routes.use("/pillar", pillarRouter);
routes.use("/goal", auth, goalRouter);
routes.use("/personal/development", auth, personalDevelopmentRouter);
routes.use("/course", auth, courseRouter);
routes.use("/team", auth, teamRouter);

export default routes;
