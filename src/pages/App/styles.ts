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
export const AppSelector = styled.div`
    width: 4%;
    height: 100%;
    background-image: linear-gradient(to bottom, #4c43df, #d9dadc);

    box-sizing: border-box;
    padding: 10px 0;
`

export const AppSelectorButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 2px 0;

    margin-bottom: 5px;
`

export const NavContainer = styled.nav`
    width: 20%;
    height: 100%;
    background-color: #2f3136;

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

export const NavPlaylistContainer = styled.div`
    width: 100%;
    height: 250px;
    overflow: auto;

    ::-webkit-scrollbar-track {
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar {
        width: 4px;
        height: 5px;
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #3e3e3e;
        border-radius: 10px;
    }
`

export const NavPlaylistItem = styled.button`
    width: 100%;
    height: 30px;
    
    margin: 5px 0;

    display: flex;
    align-items: center;
`

export const NavPlaylistImage = styled.img`
    width: 50px;
    height: 100%;
    border-radius: 5px;
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

export const NavPlaylistInput = styled.input`
    color: #d9dadc;
    background-color: rgba(255, 255, 255, 0.2);

    width: 80%;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    padding: 0 5px;
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
    width: 78%;
    height: 100%;
`

export const NoFriendContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

export const NoFriendImage = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 40px;

    margin-bottom: 10px;
`

export const NoFriendText = styled.h3`
    color: #d9dadc;
`

export const FriendsContainer = styled.button`
    width: 100%;
    height: 40px;

    margin-top: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

export const FriendsButtonContainer: any = styled.div`
    margin-top: 10px;

    width: 100%;
    height: ${(props: any) => props.loaded ? '420px' : '520px'};

    overflow: auto;

    ::-webkit-scrollbar-track {
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar {
        width: 4px;
        height: 5px;
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #3e3e3e;
        border-radius: 10px;
    }
`

export const FriendButton: any = styled.button`
    display: flex;
    align-items: center;

    width: 100%;
    height: 45px;
    border-radius: 7px;
    box-sizing: border-box;
    padding: 2.5px;

    margin: 10px 0;

    ${(props: any) => props.selected ? 'background-color: rgba(255, 255, 255, 0.2);' : ''}

    & > svg {
        transition: stroke .2s linear;
    }
`

export const FriendAvatarContainer = styled.div`
    width: 40px;
    height: 40px;
`

export const FriendAvatarImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`

export const FriendStatusContainer = styled.div`
    width: 17px;
    height: 17px;
    border-radius: 8.5px;
    background-color: #2f3136;

    position: relative;
    left: 25px;
    bottom: 17px;

    display: flex;
    justify-content: center;
    align-items: center;
`

export const FriendStatus: any = styled.div`
    width: 9px;
    height: 9px;
    border-radius: 4.5px;

    background-color: ${(props: any) => props.online ? '#28a745' : 'rgba(255, 255, 255, 0.2)'};
`

export const FriendNameContainer = styled.div`
    width: 80%;
    height: 100%;

    box-sizing: border-box;
    padding: 0 5px;

    overflow: auto;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    ::-webkit-scrollbar-track {
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar {
        width: 4px;
        height: 5px;
        background-color: #d9dadc;

        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #3e3e3e;
        border-radius: 10px;
    }
`

export const FriendNameText = styled.p`
    color: #d9dadc;
    font-weight: bold;
    font-size: 16px;
`

export const FriendMessageText: any = styled.p`
    color: #d9dadc;
    font-size: 15px;
    ${(props: any) => props.new ? 'font-weight: bold;' : ''}
`

export const Divider = styled.div`
    width: 100%;
    height: 1.5px;
    background-color: #d9dadc;

    margin: 5px 0;
`

export const Text = styled.p`
    color: #d9dadc;
    font-size: 18px;
`