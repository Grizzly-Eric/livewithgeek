'use strict';

import React from 'react' ;
import Header from './../Component/Header/Header' ;
import Footer from './../Component/Footer/Footer' ;
import { Router , Route , Link } from 'react-router' ;

class Main extends React.Component {
    render(){
        return (
            <div>
                <Header></Header>
                {this.props.children}
                <Footer></Footer>
            </div>
        ) ;
    }
}

export { Main as default } ;
