import React, { FC } from 'react'
import { Loading } from '@/app/components/Loading'
import style from '@/app/components/QuestionDetail/AnswerList/style.scss'
import { Comment } from '@/app/models/Question'
import words from '@/assets/strings'
import { CommentItem } from '@/app/components/CommentItem'
import { CommentPost } from '@/app/components/CommentPost'
import { AnswerDispatcher } from '@/app/actions/answer'
import { Answer } from '@/app/models/Answer'
import { AnswerItem } from '@/app/components/AnswerItem'
import { CommentDispatcher } from '@/app/actions/comment'

export interface Props {
  readonly userId: string
  readonly questionId: string
  readonly answers: Answer[]
  readonly postCommentAnswer: CommentDispatcher['postCommentAnswer']
  readonly putCommentAnswer: CommentDispatcher['putCommentAnswer']
  readonly postAnswer: AnswerDispatcher['postAnswer']
  readonly putAnswer: AnswerDispatcher['putAnswer']
  readonly isLoading: boolean
}

export const AnswerList: FC<Props> = (props: Props) => {
  if (props.isLoading) {
    // 読み込み演出
    return (
      <div className={style.loading}>
        <Loading visible={false} />
      </div>
    )
  }

  return (
    <div className={style.answerList}>
      <div className={style.answerListTitle}>{words.question.answerNumber(props.answers.length)}</div>
      <hr className={style.hr} />
      <span>
        {props.answers.map((answer: Answer) => (
          <>
            <AnswerItem key={answer.id} answer={answer} isUserIdShow questionId={props.questionId} putAnswer={props.putAnswer} />
            {answer.comments.map((comment: Comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                userId={props.userId}
                putCommentAnswer={props.putCommentAnswer}
                questionId={props.questionId}
                answerId={answer.id}
              />
            ))}
            <CommentPost
              key={answer.id}
              userId={props.userId}
              postCommentAnswer={props.postCommentAnswer}
              questionId={props.questionId}
              answerId={answer.id}
            />
          </>
        ))}
      </span>
    </div>
  )
}
