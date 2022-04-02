import premadeLists from "@/data/lists"
import { Card } from "@/types/index"

export default {
  lists: premadeLists,

  generateSingleCard(): Card {
    return {
      id: this.generateId(),
      name: this.generateName(this.lists.names),
      type: this.generateType(this.lists.types),
      text: this.generateText(this.lists.words),
      statA: this.generateStat(),
      statB: this.generateStat(),
      image: this.generateImage(this.lists.images),
    }
  },

  generateBatch(batchSize: number): Card[] {
    const batchOutput = []
    const batchNames = this.lists.names
      .sort(() => 0.5 - Math.random())
      .slice(0, batchSize)
    const batchImages = this.lists.images
      .sort(() => 0.5 - Math.random())
      .slice(0, batchSize)
    for (let i = 0; i < batchSize; i++) {
      let name = batchNames.length > 0 ? batchNames.pop() : this.lists.names[0]
      let image =
        batchImages.length > 0 ? batchImages.pop() : this.lists.images[0]
      name = name === undefined ? this.lists.names[0] : name
      image = image === undefined ? this.lists.images[0] : image
      const type = this.generateType(this.lists.types)
      const text = this.generateText(this.lists.words)
      const statA = this.generateStat()
      const statB = this.generateStat()
      const id = this.generateId()
      batchOutput.push({ id, name, type, text, statA, statB, image })
    }
    return batchOutput
  },

  generateText(wordlist: string[]) {
    let text = ""
    const textLength = 8 + Math.floor(Math.random() * 5)
    for (let i = 0; i < textLength; i++) {
      const id = Math.floor(Math.random() * wordlist.length)
      text += `${wordlist[id]} `
    }
    text = text.trim()
    text = text[0].toUpperCase() + text.substring(1, text.length)
    return text
  },

  generateStat(min = 0, max = 9) {
    return Math.floor(Math.random() * (max + 1)) + min
  },

  generateId() {
    return (
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    )
  },

  generateType(typeList: string[]) {
    return typeList[Math.floor(Math.random() * typeList.length)]
  },

  generateName(nameList: string[]) {
    return nameList[Math.floor(Math.random() * nameList.length)]
  },

  generateImage(imageList: string[]) {
    return imageList[Math.floor(Math.random() * imageList.length)]
  },
}
