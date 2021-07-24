import { ILoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import { forbiden, InvalidParamError } from '@/presentation/middlewares/authentication-middleware-protocols'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export class SaveSurveyResultController implements IController {
  constructor (private readonly loadSurveyById: ILoadSurveyById) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    if (!survey) {
      return forbiden(new InvalidParamError('surveyId'))
    }
    return null
  }
}
