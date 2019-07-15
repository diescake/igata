import React, { FC, useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import style from '@/app/containers/ProgressBar/style.scss'
import { RootState } from '@/app/models'

interface StateProps {
  readonly connectionCount: number
}

type ProgressBarProps = StateProps
type ProgressState = 'idle' | 'running' | 'closing'

const mapStateToProps = (state: RootState): StateProps => ({
  connectionCount: state.networkState.connectionCount,
})

const ProgressBar: FC<ProgressBarProps> = ({ connectionCount }: ProgressBarProps) => {
  const [progressState, setProgressState] = useState<ProgressState>('idle')
  const divEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!divEl.current) {
      return
    }

    const transitionEndListener = () => {
      setProgressState('idle')
    }
    divEl.current.addEventListener('transitionend', transitionEndListener)

    // eslint-disable-next-line consistent-return
    return () => {
      if (!divEl.current) {
        console.warn('Possibly the eventListener is leaked.')
        return
      }
      divEl.current.removeEventListener('transitionend', transitionEndListener)
    }
  }, [divEl.current])

  useEffect(() => setProgressState(connectionCount > 0 ? 'running' : 'closing'), [connectionCount])

  return <div ref={divEl} className={style[progressState]} />
}

export default connect(mapStateToProps)(ProgressBar)
