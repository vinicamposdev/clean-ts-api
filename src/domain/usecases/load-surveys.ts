import { SurveyModel } from '@/domain/models'

export interface LoadSurveys {
  load: (accountId: LoadSurveys.Params) => Promise<LoadSurveys.Result>
}

export namespace LoadSurveys {
  export type Params = string
  export type Result = SurveyModel[]
}
