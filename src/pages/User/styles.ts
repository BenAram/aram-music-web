import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #616060;

    box-sizing: border-box;
    padding: 10px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    & > label {
        display: flex;
        justify-content: center;
        margin: 10px 0;
    }
`

export const AvatarImageContainer = styled.div`
    width: 60px;
    height: 60px;

    cursor: pointer;
`

export const AvatarImage = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`

export const AvatarInput = styled.input`
    width: 0;
    height: 0;
    display: none;
`

export const UserInput = styled.input`
    background-color: #d9dadc;
    border-radius: 10px;

    width: 200px;
    
    margin-left: 10px;
    padding: 5px 10px;
`

export const SaveButton = styled.button`
    background-color: #218838;

    color: #d9dadc;

    padding: 10px 20px;
    border-radius: 10px;
    margin: 5px 0;

    transition: background-color .2s linear;

    &:hover {
        background-color: #016818;
    }

    &:active {
        background-color: #003800;
    }
`

export const ErrorContainer = styled.div`
    width: 230px;
    height: 40px;
    background-color: #d9dadc;
    border: 2px solid #c82333;
    border-radius: 10px;

    margin: 5px 0;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const ErrorMessage = styled.p`
    color: #c82333;
`

export const OperationContainer = styled.div`
    width: 250px;
    height: 80px;

    display: flex;
    justify-content: space-between;

    margin-top: 10%;
`

export const OperationLeave = styled.button`
    background-color: #4c43df;
    color: #d9dadc;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
`

export const OperationDelete = styled.button`
    background-color: #c82333;
    color: #d9dadc;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
`