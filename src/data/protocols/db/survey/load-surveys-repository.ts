import { SurveyModel } from '@/domain/models'

export interface LoadSurveysRepository {
  loadAll: (accountId: LoadSurveysRepository.Params) => Promise<LoadSurveysRepository.Result>
}

export namespace LoadSurveysRepository {
  export type Params = string
  export type Result = SurveyModel[]
}
