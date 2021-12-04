import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    surveysResult: (surveyId: String!): SurveyResult! @auth
  }

  extend type Mutation {
    saveSurveysResult (surveyId: String!, answer: String!): Account!
  }

  type SurveyResult {
    surveyId: String!
    question: String!
    answers: [Answer!]!
    date: DateTime!
  }

  type Answer {
    image: String
    answer: String!
    count: Int!
    percent: Int!
    isCurrentAccountAnswer: Boolean!
  }
`
