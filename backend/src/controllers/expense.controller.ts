import { Request, Response } from "express";
import { ZodError } from "zod";
import { addExpense, getExpenseById, listExpensesByGroupId, listExpensesForUserInGroup, removeExpense } from "../storage";
import { CreateExpenseSchema } from "../validators";

export async function createExpense(req: Request, res: Response) {
    try {
        const data = CreateExpenseSchema.parse(req.body)
        const expense = await addExpense(data)
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

export async function getExpenseId(req: Request, res: Response) {
    try {
        const { id } = req.params
        const expense = await getExpenseById(id)
        if (!expense) return res.status(404).json({ message: 'Expense not found' })
        return res.status(200).json(expense)
    }
    catch (err) {
        console.error('GetExpenseById Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export async function getListExpenseInGroup(req: Request, res: Response) {
    try {
        const { userId } = req.query
        const { groupId } = req.params
        let expense;
        if (userId && typeof userId === 'string') expense = await listExpensesForUserInGroup(groupId, userId)
        else expense = await listExpensesByGroupId(groupId)
        return res.status(200).json(expense)
    }
    catch (err) {
        console.error('GetExpenseGroup Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export async function deleteExpense(req: Request, res: Response) {
    try {
        const { id } = req.params
        const deleted = await removeExpense(id)
        if (!deleted) return res.status(404).json({ message: 'Expense not found' })
        return res.status(204).send()
    }
    catch (err) {
        console.error('DeleteExpense Error: ' + err);
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

