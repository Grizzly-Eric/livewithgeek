'use strict';

import React from 'react' ;

class Footer extends React.Component {
    render() {

        let footStyle = {
            paddingTop: 20,
            paddingBottom: 20,
            marginTop: 100,
            borderTop: "1px solid #e5e5e5"
        }
        return (
            <div className="container" style={footStyle}>
                <p className="text-center">
                	<a href="www.sharklab.cn">鲨鱼数字媒体工作室</a>
                	&nbsp; | &nbsp;
                	<a>合作微信:853509569</a>
                </p>
                <div className="row footer-bottom">
                  <ul className="list-inline text-center">
                    <li><a href="http://www.miibeian.gov.cn/" target="_blank">沪ICP备11008151号</a></li><li>沪公网安备11010802014853</li>
                  </ul>
                </div>
            </div>
        );
    }
}

export { Footer as default } ;
