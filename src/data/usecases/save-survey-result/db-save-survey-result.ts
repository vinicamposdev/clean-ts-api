import { SaveSurveyResultParams } from './db-save-survey-result-protocols'
import { ISaveSurveyResult } from '@/domain/usecases/save-survey-result'
import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: ISaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultParams): Promise<void> {
    await this.saveSurveyResultRepository.save(data)
  }
}
