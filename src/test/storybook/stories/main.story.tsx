import React from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { ListWrapper } from '@/app/components/ListWrapper'
// import Login from '@/app/containers/Login'

// FIXME: Preparing connect I/Fs to import container components
// storiesOf('Containers|Login', module).add('with no props', () => <Login />)

storiesOf('Components|Header', module)
  .add('with both', () => <Header title={text('title', 'TODO Application')} userId={text('userId', 'diescake')} />)
  .add('with title only', () => <Header title={text('title', 'TODO Application')} userId={text('userId', '')} />)
  .add('with userId only', () => <Header title={text('title', '')} userId={text('userId', 'diescake')} />)
  .add('with empty strings', () => <Header title={text('title', '')} userId={text('userId', '')} />)

storiesOf('Components|Footer', module)
  .add('with @diescake ', () => <Footer copyright={text('copyright', 'diescake')} />)
  .add('with @pankona', () => <Footer copyright={text('copyright', 'pankona')} />)
  .add('with no props', () => <Footer copyright={text('copyright', '')} />)

storiesOf('Components|ListWrapper', module)
  .add('with lists', () => (
    <ListWrapper>
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </ListWrapper>
  ))
  .add('with no props', () => <ListWrapper />)
