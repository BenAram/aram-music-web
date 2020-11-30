import styled from 'styled-components'

export const Container: any = styled.div`
    width: 100%;
    height: ${(props: any) => props.shrink ? window.innerHeight - 100 : window.innerHeight}px;

    box-sizing: border-box;
    padding: 10px;

    background-color: #616060;
    
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
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 50px;

    background-color: rgba(255, 255, 255, 0.15);
    margin: 5px 0;

    box-sizing: border-box;
    padding: 5px 15px;

    cursor: pointer;
`

export const MusicInfo: any = styled.div`
    height: 50px;
    width: 400px;

    box-sizing: border-box;
    padding: 5px;

    display: flex;
`

export const MusicImg = styled.img`
    width: 60px;
    height: 30px;
`

export const MusicName = styled.p`
    color: #d9dadc;
    margin: 0 5px;
`