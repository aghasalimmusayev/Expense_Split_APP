import { Router } from "express";
import { createSettlement, deleteSettlement, getSettlementId, getSettlementsByGroup, getSettlementsForUser, updateSettlement } from "@controllers/settlement.controller";

const settlementRoute = Router()

settlementRoute.post('/groups/:groupId/settlements', createSettlement)
settlementRoute.get('/groups/:groupId/settlements', getSettlementsByGroup)
settlementRoute.get('/users/:userId/settlements', getSettlementsForUser) // Test edildi amma hem borclu olani, hem de borc sahibini getirir
settlementRoute.get('/settlements/:id', getSettlementId)
settlementRoute.patch('/settlements/:id', updateSettlement)
settlementRoute.delete('/settlements/:id', deleteSettlement)

export default settlementRoute