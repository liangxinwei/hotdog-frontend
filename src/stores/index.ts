import { init, RematchRootState, RematchDispatch } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import createSelectPlugin from '@rematch/select'
import { useSelector as originUseSelector, useDispatch as originUseDispatch } from 'react-redux'

import { home } from '@/features/home/store'
import { my } from '@/features/my/store'

import { LoadingState } from './rematch-loading-types'

const loading = createLoadingPlugin({})
const select = createSelectPlugin()

const models = {
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
