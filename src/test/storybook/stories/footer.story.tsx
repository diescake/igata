import React from 'react'
import { storiesOf } from '@storybook/react'
import { Footer } from '@/app/components/Footer'
import { ListWrapper } from '@/app/components/ListWrapper'
// import Login from '@/app/containers/Login'

// FIXME: import reboot.css
// import '@/assets/css/reboot.css'

import '@/assets/css/common.scss'

// FIXME: Preparing connect I/Fs to import container components
// storiesOf('Containers|Login', module).add('with no props', () => <Login />)

storiesOf('Components|Footer', module)
  .add('with no props', () => <Footer />)
  .add('with @diescake', () => <Footer copyright="@diescake" />)
  .add('with @pankona', () => <Footer copyright="@pankona" />)

storiesOf('Components|ListWrapper', module)
  .add('with no props', () => <ListWrapper />)
  .add('with lists', () => (
    <ListWrapper>
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
    </ListWrapper>
  ))
