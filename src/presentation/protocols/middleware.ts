import { HttpResponse, HttpRequest } from '@/presentation/protocols'

export interface Middleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
