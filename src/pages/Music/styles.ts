import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #36393f;

    display: flex;
    flex-direction: column;
`

export const InputContainer: any = styled.label`
    width: ${(props: any) => props.cwidth};
    display: flex;
    align-items: center;

    cursor: pointer;
`

export const Input: any = styled.input`
    color: #d9dadc;
    padding: 5 10px;
    height: 20px;
    border-radius: 5px;

    ${(props: any) => props.cwidth ? `width: ${props.cwidth};` : ''}

    margin: 0 5px;

    font-size: 16px;

    &:hover {
        border: 1px solid #d9dadc;
    }
    &:focus {
        border: 1px solid #d9dadc;
    }
`

export const Header = styled.header`
    width: 100%;
    height: 5%;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    padding: 10px;
`

export const Main = styled.main`
    width: 100%;
    height: 35%;

    display: flex;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    padding: 10px;
`

export const MainImg = styled.img`
    width: 260px;
    height: 130px;
    border-radius: 10px;
`

export const MainInfoContainer = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    align-items: center;
`

export const MainInfo = styled.div`
    width: 170px;
    height: 130px;

    margin: 10px;

    color: #d9dadc;
    font-size: 18px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const MainInfoAvatarContainer = styled.button`
    display: flex;
    align-items: center;
`

export const MainInfoAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 20px;

    margin-right: 5px;
`

export const MainInfoName = styled.p`
    font-size: 16px;
    font-family: 'Nunito', Arial, Helvetica, sans-serif;
    text-align: left;
    color: #d9dadc;
`

export const MainPlayContainer = styled.div`
    width: 50%;
    height: 100%;

    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
`

export const MainPlayType = styled.p`
    background-color: #4c43df;
    color: #d9dadc;

    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;

    transform: translateY(-15px);
`

export const MainPlayButton = styled.button`
    width: 45px;
    height: 45px;
    border-radius: 50%;

    background-color: #4c43df;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: 10px;

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

export const Footer = styled.footer`
    width: 100%;
    height: 60%;

    box-sizing: border-box;
    padding: 10px;

    display: flex;
    flex-direction: column;
    
    color: #d9dadc;
`

export const FooterItem = styled.div`
    margin: 10px 0;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`