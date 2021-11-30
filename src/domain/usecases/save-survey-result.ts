import { SurveyResultModel } from '../models/survey-result'

export namespace SaveSurveyResult {
  export type Params = {
    surveyId: string
    accountId: string
    answer: string
    date: Date
  }

  export type Result = SurveyResultModel
}

export interface ISaveSurveyResult {
  save: (data: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Result>
}
