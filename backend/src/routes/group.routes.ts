import { Router } from "express";
import { createGroup, deleteGroup, getGroupId, getGroups, updateGroupByZod } from "../controllers/group.controller";

const groupRoute = Router()

groupRoute.post('/', createGroup)
groupRoute.get('/', getGroups)
groupRoute.get('/:id', getGroupId)
groupRoute.patch('/:id', updateGroupByZod)
groupRoute.delete('/:id', deleteGroup)

export default groupRoute