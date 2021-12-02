import { LoadAnswersBySurvey } from '@/domain/usecases'
import { LoadAnswersBySurveyRepository } from '@/data/protocols'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (private readonly loadAnswersBySurveyRepository: LoadAnswersBySurveyRepository) {}

  async loadAnswers (id: LoadAnswersBySurvey.Params): Promise<LoadAnswersBySurvey.Result> {
    const answers = await this.loadAnswersBySurveyRepository.loadAnswers(id)
    return answers || []
  }
}
