export type IAddSurveyModel = {
  question: string
  answers: ISurveyAnswers[]
}

export type ISurveyAnswers = {
  image?: string
  answer: string
}

export interface IAddSurvey {
  add: (data: IAddSurveyModel) => Promise<void>
}
