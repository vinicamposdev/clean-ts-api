import { SaveSurveyResultParams } from '@/domain/usecases/save-survey-result'

export interface ISaveSurveyResultRepository {
  save: (surveyData: SaveSurveyResultParams) => Promise<void>
}
