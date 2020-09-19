import { init, RematchRootState, RematchDispatch, Models as ReduxModels } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import createSelectPlugin from '@rematch/select'
import { useSelector as originUseSelector, useDispatch as originUseDispatch } from 'react-redux'

import { home } from '@/features/home/store'
import { my } from '@/features/my/store'
import { localeStore as locale } from '@/locales/store'

import { LoadingState } from './types'

const loading = createLoadingPlugin({})
const select = createSelectPlugin()

const models: ReduxModels = {
  locale,
  home,
  my,
}

const plugins = [select, loading]

export const store = init({ models, plugins })

export type Models = typeof models
export type Dispatch = RematchDispatch<Models>
export type RootState = RematchRootState<Models> & LoadingState<Models>

export const useDispatch = () => originUseDispatch<Dispatch>()
export const useSelector = <T>(selector: (state: RootState) => T) =>
  originUseSelector<RootState, T>(selector)
