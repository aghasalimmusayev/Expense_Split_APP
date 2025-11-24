import { Router } from "express";
import { createExpense, deleteExpense, getExpenseId, getListExpenseInGroup, updateExpense } from "@controllers/expense.controller";
const expenseRoute = Router();
expenseRoute.post('/groups/:groupId/expenses', createExpense);
expenseRoute.get('/groups/:groupId/expenses', getListExpenseInGroup);
expenseRoute.get('/expenses/:id', getExpenseId);
expenseRoute.patch('/expenses/:id', updateExpense);
expenseRoute.delete('/expenses/:id', deleteExpense);
export default expenseRoute;
