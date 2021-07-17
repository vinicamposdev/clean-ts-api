import { IHttpResponse, IHttpRequest } from '@/presentation/protocols/http'

export interface IMiddleware {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
