export interface CheckSurveyById {
  checkById: (id: CheckSurveyById.Params) => Promise<CheckSurveyById.Result>
}

export namespace CheckSurveyById {
  export type Params = string
  export type Result = boolean
}
