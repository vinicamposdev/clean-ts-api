import { adaptResolver } from '@/main/adapters'
import { makeLoadSurveyResultController } from '@/main/factories'

export default {
  Query: {
    surveysResult: async () => await adaptResolver(makeLoadSurveyResultController())
  }
}
