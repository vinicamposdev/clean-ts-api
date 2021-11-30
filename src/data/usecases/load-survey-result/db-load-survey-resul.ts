import { ILoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { ILoadSurveyResultRepository } from '@/data/protocols/db/survey/load-survey-result-repository'
import { SurveyModel } from '@/domain/models/survey'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { ILoadSurveyResult } from '@/domain/usecases/load-survey-result'

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      return this.makeEmptyResult(survey)
    }
    return surveyResult
  }

  private makeEmptyResult (survey: SurveyModel): SurveyResultModel {
    return {
      surveyId: survey.id,
      question: survey.question,
      date: survey.date,
      answers: survey.answers.map(answer => ({
        ...answer,
        count: 0,
        percent: 0
      }))
    }
  }
}
