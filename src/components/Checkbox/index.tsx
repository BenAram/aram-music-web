import React, { Fragment } from 'react'
import {
    Check
} from 'react-feather'

import {
    CheckboxInput,
    CheckedDiv,
    UncheckedDiv
} from './styles'

interface CheckboxInterface {
    checked: boolean
    setChecked: Function
    disabled?: boolean
}

function Checkbox(props: CheckboxInterface): JSX.Element {
    return <Fragment>
        <CheckboxInput
            type="checkbox"
            checked={props.checked}
            onChange={() => props.setChecked(!props.checked)}
            disabled={props.disabled}
        />
        {props.checked ? <CheckedDiv>
            <Check
                color="#d9dadc"
                size={20}
            />
        </CheckedDiv> : <UncheckedDiv/>}
    </Fragment>
}

export default Checkbox