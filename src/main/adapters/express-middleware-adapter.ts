import 'module-alias/register'
import { IMiddleware, IHttpRequest, IHttpResponse } from '@/presentation/protocols'
import { NextFunction, Request, Response } from 'express'

// Proxy Design Pattern
export const adaptMiddleware = (controller: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      headers: req.headers
    }

    const httpResponse: IHttpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpRequest.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
