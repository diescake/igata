export default {
  // 共通
  common: {
    additional: (additional: string) => `Posted at ${additional}  `,
    by: 'by ',
    hyphen: '-- ',
    save: '保存',
    update: '更新',
    cancel: 'キャンセル',
    textErrorEmpty: '入力してください。',
  },
  // ヘッダー
  header: {
    title: 'StackOverflow Clone (React)',
    login: 'ログイン',
    logout: 'ログアウト',
  },
  // トップ
  top: {
    title: '質問を見る',
    question: '質問する',
  },
  // ユーザー詳細
  user: {
    title: 'ユーザー詳細',
    questionList: '質問一覧',
    answerList: '回答一覧',
  },
  login: {
    title: 'ログイン',
    login: 'ログイン',
    id: 'ユーザ ID:',
    idPlaceholder: 'ID',
    idErrorEmpty: '入力必須項目です',
    idErrorInvalid: '無効なメールアドレスです',
    password: 'パスワード',
    passwordPlaceholder: 'パスワード',
    passwordErrorEmpty: '入力必須項目です',
    passwordErrorInvalid: '無効なパスワードです',
  },
  questionCreate: {
    title: 'タイトル',
    body: '本文',
    create: '投稿する',
    postQuestion: '質問投稿する',
    notLoginBody: '質問を投稿するにはログインしてください。',
  },
  question: {
    answer: '回答する',
    answerNumber: (number: number) => `${number}件の回答`,
    loginToComment: 'コメントするにはログインしてください。',
    loginToAnswer: '回答するにはログインしてください。',
    commentAdd: 'コメントを追加',
    post: '投稿',
  },
} as const
