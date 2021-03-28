import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #36393f;
`

export const Header = styled.header`
    width: 100%;
    height: 8%;
`

export const Main = styled.main`
    width: 100%;
    height: 80%;
`

export const Footer = styled.footer`
    width: 100%;
    height: 12%;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const InputContainer = styled.div`
    width: 97%;
    height: 45px;
    border-radius: 10px;
    background-color: #4f545c;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    padding: 5px 15px;
`

export const InputMessage = styled.input`
    width: 100%;
    height: 100%;

    color: #d9dadc;
    font-size: 16px;

    ::-webkit-input-placeholder {
        color: #898c97;
    }
    :-moz-placeholder {
        color: #898c97;
    }
    ::-moz-placeholder {
        color: #898c97;
    }
    :-ms-input-placeholder {  
        color: #898c97;
    }
`