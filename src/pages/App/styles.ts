import styled from 'styled-components'

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
`

export const AppContainer = styled.div`
    flex: 1;
    
    display: flex;
`

export const NavContainer = styled.nav`
    width: 18%;
    height: 100%;
    background-color: #36393f;

    border-right: 1px solid #d9dadc;

    box-sizing: border-box;
    padding: 0 10px;

    display: flex;
    flex-direction: column;
`

export const NavButtonContainer = styled.div`
    flex: 1;
    overflow: auto;
`

export const NavButton = styled.button`
    display: flex;
    align-items: center;

    margin: 10px 0;

    & > svg {
        transition: stroke .2s linear;
    }
`

export const NavButtonText: any = styled.p`
    color: ${(props: any) => props.selected ? '#4c43df' : '#d9dadc'};
    margin-left: 10px;

    transition: color .2s linear;
`

export const NavSubtitleContainer = styled.div`
    width: 100%;
    height: 20px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const NavSubtitle = styled.p`
    color: #d9dadc;
`

export const NavPlaylistItem = styled.button`
    width: 100%;
    height: 30px;
    
    margin: 5px 0;

    display: flex;
`

export const NavPlaylistImage = styled.img`
    width: 50px;
    height: 100%;
`

export const NavPlaylistImageDiv = styled.div`
    width: 50px;
    height: 100%;
`

export const NavPlaylistInfoContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    margin-left: 10px;
`

export const NavPlaylistName = styled.strong`
    color: #d9dadc;
    text-align: left;
`

export const NavPlaylistInfo = styled.span`
    color: #d9dadc;
    text-align: left;
`

export const DownloadButton = styled.a`
    width: 100%;
    height: 20px;
    color: #d9dadc;

    text-align: center;
    text-decoration: none;

    margin-bottom: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    & > span {
        margin-left: 5px;
    }
`

export const ContentContainer = styled.div`
    width: 82%;
    height: 100%;
`