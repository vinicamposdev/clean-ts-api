export interface CheckSurveyByIdRepository {
  checkById: (id: CheckSurveyByIdRepository.Params) => Promise<CheckSurveyByIdRepository.Result>
}

export namespace CheckSurveyByIdRepository {
  export type Params = string
  export type Result = boolean
}
