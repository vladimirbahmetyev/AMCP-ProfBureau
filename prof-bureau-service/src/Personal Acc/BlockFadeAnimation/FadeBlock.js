import React from 'react';
import './FadeBlock.css'

import CssTransition from "react-transition-group/CSSTransition"

export default class FadeBlock extends React.Component{
    render(){
        if(this.props.isBlockChange)
            this.props.switcher()
        return(
            <CssTransition
                classNames="fade"
                timeout={600}
                unmountOnExit
                mountOnEnter
                in={!this.props.isBlockChange}>
                    {this.props.fadeBlock}
            </CssTransition>
        )

    }
}
