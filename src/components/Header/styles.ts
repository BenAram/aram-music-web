import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 30px;
    background-color: #3e3e3e;

    border-bottom: 1px solid #d9dadc;

    display: flex;

    box-sizing: border-box;
    padding: 5px;
`

export const OperationButtonContainer = styled.div`
    width: ${() => process.platform !== 'darwin' ? 60 : 100}px;
    height: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const OperationButton: any = styled.button`
    width: 15px;
    height: 15px;
    border-radius: 50%;

    background-color: ${(props: any) => props.color};

    &:hover {
        background-color: ${(props: any) => props.hover};
    }

    &:active {
        background-color: ${(props: any) => props.active};
    }
`

export const DragArea = styled.div`
    flex: 1;
    
    -webkit-user-select: none;
    -webkit-app-region: drag;
`

export const Title = styled.p`
    color: #d9dadc;
    text-align: ${() => process.platform !== 'darwin' ? 'right' : 'left'};
    margin: 0 10px;
`

export const OperationButtonOther = styled.button`
    width: 30px;
    height: 30px;
    background-color: transparent;

    font-size: 40px;
    color: #4c43df;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 0 5px;
`