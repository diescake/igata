export const nlToBr = (text: string) => text.replace(/(?:\r\n|\r|\n)/g, '<br/>')

export const isValidEmail = (text: string) =>
  new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(text)

export const isValidPassword = (text: string) => new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[\x20-\x7e]*$/).test(text)
export const isValidKatakana = (text: string) => new RegExp(/^[\u30a1-\u30FC]+$/).test(text)
export const isValidPhoneNumber = (text: string) => new RegExp(/^([0-9]|-|\+)+$/).test(text)
