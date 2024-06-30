import User from "../models/User";
import MovieModel from "../models/Movies";
import TVShowModel from "../models/TVShow";
import { getRedisClient } from "../redis/config";

const checkUserExists = async (userId: string): Promise<boolean> => {
  const userExists = await User.exists({ id: userId });
  return !!userExists;
};

const updateRedisCache = async (userId: string, data: any): Promise<void> => {
  const redisClient = getRedisClient();
  await redisClient.set(userId, JSON.stringify(data));
};

const getFromRedisCache = async (userId: string): Promise<any> => {
  const redisClient = getRedisClient();
  const data = await redisClient.get(userId);
  return data ? JSON.parse(data) : null;
};

const getItem = async (itemId: string): Promise<any> => {
  if (itemId.includes("movie")) {
    return await MovieModel.findOne({ id: itemId });
  } else {
    return await TVShowModel.findOne({ id: itemId });
  }
};

export const addItemToList = async (userId: string, itemId: string): Promise<string> => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new Error("User not found in DB");

  const item = await getItem(itemId);
  if (!item) throw new Error(itemId.includes("movie") ? "Movie not found in DB" : "TVShow not found in DB");

  const isItemInList = user.myList.some((listItem) => listItem.id === itemId);
  if (isItemInList) {
    throw new Error(itemId.includes("movie") ? "Movie already in user's list" : "TVShow already in user's list");
  }

  await User.updateOne(
    { id: userId },
    { $push: { myList: item } }
  );

  const updatedUser = await User.findOne({ id: userId });
  await updateRedisCache(userId, updatedUser.myList);

  return "Success";
};

export const removeItemFromList = async (userId: string, itemId: string): Promise<any> => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new Error("User not found");

  await User.updateOne(
    { id: userId },
    { $pull: { myList: { id: itemId } } }
  );

  const updatedUser = await User.findOne({ id: userId });
  await updateRedisCache(userId, updatedUser.myList);

  return updatedUser.myList;
};

export const listMyItems = async (userId: string): Promise<any> => {
  if (!await checkUserExists(userId)) {
    throw new Error("User not found");
  }

  let userItems = await getFromRedisCache(userId);
  if (!userItems) {
    const user = await User.findOne({ id: userId });
    if (!user) throw new Error("User not found");
    userItems = user.myList;
    await updateRedisCache(userId, userItems);
  }

  return userItems;
};
