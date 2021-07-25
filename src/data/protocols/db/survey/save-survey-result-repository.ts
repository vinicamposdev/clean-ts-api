import { SaveSurveyResultModel } from '@/domain/usecases/save-survey-result'

export interface ISaveSurveyResultRepository {
  save: (surveyData: SaveSurveyResultModel) => Promise<void>
}
