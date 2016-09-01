'use strict';

import React from 'react' ;
import {Link} from 'react-router'

class Logintag extends React.Component {

    Outlog() {

      $.cookie('G_objectId',null);
      $.cookie('G_nickname',null);
      $.cookie('G_sessionToken',null);
      $.cookie('G_grouped',null);
      $.cookie('G_city',null);

      console.log("delete cookie!");
      window.location.reload()
    }

    render() {

        return (
            <ul className="nav navbar-nav navbar-right">
              <li className="">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  欢迎你~ {this.props.username}
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li>
                  {$.cookie("G_grouped")!=="" && $.cookie("G_grouped")!==null?
                    <Link to={"/Team/" + $.cookie("G_grouped")}>我的队伍</Link>:
                    <a href="javascript:;" disabled>还没加入组队</a>
                  }
                  </li>
                  <li><a href="#">个人中心</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="javascript:;" onClick={this.Outlog}>退出登录</a></li>
                </ul>
              </li>
            </ul>
        );
    }
}

export { Logintag as default } ;
