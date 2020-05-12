import { CommonArea } from './CommonAreaStore'

export class RootStore {
  commonArea: CommonArea

  constructor() {
    this.commonArea = new CommonArea()
  }
}