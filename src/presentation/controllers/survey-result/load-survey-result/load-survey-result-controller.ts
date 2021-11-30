import { ILoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import { ILoadSurveyResult } from '@/domain/usecases/load-survey-result'
import { InvalidParamError } from '@/presentation/errors'
import { forbiden, serverError, ok } from '@/presentation/middlewares/authentication-middleware-protocols'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export class LoadSurveyResultController implements IController {
  constructor (
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly loadSurveyResult: ILoadSurveyResult
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      if (!survey) {
        return forbiden(new InvalidParamError('surveyId'))
      }
      const { surveyId } = httpRequest.params
      const surveyResult = await this.loadSurveyResult.load(surveyId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
