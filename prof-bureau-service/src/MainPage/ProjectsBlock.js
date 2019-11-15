import React from 'react'
import './styles/ProjectsBlock.css'

export default class ProjectsBlock extends React.Component {

    render() {
        return(
            <div className='projects-block'>
                <h2 className='block-title'> Некоторые проекты </h2>
                <div className='projects'>
                    <div className='proj-preview'>
                    <div className='project-image'></div>
                        <p>project 1</p>
                    </div>
                    <div className='proj-preview'>
                    <div className='project-image'></div>
                        <p>project 2</p>
                    </div>
                    <div className='proj-preview'>
                        <div className='project-image'></div>
                        <p>project 3</p>
                    </div>
                </div>
            </div>
        )
    }
}