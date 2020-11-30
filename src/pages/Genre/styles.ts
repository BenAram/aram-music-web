import styled from 'styled-components'

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

export const InfoImg = styled.img`
    width: 100px;
    height: 100px;

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

export const InfoNameInput = styled.div`
    border-radius: 10px;
    padding: 1px 2.5px;

    display: flex;
    justify-content: space-between;

    & > input {
        width: 80%;
        font-weight: bold;
        font-size: 16px;
        color: #d9dadc;
    }

    &:hover {
        border: 1px solid #d9dadc;
    }

    & > button {
        margin: 0 5px;
    }
`

export const ErrorContainer = styled.div`
    border: 1.5px solid #c82333;
    border-radius: 10px;

    width: 200px;
    padding: 5px;
`

export const ErrorMessage = styled.p`
    color: #c82333;
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


export const MusicItem: any = styled.button`
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

export const MusicConfig: any = styled.div`
    display: flex;
    flex: 1;
`

export const MusicImage = styled.img`
    width: 80px;
    height: 100%;
    margin: 0 5px;
`

export const MusicDrag = styled.div`
    width: 100px;
    height: 100%;

    display: flex;
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