import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean } from '@storybook/addon-knobs'
import { Loading } from '@/app/components/Loading'

storiesOf('Components|Loading', module)
  .add('with  loading finish', () => <Loading visible={boolean('loading', true)} />)
  .add('with loading ', () => <Loading visible={boolean('loading', false)} />)
