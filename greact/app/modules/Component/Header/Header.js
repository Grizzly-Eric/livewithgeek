'use strict';

import React from 'react' ;
import { Router , Route , Link } from 'react-router' ;
import Logintag from './Component/Logintag' ;

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = { // define this.state in constructor
            login:[]
        }
    };

    componentDidMount() {}

    render() {

        var loginInfo;
        if ($.cookie('G_nickname')!==null && $.cookie('G_nickname')!=="") {
          loginInfo = <Logintag username={$.cookie('G_nickname')} />;
        }else {
          loginInfo = <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/Login">登陆</Link></li>
                        <li><Link to="/Register">注册</Link></li>
                      </ul>;
        }

        return (
            <div className="navbar navbar-default navbar-static-top navbar-inverse">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <Link className="navbar-brand" to='/'>
                    LiveWithGeek <small>极客室友</small>
                  </Link>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                  <ul className="nav navbar-nav">
                    <li>
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">上海 <span className="caret"></span></a>
                      <ul className="dropdown-menu">
                        <li><a href="#">上海</a></li>
                        <li role="separator" className="divider"></li>
                        <li><a href="#" disabled="disabled">北京（即将开放）</a></li>
                        <li><a href="#" disabled="disabled">杭州（即将开放）</a></li>
                        <li><a href="#" disabled="disabled">香港（即将开放）</a></li>
                      </ul>
                    </li>
                    <li><Link to='/Team'>队伍大厅</Link></li>
                    <li><Link to='/Homelist'>房源列表</Link></li>
                    <li><Link to='/Homesource'>提供房源</Link></li>
                  </ul>

                  {loginInfo}
                </div>
              </div>
            </div>
        );
    }
}


export { Header as default } ;
