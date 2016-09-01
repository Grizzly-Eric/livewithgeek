'use strict';

import React from 'react' ;
import Teamlist from './Component/Teamlist' ;


class Teamholl extends React.Component {

    render(){

        return (

          <div className="container">
            <div className="page-header">
            	<h2>组队大厅
              	<a role="button" href="../#/Addteam" className="btn btn-primary pull-right" disabled={$.cookie('G_grouped')?"disabled":""}>
              		<span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 创建合租队伍
              	</a>
            	</h2>
            </div>
            <Teamlist></Teamlist>
          </div>

        ) ;
    }
}

export { Teamholl as default } ;
