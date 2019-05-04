---
path: "/posts/semantic-ui-react"
title: Semantic-Ui-React Theme Customizing
date: 2018-09-10 21:38:56
banner: ../images/banner/react.jpg
categories: React
tags: ["semantic-ui-react", "react"]
author: "Hosung Lim"
---
`semantic-ui-react`는 `semantic-ui` 를 react로 구현한 라이브러리이다. 
react로 프로젝트를 하게되면 ui kit으로 `semantic-ui-react`를 많이 사용되고 있다. 한 번 사용해본 후기로는 다양한 형태의 UI Component를 지원해서 UI를 구현하는데 걸리는 시간을 많이 단축시켜 생산성을 올려준다. 하지만 사용하다 보면 테마를 변경해야하거나 Component Style을 변경하고 싶을때가 있다. 

이 글에선 `create-react-app` 으로 생성한 react app에서 `semantic-ui-react` 테마를 커스터마이징 해본 경험을 공유해보고자 한다. 공식 메뉴얼에도 테마 커스터마이징에 대해서 두가지 방법으로 소개하고 있다. 

* [Semantic-UI-Less](https://github.com/Semantic-Org/Semantic-UI-LESS) project를 받아서 Customizing 하는 방법 
* [Webpack2 와 연동](https://medium.com/webmonkeys/webpack-2-semantic-ui-theming-a216ddf60daf) 하여 Customizing 하는 방법 

첫 번째 방법은 `create-react-app` 을 통해서 프로젝트를 만들었을경우 따로 프로젝트를 만들어서 컴파일 한 후 css파일을 옮겨야 하기 때문에 굉장히 번거로울 수 있다. 
이 글에선 두 번째 방법을 기준으로 설명하려 한다. 

거이 대부분의 가이드는 위 가이드 문서에 잘 작성되어 있다. 
단,  `create-react-app` 환경에선 몇가지 이슈가 있었다. 

먼저 `create-react-app` 환경이라면 `yarn run eject` 명령을 통해서 webpack 설정을 커스터마이징 해야한다.

semantic-ui-less 모듈을 설치한다. 
```sh
yarn add semantic-ui-less
```

테마를 커스터마이징 하기 위해서 설치된 기본 테마와 설정을 로컬로 복사해와야한다. 
위 문서에는 root폴더 아래에 theme폴더를 만들라고 권장하고 있지만 `create-react-app` 구조에서는 `src`폴더 아래에 theme 폴더를 만들어주면 된다. 

theme 폴더는 `site`폴더와 `theme.config` 설정파일을 만들어주도록 하자.

* config파일은 `node_modules/semantic-ui-less/theme.config.example` 복사해서 생성
* site폴더는 `node_modules/semantic-ui-less/site/default`아래 폴더 모두 복사 

여기까지 됬다면 theme.config 파일의 variable을 현재 설정에 맞춰줘야 한다. 
*  `@import "theme.less";` 부분을 `@import (multiple) "~semantic-ui-less/theme.less";` 와 같이 수정한다. 
* `@siteFolder : "site";` 부분을 `@siteFolder : "../../src/styles/semantic/theme/site"` 와 같이 수정한다. 여기서 siteFolder는 현재 site폴더의 경로이다. (필자는 `/src/styles/semantic/theme/site` 로 설정되어 있다)
* config 파일의 마지막 라인에 `@fontPath : "../../../themes/@{theme}/assets/fonts";`를 추가해주도록 한다.

theme config 파일 설정을 마치면 아래와 같이 webpack alias를 추가하도록 한다. 
참고로 `create-react-app` 으로 설정할시 __dirname은 script폴더이므로 아래 필자와 같이 설정하도록 한다. 
```javascript
 alias: {
      
      '../../theme.config$': path.join(__dirname, '../src/styles/semantic/theme/theme.config'),
      // Support React Native Web
      // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
      'react-native': 'react-native-web',
    },

```

다음으론 webpack환경에서 less를 compile하기 위해서 아래와 같이 css-loader, less-loader, extract-text-plugin을 설치한다. extract-text-plugin은 production에만 적용해주면되는데  아래와같이 모두 less-loader만 추가해주면 된다. 
```sh
yarn add --dev less css-loader less-loader extract-text-webpack-plugin
```

```javascript
{
    test: /\.css$|\.less$/,
    use: [
        require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: {
                importLoaders: 1,
            },
        },
    {
    loader: require.resolve('postcss-loader'),
    options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
            browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        }),
        ],
    },
    },
    { loader : 'less-loader'}
```

맨아래줄에 less-loader를 추가해준다. 

참고로 `create-react-app`의 경우 아래와같은 설정이 있는데 이부분을 주석으로 막아야 정상적으로 동작한다.. 

```javascript
{
    // Exclude `js` files to keep "css" loader working as it injects
    // its runtime that would otherwise processed through "file" loader.
    // Also exclude `html` and `json` extensions so they get processed
    // by webpacks internal loaders.
    exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
    loader: require.resolve('file-loader'),
    options: {
        name: 'static/media/[name].[hash:8].[ext]',
    },
},
```

위부분을 막고 아래내용으로 대체해주도록 하자. 

```javascript

{
    test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
    use: 'file-loader?name=[name].[ext]?[hash]'
},

// the following 3 rules handle font extraction
{
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
},

{
    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
},
{
    test: /\.otf(\?.*)?$/,
    use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
}
```


## 마무리 
less버전에 따라 이슈가 발생할 수 있다. 
필자는 2.7.3 버전에서 정상적으로 작동하는걸 확인하였다. 

관련 이슈는 아래링크에서 확인하도록 하자. 
[Make LESS 3.x compatible · Issue #30 · Semantic-Org/Semantic-UI-LESS · GitHub](https://github.com/Semantic-Org/Semantic-UI-LESS/issues/30)

SemanticUI는 Component 종류도 다양하고 사용에도 용이하다. 
단 전혀 손을대지않으면 폰트사이즈나 간격등이 크거나 맞지않을 수 있기때문에 
커스터마이징하는 방법에 대해 기록해본다. 