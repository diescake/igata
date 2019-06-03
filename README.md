# igata

<p align="left">
  <img src="./data/logo.png" alt="logo" width="400">
</p>

[![CircleCI](https://circleci.com/gh/diescake/igata.svg?style=svg)](https://circleci.com/gh/diescake/igata)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=165770216)](https://dependabot.com)

`igata(鋳型)` is my boilerplate for Web Frontend. I and my lovely dependabot will continue to maintain its freshness as much as possible. Then, `鋳型` is a Japanese keyword and that means a boilerplate or casting mold.

## DEMO

- https://igata-diescake.netlify.com

## How to use

Just fork me.😊

## Technology stacks

### Languages

- [TypeScript](https://www.typescriptlang.org/)

### Single page applications

- [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- [react-router](https://reacttraining.com/react-router/) + [connected-react-router](https://github.com/supasate/connected-react-router)
- [redux-saga](https://github.com/redux-saga/redux-saga)

### Styles

- [Sass](https://sass-lang.com/) as CSS Modules
- [Reboot.css](https://raw.githubusercontent.com/twbs/bootstrap/v4-dev/dist/css/bootstrap-reboot.css)

### Tests

- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [stylelint](https://stylelint.io/)
- [Jest](https://jestjs.io/) **(not yet)**

### Buildings

- [yarn](https://yarnpkg.com)
- [webpack](https://webpack.js.org/)

### DevOps

- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [CircleCI](https://circleci.com/)
- [Dependabot](https://dependabot.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (Recommended)

### Others

- [axios](https://github.com/axios/axios)
- [moment](https://momentjs.com/)
- [netlify](https://www.netlify.com)

## Requirement

- Node.js v8.xx
  - Possibly the latest version is also fine.

## Npm script

```sh
$ yarn          # install dependencies
$ yarn start    # build and launch the development server
$ yarn build    # build and generate the production codes
$ yarn format   # format and save any codes with prettier
$ yarn lint     # lint source codes after format automatically
$ yarn style    # lint css and alt-css after format automatically
$ yarn test     # run the test code using Jest framework
$ yarn deploy   # deploy the production codes to GitHub.io
$ yarn license  # display OSS licenses summary of bundled as production codes
```

## Note

### Pre-commit tasks

Some tasks are kicked before committing by the combination of `husky` and `lint-staged`, but unfortunately they are **NOT** always called and some developers will skip this check process as a result. As far as I know, some GUI git clients can penetrate it.

## License

[MIT License](https://github.com/diescake/igata/blob/master/LICENSE)

## Author

Daisuke Kondo (a.k.a diescake)
