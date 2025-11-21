import { Router } from "express";
import { createExpense, deleteExpense, getExpenseId, getListExpenseInGroup } from "../controllers/expense.controller";

const expenseRoute = Router()

expenseRoute.post('/groups/:groupId/expenses', createExpense,)
expenseRoute.get('/groups/:groupId/expenses', getListExpenseInGroup,)
expenseRoute.get('/expenses/:id', getExpenseId,)
expenseRoute.delete('/expenses/:id', deleteExpense,)

export default expenseRoute