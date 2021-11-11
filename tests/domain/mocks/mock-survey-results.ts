import { SurveyResultModel } from '../models/survey-result'

export const mockSurveyResultModel = (): SurveyResultModel => ({
  accountId: 'any_account_id',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 60,
    image: 'any_image'
  }, {
    answer: 'other_answer',
    count: 10,
    percent: 40
  }],
  date: new Date(),
  surveyId: 'any_survey_id'
})
