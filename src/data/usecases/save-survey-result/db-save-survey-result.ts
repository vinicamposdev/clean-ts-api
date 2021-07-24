import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { SaveSurveyResultModel } from './db-save-survey-result-protocols'
import { ISaveSurveyResult } from '@/domain/usecases/save-survey-result'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (private readonly saveSurveyResultRepository: ISaveSurveyResultRepository) {}
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    return await this.saveSurveyResultRepository.save(data)
  }
}
