import { Request, Response } from "express";
import { ZodError } from "zod";
import { addExpense, getExpenseById, listExpensesByGroupId, listExpensesForUserInGroup, removeExpense, updateExpenseById } from "@storage/expenses.js";
import { CreateExpenseSchema, UpdatedExpenseSchema } from "@validators/expense.validator.js";

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
        req.log.error({ err }, 'Internal Error');
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
        req.log.error({ err }, 'GetExpenseById Error');
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export async function getListExpenseInGroup(req: Request, res: Response) {
    try {
        const { userId } = req.query
        const { groupId } = req.params
        let expenses;
        if (userId && typeof userId === 'string') expenses = await listExpensesForUserInGroup(groupId, userId)
        else expenses = await listExpensesByGroupId(groupId)
        return res.status(200).json(expenses)
    }
    catch (err) {
        req.log.error({ err }, 'GetExpenseByGroupId Error');
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

export async function updateExpense(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const data = UpdatedExpenseSchema.parse(req.body);
        const updated = await updateExpenseById(id, data);
        if (!updated) return res.status(404).json({ message: "Expense not found" });
        return res.status(200).json(updated);
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({ message: "Validation Error", errors: err.errors });
        }
        req.log.error({ err }, "updateExpense error");
        return res.status(500).json({ message: "Internal server error" });
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
        req.log.error({ err }, 'DeleteExpense Error');
        return res.status(500).json({ message: 'Internal server Error' })
    }
}

