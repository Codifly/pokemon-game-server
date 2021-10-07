import userRepository from '../data/userRepository.js';

const getLeaderboard = async (ctx) => {
  const topUsers = await userRepository.find({}, {
    ['bestResult.score']: 'desc',
    ['bestResult.time']: 'desc'
  });

  const leaderboard = topUsers.map(({ bestResult, username }, index) => ({
    position: index + 1,
    name: username,
    score: bestResult.score,
    time: bestResult.time,
  }));

  ctx.body = leaderboard;
}

export default {
  getLeaderboard
}