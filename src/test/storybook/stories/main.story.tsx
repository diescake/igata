import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { ListWrapper } from '@/app/components/ListWrapper'
// import Login from '@/app/containers/Login'

// FIXME: Preparing connect I/Fs to import container components
// storiesOf('Containers|Login', module).add('with no props', () => <Login />)

storiesOf('Components|Header', module)
  .add('with all', () => <Header userId={text('userId', 'diescake')} />)
  .add('with title and userId', () => <Header userId={text('userId', 'diescake')} />)
  .add('with title only', () => <Header userId={text('userId', '')} />)
  .add('with userId only', () => <Header userId={text('userId', 'diescake')} />)
  .add('with empty strings', () => <Header userId={text('userId', '')} />)

storiesOf('Components|Footer', module).add('with no props', () => <Footer />)

storiesOf('Components|ListWrapper', module)
  .add('with lists', () => (
    <ListWrapper loading={boolean('loading', false)}>
      <li>{text('item_01', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ')}</li>
      <li>{text('item_02', 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s')}</li>
      <li>{text('item_03', 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.')}</li>
    </ListWrapper>
  ))
  .add('with loading', () => (
    <ListWrapper loading={boolean('loading', true)}>
      <li>{text('item_01', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ')}</li>
      <li>{text('item_02', 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s')}</li>
      <li>{text('item_03', 'when an unknown printer took a galley of type and scrambled it to make a type specimen book.')}</li>
    </ListWrapper>
  ))
