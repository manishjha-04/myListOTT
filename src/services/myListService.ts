import User from "../models/User";
import MovieModel from "../models/Movies";
import TVShowModel from "../models/TVShow";

export const addItemToList = async (userId: string, itemId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new Error("User not found in DB");

  if(itemId.includes("movie")){
    const movie = await MovieModel.findOne({ id: itemId });
    if (!movie) throw new Error("Movie not found in DB");
    const isMovieInList = user.myList.some((item) => {
      console.log(item);
      console.log(item.id);
      return item.id == itemId});
    console.log(isMovieInList)
    if (!isMovieInList) {
      user.myList.push(movie);
      await user.save();
    }
    else throw new Error("Movie already in user's list");
  
    return "Success";

  }

  else{
    const show = await TVShowModel.findOne({ id: itemId });
    if (!show) throw new Error("TVShow not found in DB");
    const isShowInList = user.myList.some((item) => {
      console.log(item);
      console.log(item.id);
      return item.id == itemId;
    });
    console.log(isShowInList);
    if (!isShowInList) {
      user.myList.push(show);
      await user.save();
    } else throw new Error("TVShow already in user's list");

    return "Success";

  }

};

export const removeItemFromList = async (userId: string, itemId: string) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new Error("User not found");
  user.myList = user.myList.filter(({id}) => id !== itemId);
  await user.save();
  return user.myList;
};

export const listMyItems = async (
  userId: string
) => {
  const user = await User.findOne({ id: userId });
  if (!user) throw new Error("User not found");
  return user.myList;
};
