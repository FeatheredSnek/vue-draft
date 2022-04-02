import premadeLists from "@/data/lists";
import { Card } from "@/types/index";

export default {

  lists: premadeLists,

  generateCard (
      names: string[], 
      types: string[], 
      words: string[], 
      images: string[],
      statMax: number,
      statMin: number) : Card {
    const name = names[Math.floor(Math.random() * names.length)]
    const type = types[Math.floor(Math.random() * types.length)]
    const image = images[Math.floor(Math.random() * images.length)]
    let text = ''
    const textLength = 8 + Math.floor(Math.random() * 5)
    for (let i = 0; i < textLength; i++) {
      const id = Math.floor(Math.random() * words.length)
      text += `${words[id]} `
    }
    text = text.trim()
    text = text[0].toUpperCase() + text.substring(1,text.length)
    const id = Math.random().toString(36).slice(2)
    const statA = Math.floor(Math.random() * (statMax + 1)) + statMin
    const statB = Math.floor(Math.random() * (statMax + 1)) + statMin
    return {id, name, type, text, statA, statB, image}
  },

  generateBatch (batchSize: number) : Card[] {
    const batchOutput = []
    for (let i = 0; i < batchSize; i++) {
      batchOutput.push(this.generateCard(
        this.lists.names,
        this.lists.types,
        this.lists.words,
        this.lists.images,
        9,
        0))
    }
    return batchOutput
  }
}