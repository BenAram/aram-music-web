import React from 'react'
import { useHistory } from 'react-router-dom'

import {
    Container,
    Title,
    Button
} from './styles'

import logo from '../../images/logo.png'

interface NotFoundInterface {
    inserted?: boolean
}

function NotFound(props: NotFoundInterface): JSX.Element {
    const history = useHistory()

    function goBack() {
        history.goBack()
    }

    return <Container inserted={props.inserted}>
        <img src={logo} style={{ width: 200, height: 200 }} />
        <Title>Página inexistente</Title>
        <Button onClick={goBack}>
            <p>Clique aqui para voltar</p>
        </Button>
    </Container>
}

export default NotFound