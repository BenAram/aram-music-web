import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        border: none;
        outline: none;
        font-family: 'Nunito', Arial, Helvetica, sans-serif;
    }

    button, input, textarea {
        font-family: 'Nunito', Arial, Helvetica, sans-serif;
        background-color: transparent;
        cursor: pointer;
    }
`

export default GlobalStyle