export default {
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
} as const
