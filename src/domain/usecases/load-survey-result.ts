import { SurveyResultModel } from '../models/survey-result'

export namespace LoadSurveyResult {
  export type Params = string

  export type Result = SurveyResultModel
}

export interface ILoadSurveyResult {
  load: (surveyId: LoadSurveyResult.Params) => Promise<LoadSurveyResult.Result>
}
