import styled from 'styled-components'

import url from '../../services/url'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #616060;

    box-sizing: border-box;
    padding: 10px;

    display: flex;
    flex-direction: column;
`

export const ReturnContainer = styled.div`
    width: 100%;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.5);
`

export const ReturnButton = styled.button`
    width: 30px;
    height: 30px;
`

export const PlayerContainer = styled.div`
    display: flex;
    flex: 1;

    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const InfoContainer = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-end;
`

export const InfoImg: any = styled.img`
    width: ${(props: any) => props.hasImage ? 150 : 100}px;
    height: ${(props: any) => props.hasImage ? 75 : 100}px;

    margin: 0 10px;
`

export const InfoMusicContainer = styled.div`
    width: 50%;
    height: 75px;

    display: flex;
    flex-direction: column;
`

export const InfoName = styled.span`
    color: #d9dadc;
    font-weight: bold;
`

export const InfoMusics = styled.span`
    color: #d9dadc;
`

export const PlayButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;

    background-color: #4c43df;
    border-radius: 50%;

    width: 50px;
    height: 50px;
    margin: 20px;

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

export const MusicsContainer = styled.div`
    width: 100%;
    height: 400px;
    overflow: auto;

    @media (max-height: 664px) {
        height: 320px;
    }

    ::-webkit-scrollbar-track {
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #3e3e3e;
        border-radius: 10px;
    }
`


export const MusicItem = styled.button`
    width: 100%;
    height: 40px;
    color: #d9dadc;
    
    border-radius: 10px;
    margin: 10px 0;
    font-size: 12px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    transition: background-color .2s linear;

    &:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
    &:active {
        background-color: rgba(0, 0, 0, 0.5);
    }
`

export const MusicConfig = styled.div`
    width: 300px;
    height: 100%;

    display: flex;
`

export const MusicImage = styled.img`
    width: 80px;
    height: 100%;
    margin: 0 5px;
`

export const MusicDrag = styled.div`
    height: 100%;

    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;

    & > button > svg {
        margin-right: 10px;
        transition: stroke .2s linear;
    }

    &:hover > button > svg {
        stroke: #b9babc;
    }

    &:active > button > svg {
        stroke: #a9aaac;
    }
`