import { ILoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export class SaveSurveyResultController implements IController {
  constructor (private readonly loadSurveyById: ILoadSurveyById) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return null
  }
}
