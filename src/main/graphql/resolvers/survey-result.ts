import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories'

export default {
  Query: {
    surveysResult: async () => await adaptResolver(makeLoadSurveyResultController())
  },

  Mutation: {
    saveSurveysResult: async (parent: any, args: any) => await adaptResolver(makeSaveSurveyResultController(), args)
  }
}
