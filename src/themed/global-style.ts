import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Helvetica Neue', 'Roboto', 'Arial', 'PingFang SC', 'Hiragino Sans GB',
      'Source Han Sans SC', 'Microsoft YaHei', 'SimSun', sans-serif;
  }

  #root {
    width: 100vw;
    height: 100vh;
  }

  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: normal;
  }

  .flex-row-start-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
`
