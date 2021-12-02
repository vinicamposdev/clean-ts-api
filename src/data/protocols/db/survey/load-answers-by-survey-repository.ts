export interface LoadAnswersBySurveyRepository {
  loadAnswers: (id: LoadAnswersBySurveyRepository.Params) => Promise<LoadAnswersBySurveyRepository.Result>
}

export namespace LoadAnswersBySurveyRepository {
  export type Params = string
  export type Result = string[]
}
