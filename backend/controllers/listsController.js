const TodoList = require("../models/listsModel"); // import list model
const mongoose = require("mongoose"); // import mongoose

// Get all lists
const getAllLists = async (req, res) => {
  const user_id = req.user.id; // get user id

  const lists = await TodoList.find({ user_id }).sort({ createdAt: -1 }); // get all lists
  res.status(200).json(lists); // return all lists
};

//Get Single list
const getSingleList = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No list found" }); // return error if no list found
  }

  const lists = await TodoList.findById(id); // get single list

  if (!lists) {
    return res.status(404).json({ error: "No list found" }); // return error if no list found
  }

  res.status(200).json(lists); // return single list
};

// Post new list
const createList = async (req, res) => {
  const { title, desc } = req.body;

  // add to db
  try {
    const user_id = req.user.id; // get user id
    const newList = await TodoList.create({
      title,
      desc,
      user_id,
    }); // create new list
    res.status(200).json(newList); // return new list
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete list
const deleteList = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No list found" }); // return error if no list found
  }

  const lists = await TodoList.findOneAndDelete({ _id: id }); // get single list

  if (!lists) {
    return res.status(404).json({ error: "No list found" }); // return error if no list found
  }

  res.status(200).json({ message: "List deleted successfully" }); // return single list
};

//Update list
const updateList = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No list found" }); // return error if no list found
  }

  const lists = await TodoList.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!lists) {
    return res.status(404).json({ error: "No list found" }); // return error if no list found
  }

  res.status(200).json({ message: "List updated successfully" }); // return single list
};

module.exports = {
  getAllLists,
  getSingleList,
  createList,
  deleteList,
  updateList,
}; // export controller
