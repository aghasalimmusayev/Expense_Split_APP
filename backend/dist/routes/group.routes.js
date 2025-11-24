import { Router } from "express";
import { createGroup, deleteGroup, getGroupId, getGroups, updateGroupByZod } from "@controllers/group.controller";
const groupRoute = Router();
groupRoute.post('/groups', createGroup);
groupRoute.get('/groups', getGroups);
groupRoute.get('/groups/:id', getGroupId);
groupRoute.patch('/groups/:id', updateGroupByZod);
groupRoute.delete('/groups/:id', deleteGroup);
export default groupRoute;
