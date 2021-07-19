import { ILoadSurveys } from '@/domain/usecases/load-surveys'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'

export class LoadSurveysController implements IController {
  constructor (private readonly loadSurveys: ILoadSurveys) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadSurveys.load()
    return null
  }
}
