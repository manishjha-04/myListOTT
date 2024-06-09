import { Request, Response } from "express";
import {
  addItemToList,
  removeItemFromList,
  listMyItems,
} from "../services/myListService";

export const addToMyList = async (req: Request, res: Response) => {
  try {
    const { userId, itemId } = req.body;
    const list = await addItemToList(userId, itemId);
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const removeFromMyList = async (req: Request, res: Response) => {
  try {
    const { userId, itemId } = req.body;
    const list = await removeItemFromList(userId, itemId);
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listItems = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const items = await listMyItems(userId);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
