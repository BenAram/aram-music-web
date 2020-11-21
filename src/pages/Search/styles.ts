import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #616060;

    box-sizing: border-box;
    padding: 10px;
`

export const SearchContainer = styled.div`
    width: 100%;
    height: 5%;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const SearchButton = styled.button`
    background-color: transparent;
`

export const SearchInput = styled.input`
    width: 25%;
    height: 80%;
    background-color: #d9dadc;

    margin-left: 10px;

    border-radius: 15px;

    box-sizing: border-box;
    padding: 5px;
`

export const MusicTypeButtonContainer = styled.div`
    width: 100%;
    height: ${() => (window.innerHeight / 100) * 66}px;

    overflow: auto;

    display: flex;
    flex-wrap: wrap;

    box-sizing: border-box;
    padding: 10px;

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

export const MusicTypeButton: any = styled.button`
    background-image: linear-gradient(to right bottom, black, ${(props: any) => props.color || '#4c43df'} 15%);

    width: 120px;
    height: 120px;

    margin: 10px;

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    padding: 10px;
`

export const MusicTypeButtonName = styled.span`
    color: #d9dadc;
    font-weight: bold;
`

export const MusicTypeButtonImage = styled.img`
    width: 40px;
    height: 40px;

    margin-top: 40%;
    margin-left: 50%;

    transform: rotate(40deg);
`