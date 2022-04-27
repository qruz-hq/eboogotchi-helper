export interface EboogotchiLeaderboardEntry {
  address: string;
  score: number;
}

export default class EboogotchiLeaderboard extends Array<EboogotchiLeaderboardEntry> {
  constructor() {
    super();
  }

  addScore(address: string) {
    const entry = this.find((entry) => entry.address === address);
    if (!entry) {
      this.push({
        address,
        score: 1,
      });
    } else {
      entry.score += 1;
    }
  }

  sortLeaderboard() {
    return this.sort((a, b) => {
      return b.score - a.score;
    });
  }
}
