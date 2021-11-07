import { SurveyResultModel } from '../models/survey-result'

export namespace SaveSurveyResult {
  export type Params = string

  export type Result = SurveyResultModel
}

export interface ISaveSurveyResult {
  save: (surveyId: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Result>
}
