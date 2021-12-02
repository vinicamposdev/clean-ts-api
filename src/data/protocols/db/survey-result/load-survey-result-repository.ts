import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (data: LoadSurveyResultRepository.Params) => Promise<LoadSurveyResultRepository.Result>
}

export namespace LoadSurveyResultRepository {
  export type Params = {
    surveyId: string
    accountId: string
  }
  export type Result = SurveyResultModel
}
