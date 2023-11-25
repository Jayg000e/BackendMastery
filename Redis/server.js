const express = require('express');
const Redis = require('ioredis');
const app = express();
const redis = new Redis(); // Connects to 127.0.0.1:6379 by default

app.use(express.json()); // For parsing JSON request bodies

const port = 3000;

app.post('/add-score', async (req, res) => {
  const { username, score } = req.body;
  if (!username || score === undefined) {
    return res.status(400).send('Username and score are required');
  }

  try {
    await addScore(username, score);
    res.status(200).send(`Score added for ${username}`);
  } catch (error) {
    res.status(500).send('Error adding score');
  }
});

app.get('/top-scores', async (req, res) => {
  const limit = req.query.limit || 10; // Default to top 10 if limit not provided
  try {
    const topScores = await getTopScores(limit);
    res.status(200).json(topScores);
  } catch (error) {
    res.status(500).send('Error retrieving top scores');
  }
});

app.get('/user-rank', async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).send('Username is required');
  }

  try {
    const rank = await getUserRank(username);
    res.status(200).send(`Rank of ${username}: ${rank}`);
  } catch (error) {
    res.status(500).send('Error retrieving user rank');
  }
});

async function addScore(username, score) {
  await redis.zadd('game_leaderboard', score, username);
  console.log(`User ${username} added/updated with score ${score}`);
}

async function getTopScores(limit) {
  const topScores = await redis.zrevrange('game_leaderboard', 0, limit - 1, 'WITHSCORES');
  console.log('Top Scores:', topScores);
  return topScores;
}

async function getUserRank(username) {
  const rank = await redis.zrevrank('game_leaderboard', username);
  console.log(`Rank of ${username}:`, rank + 1); // rank is 0-indexed
  return rank + 1;
}
  
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
