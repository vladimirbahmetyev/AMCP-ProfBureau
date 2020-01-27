import React from 'react'
import './InformationBlock.css'
import Information from './Information'
import { store } from '../../../store'

export default class InformationBlock extends React.Component {

    render() {
        const comission = store.getState().comission
        return(
            <div className='information-block'>
                <h2 className='block-title'> {comission} </h2>
                <Information comission={comission} />
            </div>
        )
    }
}