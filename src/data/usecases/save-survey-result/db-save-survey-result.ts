import { SaveSurveyResult } from './db-save-survey-result-protocols'
import { ISaveSurveyResult } from '@/domain/usecases/save-survey-result'
import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey/save-survey-result-repository'
import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '@/domain/models/survey'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: ILoadSurveyByIdRepository,
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResult.Params): Promise<SurveyModel> {
    await this.saveSurveyResultRepository.save(data)
    const survey = await this.loadSurveyResultRepository.loadById(data.surveyId, data.accountId)
    return survey
  }
}
