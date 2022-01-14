import * as repository from './repository'

export async function getLocationOnSheet() {
  return await repository.getSheetData()
}
