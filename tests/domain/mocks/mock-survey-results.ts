import { SurveyResultModel } from '../models/survey-result'

export const mockSurveyResultModel = (): SurveyResultModel => ({
  answers: [{
    answer: 'any_answer',
    count: 0,
    percent: 0,
    image: 'any_image'
  }, {
    answer: 'other_answer',
    count: 0,
    percent: 0
  }],
  date: new Date(),
  surveyId: 'any_survey_id',
  question: 'any_question'
})
