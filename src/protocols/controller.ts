import { IHttpResponse, IHttpRequest } from '@/protocols/http'

export interface IController {
  handle: (httpRequest: IHttpRequest) => IHttpResponse
}
