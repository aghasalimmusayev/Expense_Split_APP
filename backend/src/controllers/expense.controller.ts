import { Request, Response } from "express";
import { ZodError } from "zod";
import { addExpense, getExpenseById, listExpensesByGroupId, listExpensesForUserInGroup, removeExpense } from "../storage";
import { CreateExpenseSchema } from "../validators";

export function createExpense(req: Request, res: Response) {
    try {
        const data = CreateExpenseSchema.parse(req.body)
        const expense = addExpense(data)
        return res.status(201).json(expense)
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({
                message: 'Validation Error',
                errors: err.errors
            })
        }
        console.error('Internal Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export function getExpenseId(req: Request, res: Response) {
    try {
        const { id } = req.params
        const expense = getExpenseById(id)
        if (!expense) return res.status(404).json({ message: 'Expense not found' })
        return res.status(200).json(expense)
    }
    catch (err) {
        console.error('GetExpenseById Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export function getListExpenseInGroup(req: Request, res: Response) {
    try {
        const { userId } = req.query
        const { groupId } = req.params
        let expense;
        if (userId && typeof userId === 'string') expense = listExpensesForUserInGroup(userId, groupId)
        else expense = listExpensesByGroupId(groupId)
        return res.status(200).json(expense)
    }
    catch (err) {
        console.error('GetExpenseGroup Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export function deleteExpense(req: Request, res: Response) {
    try {
        const { id } = req.params
        const deleted = removeExpense(id)
        if (!deleted) return res.status(404).json({ message: 'Expense not found' })
        return res.status(204).send()
    }
    catch (err) {
        console.error('DeleteExpense Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

