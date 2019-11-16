import React from 'react';
import './FadeAnimationComponent.css'

import CssTransition from "react-transition-group/CSSTransition"

export default class FadeAnimationComponent extends React.Component{
    render(){ 
        if(this.props.isRedrawNeeded)
            this.props.redrawCallback()
        return(
            <CssTransition
                classNames="fade"
                timeout={600}
                unmountOnExit
                mountOnEnter
                in={!this.props.isRedrawNeeded}>
                    {this.props.fadeBlock}
            </CssTransition>
        )

    }
}
