import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'
import { faListAlt } from '@fortawesome/free-solid-svg-icons'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import { ListWrapper } from '@/app/components/ListWrapper'
import { Modal } from '@/app/components/Modal'
// import Login from '@/app/containers/Login'

// FIXME: Preparing connect I/Fs to import container components
// storiesOf('Containers|Login', module).add('with no props', () => <Login />)

storiesOf('Components|Header', module)
  .add('with all', () => (
    <Header title={text('title', 'TODO Application')} userId={text('userId', 'diescake')} icon={faListAlt} />
  ))
  .add('with title and userId', () => <Header title={text('title', 'TODO Application')} userId={text('userId', 'diescake')} />)
  .add('with title only', () => <Header title={text('title', 'TODO Application')} userId={text('userId', '')} />)
  .add('with userId only', () => <Header title={text('title', '')} userId={text('userId', 'diescake')} />)
  .add('with empty strings', () => <Header title={text('title', '')} userId={text('userId', '')} />)

storiesOf('Components|Footer', module).add('with no props', () => <Footer />)

const createModal = (hidden: boolean) => (
  <>
    <p>--- outside of modal ---</p>
    <Modal hidden={boolean('hidden', hidden)} name={text('name', 'Sample dialog')} close={() => console.log('close')}>
      <p>This is a sample modal description.</p>
    </Modal>
    <p>--- outside of modal ---</p>
  </>
)

storiesOf('Components|Modal', module)
  .add('hidden', () => createModal(true))
  .add('not hidden', () => createModal(false))

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
