import { ILoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import { InvalidParamError } from '@/presentation/errors'
import { forbiden, serverError } from '@/presentation/middlewares/authentication-middleware-protocols'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export class LoadSurveyResultController implements IController {
  constructor (private readonly loadSurveyById: ILoadSurveyById) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      if (!survey) {
        return forbiden(new InvalidParamError('surveyId'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
