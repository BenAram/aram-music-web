import React, { useState, useEffect } from 'react'

import {
    Container,
    Header,
    Main,
    Footer,
    InputContainer,
    InputMessage
} from './styles'

import api from '../../services/api'
import url from '../../services/url'

import logo from '../../images/logo.png'

interface UserMessage {
    name: string
    avatar: string
    id: number
    online: boolean
    type: string
}

interface Message {
    date: string
    from: number
    content: string
    seen: boolean
    id: number
}

interface Friendship {
    id: number
    from: UserMessage
    to: UserMessage
    accepted: boolean
    messages: Array<Message>
}

interface ChatProps {
    friendship: Friendship
    me: UserMessage
}

const initialStateFriend: UserMessage = {
    avatar: '',
    id: 0,
    name: '',
    online: false,
    type: ''
}

function Chat(props: ChatProps): JSX.Element {

    const [friend, setFriend] = useState<UserMessage>(initialStateFriend)

    useEffect(() => {
        if (props.friendship.from.id === props.me.id) {
            setFriend(props.friendship.to)
        } else {
            setFriend(props.friendship.from)
        }
    }, [props.friendship])

    return <Container>
        <Header>

        </Header>
        <Main>

        </Main>
        <Footer>
            <InputContainer>
                <InputMessage
                    placeholder={`Conversar com ${friend.name}`}
                />
            </InputContainer>
        </Footer>
    </Container>
}

export default Chat