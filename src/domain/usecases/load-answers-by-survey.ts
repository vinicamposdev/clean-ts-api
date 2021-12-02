export interface LoadAnswersBySurvey {
  loadAnswers: (id: LoadAnswersBySurvey.Params) => Promise<LoadAnswersBySurvey.Result>
}

export namespace LoadAnswersBySurvey {
  export type Params = string
  export type Result = string[]
}
