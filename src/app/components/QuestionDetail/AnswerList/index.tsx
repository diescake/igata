import React, { FC } from 'react'
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
}

export const AnswerList: FC<Props> = (props: Props) => {
  return (
    <div>
      <div className={style.answerListTitle}>{words.question.answerNumber(props.answers.length)}</div>
      <hr className={style.hr} />
      <div className={style.mainArea}>
        <div className={style.infoArea} />
        <span className={style.contentArea}>
          {props.answers.map((answer: Answer) => (
            <>
              <AnswerItem
                key={answer.id}
                answer={answer}
                userId={props.userId}
                isQuestionDetail
                questionId={props.questionId}
                putAnswer={props.putAnswer}
              />
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
    </div>
  )
}
