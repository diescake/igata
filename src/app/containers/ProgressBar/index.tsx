import React, { FC } from 'react'
import { connect } from 'react-redux'
import style from '@/app/containers/ProgressBar/style.scss'
import { RootState } from '@/app/models'

interface StateProps {
  readonly connectionCount: number
}

type ProgressBarProps = StateProps

const mapStateToProps = (state: RootState): StateProps => ({
  connectionCount: state.networkState.connectionCount,
})

const ProgressBar: FC<ProgressBarProps> = ({ connectionCount }: ProgressBarProps) =>
  connectionCount > 0 ? <div className={style.bar} /> : <div className={style.hiddenBar} />

export default connect(mapStateToProps)(ProgressBar)
