export type SurveyResultModel = {
  surveyId: string
  accountId: string
  answers: SurveyResultAnswerModel[]
  date: Date
}

type SurveyResultAnswerModel = {
  answer: string
  count: number
  image?: string
  percent: number
}
