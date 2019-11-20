import clsx from 'clsx'
import React, { FC } from 'react'
import style from '@/app/components/VoteItem/style.scss'
import { VoteDispatcher } from '@/app/actions/vote'

interface Props {
  readonly userId: string
  readonly questionId: string
  readonly likeVoterIds: string[]
  readonly dislikeVoterIds: string[]
  readonly postVote: VoteDispatcher['postVote']
}

const VoteType = {
  Like: 'like_vote',
  dislike: 'dislike_vote',
}

export const VoteItem: FC<Props> = (props: Props) => {
  // 好き
  const handlePostLikeVote = () => {
    if (props.userId && props.questionId && props.postVote) {
      props.postVote(props.questionId, VoteType.Like)
    }
  }

  // 嫌い
  const handlePostDislikeVote = () => {
    if (props.userId && props.questionId && props.postVote) {
      props.postVote(props.questionId, VoteType.dislike)
    }
  }

  // 好きに投票出来る
  const isLikeVote = !props.likeVoterIds.find(userId => userId === props.userId)

  // 嫌いに投票出来る
  const isDislikeVote = !props.dislikeVoterIds.find(userId => userId === props.userId)

  const number = props.likeVoterIds.length - props.dislikeVoterIds.length

  return (
    <div>
      {/* ログインしてない状態 */}
      {!props.userId && (
        <>
          <div className={style.voteArrow}>▲</div>
          <div className={style.voteCount}>{number}</div>
          <div className={style.voteArrow}>▼</div>
        </>
      )}

      {/* ログインしてる状態 */}
      {props.userId && (
        <>
          {/* 好きに投票できない */}
          {!isLikeVote && <div className={style.voteArrow}>▲</div>}

          {/* 好きに投票できる */}
          {isLikeVote && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
            <div className={clsx(style.voteArrow, style.isActive)} onClick={handlePostLikeVote}>
              ▲
            </div>
          )}

          {/* 数 */}
          <div className={style.voteCount}>{number}</div>

          {/* 嫌いに投票できない */}
          {!isDislikeVote && <div className={style.voteArrow}>▼</div>}

          {/* 嫌いに投票できる */}
          {isDislikeVote && (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
            <div className={clsx(style.voteArrow, style.isActive)} onClick={handlePostDislikeVote}>
              ▼
            </div>
          )}
        </>
      )}
    </div>
  )
}
