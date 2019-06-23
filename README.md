# igata

<p align="left">
  <img src="./data/igata_kawaii.png" alt="logo" width="300">
</p>

[![CircleCI](https://circleci.com/gh/diescake/igata.svg?style=svg)](https://circleci.com/gh/diescake/igata)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6dcaa70a-5921-49f5-83f9-01fdef7b54b4/deploy-status)](https://app.netlify.com/sites/igata-storybook/deploys)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=165770216)](https://dependabot.com)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://igata-storybook.netlify.com/)

`igata(鋳型)` is my boilerplate for Web Frontend. It should be maintained by me and my lovely dependabot as much as possible. By the way, `鋳型` is a Japanese word and it means a boilerplate or casting mold.

## DEMO

- [Web Application](https://igata-diescake.netlify.com)
- [Storybook](https://igata-storybook.netlify.com/)

## How to use

Please fork or hard copy me.😊

## Technology stacks

### Languages

- [TypeScript](https://www.typescriptlang.org/)

### View frameworks

- [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- [react-router](https://reacttraining.com/react-router/) + [connected-react-router](https://github.com/supasate/connected-react-router)
- [redux-saga](https://github.com/redux-saga/redux-saga)

### Utilities

- [axios](https://github.com/axios/axios)
- [dayjs](https://github.com/iamkun/dayjs)

### Styles

- [Sass](https://sass-lang.com/) as CSS Modules
- [Font Awesome](https://fontawesome.com/)
- [Reboot.css](https://raw.githubusercontent.com/twbs/bootstrap/v4-dev/dist/css/bootstrap-reboot.css)

### Tests

- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)
- [stylelint](https://stylelint.io/)
- [Jest](https://jestjs.io/)
- [StoryBook](https://storybook.js.org/)

### Buildings

- [yarn](https://yarnpkg.com)
- [webpack](https://webpack.js.org/)

### DevOps

- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- [CircleCI](https://circleci.com/)
- [netlify](https://www.netlify.com)
- [Dependabot](https://dependabot.com/)
- [Visual Studio Code](https://code.visualstudio.com/) (Recommended)

## Requirement

- Node.js v8.xx
  - Possibly the latest version is also fine.

## Npm scripts

```sh
$ yarn                  # install dependencies
$ yarn start            # build and launch a development server
$ yarn build            # build and generate the production codes
$ yarn format           # format and save any codes with prettier
$ yarn lint             # lint source codes after format automatically
$ yarn style            # lint css and alt-css after format automatically
$ yarn test             # run the test code using Jest framework
$ yarn deploy           # deploy the production codes but currently not used
$ yarn license          # display summary of OSS licenses which are bundled in production codes
$ yarn storybook        # run the UI component test code using StoryBook
$ yarn build-storybook  # generate the UI component docs using StoryBook
```

## Note

### Pre-commit tasks

Some tasks are kicked before committing by the combination of `husky` and `lint-staged`, but unfortunately they are **NOT** always called, so some developers may skip this check process as a result. As far as I know, some GUI git clients can ignore and skip the checking.

## License

[MIT License](https://github.com/diescake/igata/blob/master/LICENSE)

## Author

Daisuke Kondo (a.k.a [diescake](https://twitter.com/diescake))
