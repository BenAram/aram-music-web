import styled from 'styled-components'

export const LoadingContainer = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: #e6e6e6;
`

export const LoadingImage = styled.img`
    width: 200px;
    height: 200px;
`

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #e6e6e6;
`

export const Logo = styled.img`
    margin: 10px 0;
    width: 100px;
    height: 100px;
`

export const Interface = styled.div`
    width: 30%;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const InputLabel = styled.p`
    font-size: 20px;
`

export const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const TextInput = styled.input`
    width: 75%;
    padding: 10px;
    margin-left: 10px;

    border: 1px solid #d9dadc;
    background-color: #fff;
`

export const LoginContainer = styled.div`
    display: flex;
    justify-content: space-between;

    width: 30%;
`

export const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;

    cursor: pointer;
`

export const CheckboxP = styled.p`
    font-size: 18px;
    margin-left: 5px;
`

export const LoginButton: any = styled.button`
    padding: 10px 25px;
    background-color: #4c43df;
    border-radius: 10px;

    opacity: ${(props: any) => props.disabled ? 0.7 : 1};

    transition: background-color linear .2s;

    &:hover {
        background-color: ${(props: any) => props.disabled ? '#4c43df' : '#2c23bf'};
    }
    &:active {
        background-color: ${(props: any) => props.disabled ? '#4c43df' : '#09039e'};
    }
`

export const LoginText = styled.p`
    font-size: 20px;
    color: #fff;
`

export const ErrorContainer = styled.div`
    display: flex;
    align-items: center;

    border: 1px solid #c82333;
    border-radius: 10px;

    padding: 10px;
    margin-bottom: 5px;
`

export const ErrorMessage = styled.p`
    color: #c82333;
    font-size: 17px;

    margin-left: 10px;
`

export const CreateAccountButton = styled.button`
    border: 1px solid #3e3e3e;
    border-radius: 10px;
    background-color: #fff;

    padding: 10px 25px;

    transition: opacity linear .2s;

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.3;
    }
`