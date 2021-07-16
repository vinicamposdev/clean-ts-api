export interface IAddSurveyModel {
  question: string
  answers: ISurveyAnswers[]
}

export interface ISurveyAnswers {
  image?: string
  answer: string
}

export interface IAddSurvey {
  add: (data: IAddSurveyModel) => Promise<void>
}
