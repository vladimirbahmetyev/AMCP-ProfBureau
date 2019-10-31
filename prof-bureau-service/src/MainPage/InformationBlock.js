import React from 'react'
import './styles/InformationBlock.css'
import Information from './Information'

export default class InformationBlock extends React.Component {

    render() {
        const { comission } = this.props
        return(
            <div className='information-block'>
                <h2 className='block-title'> {comission} </h2>
                <Information comission={comission} />
            </div>
        )
    }
}