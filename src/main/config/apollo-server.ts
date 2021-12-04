import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'
import schemaDirectives from '@/main/graphql/directives'

import { ApolloServer } from 'apollo-server-express'
import { Express } from 'express'
import { GraphQLError } from 'graphql'

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  errors.forEach(error => {
    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
      response.data = undefined
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
      response.data = undefined
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
      response.data = undefined
    } else {
      response.http.status = 403
      response.data = undefined
    }
  })
}

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError.name].some(name => name === errorName)
}

export default (app: Express): void => {
  const server = new ApolloServer({
    typeDefs,
    schemaDirectives,
    resolvers,
    context: ({ req }): any => ({ req }),
    plugins: [{
      requestDidStart: () => ({
        willSendResponse: ({ response, errors }) => handleErrors(response, errors)
      })
    }]
  })

  server.applyMiddleware({ app })
}
