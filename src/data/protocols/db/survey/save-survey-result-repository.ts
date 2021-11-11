import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

export interface ISaveSurveyResultRepository {
  save: (surveyData: SaveSurveyResult.Params) => Promise<SaveSurveyResult.Result>
}
