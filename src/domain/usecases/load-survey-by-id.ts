import { SurveyModel } from '@/domain/models'

export interface LoadSurveyById {
  loadById: (id: LoadSurveyById.Params) => Promise<LoadSurveyById.Result>
}

export namespace LoadSurveyById {
  export type Params = string
  export type Result = SurveyModel
}
