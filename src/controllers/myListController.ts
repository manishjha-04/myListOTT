import { Request, Response } from "express";
import { addItemToList, removeItemFromList, listMyItems } from "../services/myListService";

// Utility function for error responses
const handleError = (res: Response, error: unknown, statusCode: number = 400) => {
  res.status(statusCode).json({ error: (error instanceof Error) ? error.message : String(error) });
};

export const addToMyList = async (req: Request, res: Response) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ error: "userId and itemId are required" });
    }

    const list = await addItemToList(userId, itemId);
    res.status(200).json({ message: "Item added successfully", list });
  } catch (error) {
    handleError(res, error);
  }
};

export const removeFromMyList = async (req: Request, res: Response) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ error: "userId and itemId are required" });
    }

    const list = await removeItemFromList(userId, itemId);
    res.status(200).json({ message: "Item removed successfully", list });
  } catch (error) {
    handleError(res, error);
  }
};

export const listItems = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 10;

    const items = await listMyItems(userId, page, pageSize);
    res.status(200).json({ message: "Items retrieved successfully", items });
  } catch (error) {
    handleError(res, error); 
  }
};
