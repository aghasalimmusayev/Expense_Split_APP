import { Router } from "express";
import { getStatics } from "@controllers/static.controller";
const staticRoute = Router();
staticRoute.get('/groups/:groupId/stats', getStatics);
export default staticRoute;
