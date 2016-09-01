'use strict';

import React from 'react' ;
import './../../../styles/oop.css' ;

class Banner extends React.Component {
    render() {

        let bannerStyle = {
            padding:"180px 0",
            background: "url('./app/images/"+this.props.img+"') center center",
            backgroundSize: "cover"
        }

        if (this.props.position=="head") {
            bannerStyle.marginTop="-20px"
        }

        return (
            <div className="jumbotron" style={bannerStyle}>

                <h2 className="text-center font45px whitecolor">{this.props.tit}</h2>
                <p className="text-center font20px whitecolor">{this.props.subtit}</p>
                  {this.props.position=="head"? <p className="text-center">
                    <a className="btn btn-primary btn-lg" role="button" href="#/Team/Addteam">创建组队</a>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <a className="btn btn-danger btn-lg" role="button"  href="#/Houselist">查找房源</a>
                  </p> : ""}

            </div>
        );
    }
}

export { Banner as default } ;
