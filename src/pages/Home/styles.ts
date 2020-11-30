import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #616060;

    box-sizing: border-box;
    padding: 10px;
`

export const Title = styled.h2`
    font-size: 18px;
    color: #d9dadc;
    margin-bottom: 5px;
`

export const MusicsContainer = styled.div`
    width: 100%;
    height: 165px;

    display: flex;

    overflow-x: auto;

    ::-webkit-scrollbar-track {
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar {
        width: 1px;
        height: 5px;
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #3e3e3e;
        border-radius: 10px;
    }
`

export const MusicItem: any = styled.button`
    position: relative;
    width: 194.56px;
    height: 90%;

    margin: 0 10px;
    padding: 0 10px;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    transition: background-color .2s linear;

    & > button {
        display: none;
        opacity: 0;
        transition: opacity .2s linear;
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    &:hover > button {
        display: block;
        opacity: 1;
    }
`

export const MusicItemImage: any = styled.img`
    width: 184.56px;
    height: 78%;

    border-radius: 10px;

    background-clip: clip;

    align-self: center;
`

export const MusicItemButton = styled.button`
    position: absolute;
    left: 75%;
    bottom: 25%;

    width: 30px;
    height: 30px;
    
    border-radius: 50%;

    background-color: #4c43df;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color .2s linear; 

    & > svg {
        fill: #d9dadc;
    }

    &:hover {
        background-color: #2c23bf;
    }

    &:active {
        background-color: #09039e;
    }
`

export const MusicItemName: any = styled.p`
    color: #d9dadc;
`