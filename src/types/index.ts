export interface Card {
  id: string
  name: string
  type: string,
  statA: number,
  statB: number,
  image: string
}

export interface State {
  currentDeal: Card[],
  currentDeck: Card[],
  currentRound: number
}