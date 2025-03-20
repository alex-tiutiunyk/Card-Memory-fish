const User = require('../models/user');
const mongoose = require('mongoose');

exports.saveGameData = async (req, res) => {
  const userID = req.params.id;
  const { gameDate, failed, difficulty, completed, timeTaken } = req.body;
  console.log('Received data to save:', req.body);

  try {
    if (
      !userID ||
      !gameDate ||
      difficulty === undefined ||
      completed === undefined ||
      timeTaken === undefined
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newSave = {
      gameDate,
      failed,
      difficulty,
      completed,
      timeTaken,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { $push: { results: newSave } },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.status(201).json({ message: 'Game data saved successfully' });
  } catch (error) {
    console.error('Error saving game data:', error);
    res.status(500).json({ message: 'Error saving game data', error });
  }
};

exports.fetchGameData = async (req, res) => {
  const userID = req.params.id;

  if (!mongoose.isValidObjectId(userID)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  const user = await User.findById(userID);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
  try {
  } catch (error) {
    console.error('Error fetch user data:', error);
    res.status(500).json({ message: 'Error fetch user data', error });
  }
};
