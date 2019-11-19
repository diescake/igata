export default {
  // 共通
  common: {
    additional: (additional: string) => `Posted at ${additional}  `,
    by: 'by ',
    save: '保存',
    update: '更新',
    cancel: 'キャンセル',
  },
  // ヘッダー
  header: {
    title: 'StackOverFlowClone',
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
  todoApp: {
    title: 'TODO アプリ',
    name: 'TOP',
    newTodo: 'TODO を追加',
    addTodo: '追加',
    placeholder: 'TODO を入力してください',
    fetchTodos: 'TODO を取得',
    logout: 'ログアウト',
    loginMessage: (userId: string) => `ログインユーザ: ${userId}`,
    dateMessage: '時刻',
  },
  footer: {
    twitter: {
      label: 'Twitter',
      url: 'https://twitter.com/diescake',
    },
    github: {
      label: 'GitHub',
      url: 'https://github.com/diescake/igata',
    },
  },
  questionCreate: {
    title: '質問投稿する',
    create: '投稿する',
    notLogin: '質問を投稿するにはログインしてください。',
  },
  question: {
    answer: '回答する',
    answerNumber: (number: number) => `${number}件の回答`,
    loginToComment: 'コメントするにはログインしてください。',
    loginToAnswer: '回答するにはログインしてください。',
  },
} as const
