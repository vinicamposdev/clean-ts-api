import 'module-alias/register'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body,
      params: req.params,
      accountId: req.accountId
    }

    const httpResponse: IHttpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
