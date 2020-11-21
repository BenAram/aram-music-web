import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100px;
    background-color: #000;

    display: flex;
`

export const MusicInfoContainer = styled.div`
    width: 25%;
    height: 100%;

    box-sizing: border-box;
    padding: 10px;

    display: flex;
`

export const MusicInfoImage = styled.img`
    width: 100px;
    height: 50px;
    margin-right: 5px;
`

export const MusicNameContainer = styled.div`
    flex: 1;
    height: 50px;

    display: flex;
    flex-direction: column;
`

export const MusicName = styled.h3`
    color: #d9dadc;
    font-size: 16px;
`

export const MusicAuthor = styled.span`
    color: #6e6e6e;
`

export const MusicControllerContainer = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    flex-direction: column;
`

export const PlaylistName = styled.p`
    color: #d9dadc;
    text-align: center;
`

export const MusicControllerButtonsContainer = styled.div`
    width: 100%;
    height: 50%;
    
    display: flex;
    justify-content: center;
    align-items: center;

    & > button {
        margin: 0 10px;
    }
`

export const MusicTimeContainer = styled.div`
    width: 100%;
    height: 50%;

    box-sizing: border-box;
    padding: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const MusicTimeSpan = styled.span`
    color: #d9dadc;
`

export const MusicTimeSliderContainer = styled.div`
    width: 300px;
    margin: 0 5px;
`

export const MusicTimeSliderSpan: any = styled.span`
    color: #d9dadc;

    position: relative;
    bottom: 5px;
    left: ${(props: any) => {
        const { duration, currentTime } = props
        const width = 300
        const currentTimePercent = currentTime / (duration / 100)
        return ((width / 100) * currentTimePercent) - 15
    }}px;
`

export const ControllerContainer = styled.div`
    width: 25%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    & > svg {
        margin-right: 10px;
    }
`

export const ControllerButton = styled.button`
    width: 25px;
    height: 25px;

    position: absolute;
    left: 85%;
    bottom: 70%;
`