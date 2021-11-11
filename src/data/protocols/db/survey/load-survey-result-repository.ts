import { SaveSurveyResult } from '@/domain/usecases/save-survey-result'

export interface ILoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string) => Promise<SaveSurveyResult.Result>
}
