import styled from 'styled-components'

export const Container: any = styled.div`
    width: ${(props: any) => props.inserted ? '100%' : '100vw'};
    height: ${(props: any) => props.inserted ? '100%' : '100vh'};
    background-color: #e3e3e3;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Title = styled.h1`
    font-size: 22px;
    color: #4c43df;
`

export const Button = styled.button`
    border: 1px solid #4c43df;
    border-radius: 10px;
    padding: 9px 14px;

    color: #4c43df;

    transition: all .2s linear;

    &:hover {
        color: #e3e3e3;
        background-color: #4c43df;
        border: 0;
    }
`