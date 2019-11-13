import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

import { Header } from '@/app/components/Header'
import { login, LoginDispatcher } from '@/app/actions/login'
import { RootState } from '@/app/models'
import words from '@/assets/strings'
import style from '@/app/containers/Question/style.scss'
import { VoteItem } from '@/app/components/VoteItem'

interface StateProps {
  readonly key: string
}

interface DispatchProps {
  readonly login: LoginDispatcher['login']
}

type QuestionProps = StateProps & DispatchProps & RouteComponentProps

const mapStateToProps = (state: RootState): StateProps => ({
  key: state.loginState.session.key,
})

const mapDispatchToProps: DispatchProps = {
  login,
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Question: FC<QuestionProps> = (props: QuestionProps) => {
  return (
    <div className={style.container}>
      <Header title={words.login.title} icon={faSignInAlt} />
      <div className={style.main}>
        {/* 質問 */}
        <div className={style.question}>
          {/* タイトル */}
          <div className={style.pageTitle}>タイトル</div>
          <hr />

          {/* メインエリア */}
          <div className={style.mainArea}>
            {/* 情報エリア */}
            <div className={style.infoArea}>
              <VoteItem />
            </div>

            {/* コンテンツエリア */}
            <div className={style.contentArea}>
              <div>
                <div className={style.body}>テスト</div>
                <div className={style.additional}>
                  Posted at 2019-xx-xxxxxxxx
                  <a href="xxxxxxxxxxxx">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</a>
                </div>
              </div>
              <hr />
              <div className={style.commentList}>コメントするにはログインしてください。</div>
            </div>
          </div>
        </div>

        {/* 回答一覧 */}
        <div className={style.answerList}>
          <div className={style.answerListTitle}>3件の回答</div>
          <hr />
          {/* 回答 */}
          <span>
            <div>
              <div className={style.mainArea}>
                <div className={style.infoArea} />
                <div className={style.contentArea}>
                  <div>
                    <div className={style.body}>回答コメント１</div>
                    <div className={style.additional}>
                      Posted at 2019-mm-dd
                      <a href="xxxxxxxxxxxx">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</a>
                    </div>
                  </div>
                  <hr />
                  <div className={style.commentList}>
                    <span>
                      <div className={style.comment}>
                        <div>
                          <div className={style.content}>
                            <span className={style.body}>テスト</span>
                            <span className={style.additional}>
                              Posted at 2019-xx-xxxxxxxx
                              <a href="xxxxxxxxxxxx">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</a>
                            </span>
                          </div>
                        </div>
                        <hr />
                      </div>
                    </span>
                    <div>
                      <span className={style.notLoggedInCaution}>コメントするにはログインしてください。</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div>
              <div className={style.mainArea}>
                <div className={style.infoArea} />
                <div className={style.contentArea}>
                  <div>
                    <div className={style.body}>回答コメント2</div>
                    <div className={style.additional}>
                      Posted at 2019-mm-dd
                      <a href="xxxxxxxxxxxx">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</a>
                    </div>
                  </div>
                  <hr />
                  <div className={style.commentList}>
                    <span>
                      <div className={style.comment}>
                        <div>
                          <div className={style.content}>
                            <span className={style.body}>テスト</span>
                            <span className={style.additional}>
                              Posted at 2019-xx-xxxxxxxx
                              <a href="xxxxxxxxxxxx">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</a>
                            </span>
                          </div>
                        </div>
                        <hr />
                      </div>
                    </span>
                    <div>
                      <span className={style.notLoggedInCaution}>コメントするにはログインしてください。</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div>
              <div className={style.mainArea}>
                <div className={style.infoArea} />
                <div className={style.contentArea}>
                  <div>
                    <div className={style.body}>回答コメント3</div>
                    <div className={style.additional}>
                      Posted at 2019-mm-dd
                      <a href="xxxxxxxxxxxx">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</a>
                    </div>
                  </div>
                  <hr />
                  <div className={style.commentList}>
                    <span>
                      <div className={style.comment}>
                        <div>
                          <div className={style.content}>
                            <span className={style.body}>テスト</span>
                            <span className={style.additional}>
                              Posted at 2019-xx-xxxxxxxx
                              <a href="xxxxxxxxxxxx">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</a>
                            </span>
                          </div>
                        </div>
                        <hr />
                      </div>
                    </span>
                    <div>
                      <span className={style.notLoggedInCaution}>コメントするにはログインしてください。</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </span>
        </div>
        {/* 回答する */}
        <div className={style.newAnswer}>
          <div className="new-answer-title">回答する</div>
          <hr />
          <div>回答するにはログインしてください。</div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question)
