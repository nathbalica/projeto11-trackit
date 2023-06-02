import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
	* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body, html {
  width: 100%;
  height: 100%;

  font-family: 'Lexend Deca', sans-serif;
}

.root {
  width: 100%;
  height: 100%;
}

`

export default GlobalStyle