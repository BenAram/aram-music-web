import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #616060;

    box-sizing: border-box;
    padding: 10px;
`

export const MusicsContainer = styled.div`
    width: 100%;
    height: 460px;
    
    overflow: auto;

    display: flex;
    flex-direction: column;

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

export const MusicItem = styled.div`
    display: flex;

    width: 100%;
    height: 50px;

    background-color: #d9dadc;
    margin: 5px 0;
`