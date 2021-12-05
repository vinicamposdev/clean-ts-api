import typeDefs from '@/main/graphql/type-defs'
import resolvers from '@/main/graphql/resolvers'
import schemaDirectives from '@/main/graphql/directives'

import { ApolloServer } from 'apollo-server-express'
import { GraphQLError } from 'graphql'

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  errors?.forEach(error => {
    response.data = undefined
    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
    } else {
      response.http.status = 500
    }
  })
}

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error?.originalError?.name].some(name => name === errorName)
}

export const setupApolloServer = (): ApolloServer => new ApolloServer({
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
