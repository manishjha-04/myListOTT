import { Router } from "express";
import {
  addToMyList,
  removeFromMyList,
  listItems,
} from "../controllers/myListController";

const router = Router();

router.post("/add", addToMyList);
router.post("/remove", removeFromMyList);
router.get("/list/:userId", listItems);

export default router;
