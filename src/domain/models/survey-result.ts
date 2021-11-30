export type SurveyResultModel = {
  surveyId: string
  question: string
  answers: SurveyResultAnswerModel[]
  date: Date
}

type SurveyResultAnswerModel = {
  answer: string
  count: number
  image?: string
  percent: number
}
