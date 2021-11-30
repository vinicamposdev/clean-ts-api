import { SaveSurveyResult } from './db-save-survey-result-protocols'
import { ISaveSurveyResult } from '@/domain/usecases/save-survey-result'
import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { ILoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(data)
    return await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
  }
}
