import React, { Fragment } from 'react'
import { X } from 'react-feather'

import {
    Container,
    OperationButtonContainer,
    OperationButton,
    DragArea,
    Title,
    OperationButtonOther
} from './styles'

function Header(): JSX.Element {

    function handleOperate(type: string): Function {
        return function() {
            const { remote } = window as any
            if (remote) {
                const currentWindow = remote.getCurrentWindow()
                switch(type) {
                    case 'close':
                        currentWindow.close()
                        return
                    case 'minimize':
                        currentWindow.minimize()
                        return
                    case 'maximize':
                        if (currentWindow.isMaximized()) {
                            currentWindow.restore()
                        } else {
                            currentWindow.maximize()
                        }
                        return
                }
            }
        }
    }

    return <Container>
        {process.platform !== 'darwin' ? <Fragment>
            <OperationButtonContainer>
                <OperationButton
                    onClick={handleOperate('close')}
                    color="rgb(222, 85, 78)"
                    hover="rgb(202, 65, 58)"
                    active="rgb(172, 35, 28)"
                />
                <OperationButton
                    onClick={handleOperate('minimize')}
                    color="rgb(238, 188, 63)"
                    hover="rgb(218, 168, 43)"
                    active="rgb(188, 138, 13)"
                />
                <OperationButton
                    onClick={handleOperate('maximize')}
                    color="rgb(117, 200, 78)"
                    hover="rgb(97, 180, 58)"
                    active="rgb(67, 150, 28)"
                />
            </OperationButtonContainer>
            <DragArea>
                <Title>Aram Music</Title>
            </DragArea> 
        </Fragment> : <Fragment>
            <DragArea>
                <Title>Aram Music</Title>
            </DragArea>
            <OperationButtonContainer>
            <OperationButtonOther onClick={handleOperate('minimize') as any}>
                    <span style={{ marginBottom: 20 }}>_</span>
                </OperationButtonOther>
                <OperationButtonOther onClick={handleOperate('maximize') as any}>
                    <span style={{ marginBottom: 8 }}>□</span>
                </OperationButtonOther>
                <OperationButtonOther onClick={handleOperate('close') as any}>
                    <X
                        size={30}
                        color="#4c43df"
                    />
                </OperationButtonOther>
            </OperationButtonContainer>
        </Fragment>}
    </Container>
}

export default Header