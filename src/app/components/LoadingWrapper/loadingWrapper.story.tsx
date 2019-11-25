import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'
import { LoadingWrapper } from '@/app/components/LoadingWrapper'

storiesOf('Components|LoadingWrapper', module)
  .add('with lists', () => (
    <LoadingWrapper loading={boolean('loading', false)}>
      <li>{text('item_01', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ')}</li>
      <li>{text('item_02', 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s')}</li>
      <li>{text('item_03', 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.')}</li>
    </LoadingWrapper>
  ))
  .add('with loading', () => (
    <LoadingWrapper loading={boolean('loading', true)}>
      <li>{text('item_01', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ')}</li>
      <li>{text('item_02', 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s')}</li>
      <li>{text('item_03', 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.')}</li>
    </LoadingWrapper>
  ))
