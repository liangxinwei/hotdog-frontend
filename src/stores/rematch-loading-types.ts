import { ModelConfig, ModelEffects, Models } from '@rematch/core'

type ExtraRematchLoadingFromEffects<
  effects extends ModelConfig['effects']
> = effects extends (...args: any[]) => infer R
  ? R extends ModelEffects<any>
    ? ExtractRematchLoadingFromEffectsObject<R>
    : {}
  : effects extends ModelEffects<any>
  ? ExtractRematchLoadingFromEffectsObject<effects>
  : {}

type ExtractRematchLoadingFromEffectsObject<effects extends ModelEffects<any>> = {
  [effectKey in keyof effects]: boolean
}

export interface LoadingState<M extends Models> {
  loading: {
    global: boolean
    models: { [k in keyof M]: boolean }
    effects: {
      [k in keyof M]: ExtraRematchLoadingFromEffects<M[k]['effects']>
    }
  }
}
