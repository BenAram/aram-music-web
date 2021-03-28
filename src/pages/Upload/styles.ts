import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #36393f;
`

export const Header = styled.header`
    width: 100%;
    height: 10%;

    border-bottom: 1px solid #d9dadc;

    box-sizing: border-box;
    padding: 0 10px;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const HeaderImg = styled.img`
    width: 40px;
    height: 40px;
    margin: 0 10px;
`

export const HeaderText = styled.p`
    color: #d9dadc;
    font-weight: bold;
`

export const Main: any = styled.main`
    width: 100%;
    height: ${(props: any) => props.shrink ? ((window.innerHeight / 100) * 90) - 100 : (window.innerHeight / 100) * 90}px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    box-sizing: border-box;
    padding: 10px;

    overflow: auto;

    ::-webkit-scrollbar-track {
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar {
        width: 7px;
        height: 5px;
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #3e3e3e;
        border-radius: 10px;
    }
`

export const InputContainer = styled.div`
    width: 300px;
    margin: 5px;
`

export const InputTitle = styled.p`
    color: #d9dadc;
    text-align: center;

    margin: 5px 0;
`

export const InputDiv = styled.div`
    display: flex;
    align-items: center;
`

export const Input = styled.input`
    flex: 1;

    background-color: #d9dadc;
    padding: 5px;
    border-radius: 10px;

    margin: 0 5px;
`

export const TextArea = styled.textarea`
    flex: 1;
    height: 100px;

    background-color: #d9dadc;
    padding: 5px;
    border-radius: 10px;

    margin: 0 5px;
    resize: none;
`

export const RadioContainer = styled.div`
    width: 300px;
    height: 70px;

    overflow: auto;

    display: flex;

    ::-webkit-scrollbar-track {
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar {
        width: 7px;
        height: 5px;
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #3e3e3e;
        border-radius: 10px;
    }
`

export const RadioItem = styled.label`
    cursor: pointer;

    margin: 0 5px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const RadioInput = styled.input`
    width: 0;
    height: 0;
    opacity: 0;
`

export const RadioInputDiv = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 7.5px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color .2s linear;

    & + p {
        transition: color .2s linear;
    }
`

export const ButtonInput = styled.input`
    width: 0;
    height: 0;
    opacity: 0;
`

export const Button = styled.div`
    padding: 5px 15px;

    color: #d9dadc;
    border: 1.5px solid #d9dadc;
    border-radius: 10px;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const ButtonImg = styled.img`
    width: 100px;
    height: 50px;
`

export const ErrorContainer = styled.div`
    border: 1.5px solid #c82333;
    border-radius: 10px;

    width: 200px;
    padding: 5px;

    margin-top: 5px;
`

export const ErrorMessage = styled.p`
    color: #c82333;
`

export const SuccessContainer = styled.div`
    background-color: #28a745;
    border-radius: 10px;

    width: 200px;
    padding: 5px;

    margin-top: 5px;
`

export const SuccessMessage = styled.p`
    color: #d9dadc;
`

export const SaveButton = styled.button`
    border-radius: 10px;
    background-color: #4c43df;
    padding: 7px 15px;

    &:hover {
        background-color: #2c23bf;
    }
    &:active {
        background-color: #09039e;
    }
`

export const SaveButtonText = styled.p`
    color: #d9dadc;
`