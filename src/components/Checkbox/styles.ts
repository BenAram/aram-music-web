import styled from 'styled-components'

export const CheckboxInput = styled.input`
    width: 0;
    height: 0;
    background-color: transparent;
    display: none;
`

export const UncheckedDiv = styled.div`
    width: 13px;
    height: 13px;
    background-color: #d9dadc;

    border: 1px solid #4c43df;
    border-radius: 5px;
`

export const CheckedDiv: any = styled.div`
    width: 16px;
    height: 16px;
    background-color: #4c43df;

    border-radius: 5px;

    display: flex;
    justify-content: center;
    align-items: center;

    box-sizing: border-box;
    padding: 0.5px;

    &:hover {
        background-color: ${(props: any) => props.disabled ? '#4c43df' : '#2c23bf'};
    }
    &:active {
        background-color: ${(props: any) => props.disabled ? '#4c43df' : '#09039e'};
    }
`