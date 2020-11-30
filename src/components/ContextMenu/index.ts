import styled from 'styled-components'

export const ContextMenuContainer: any = styled.div`
    border-radius: 10px;
    padding: 5px 10px;
    background: #4f4f4f;

    box-shadow: 0 0 2px black;

    position: absolute;
    left: ${(props: any) => props.x}px;
    top: ${(props: any) => props.y}px;

    z-index: 9999;
`

export const ContextMenuItem: any = styled.button`
    width: 100%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin: 4px 0;
    border-radius: 10px;
    padding: 1px 2.5px;

    transition: background-color .2s linear;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    &:active {
        background-color: rgba(0, 0, 0, 0.5);
    }
`

export const ContextMenuTextContainer = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
`

export const ContextMenuDivider = styled.div`
    width: 1.5px;
    height: 15px;
    background-color: #d9dadc;

    margin: 0 5px;
`

export const ContextMenuText = styled.p`
    color: #d9dadc;
`