import { addRoutes } from '@/routes'
import { store } from '@/stores'

export type InitFeatureParams = {
  addLocal: typeof store.dispatch.locale.addMsg
  addRoutes: typeof addRoutes
}
