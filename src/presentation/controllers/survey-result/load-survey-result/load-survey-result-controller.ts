import { ILoadSurveyById } from '@/domain/usecases/load-survey-by-id'
import { forbidden } from '@/main/docs/components'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export class LoadSurveyResultController implements IController {
  constructor (private readonly loadSurveyById: ILoadSurveyById) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'))
    }
    return await Promise.resolve(null)
  }
}
