import { ILoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import { ILoadSurveyResult, LoadSurveyResult } from '@/domain/usecases/load-survey-result'

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor (
    private readonly loadSurveyResult: ILoadSurveyResultRepository
  ) {}

  async load (surveyId: string): Promise<LoadSurveyResult.Result> {
    const surveyResult = await this.loadSurveyResult.loadBySurveyId(surveyId)
    return surveyResult
  }
}
