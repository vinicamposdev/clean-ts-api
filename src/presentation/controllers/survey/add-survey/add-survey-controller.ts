import { IController, IHttpRequest, IHttpResponse, IValidation, IAddSurvey } from './add-survey-controller-protocols'
import { badRequest } from '@/presentation/helpers/http/http-helpers'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { question, answers } = httpRequest.body
    await this.addSurvey.add({
      question,
      answers
    })
    return await new Promise(resolve => resolve(null))
  }
}
