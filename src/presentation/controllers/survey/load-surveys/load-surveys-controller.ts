import { ILoadSurveys } from '@/domain/usecases/load-surveys'
import { ok } from '@/presentation/middlewares/authentication-middleware-protocols'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export class LoadSurveysController implements IController {
  constructor (private readonly loadSurveys: ILoadSurveys) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const surveys = await this.loadSurveys.load()
    return ok(surveys)
  }
}
