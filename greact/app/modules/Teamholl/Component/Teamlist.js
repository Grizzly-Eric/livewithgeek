'use strict';

import React from 'react' ;
import Teamtable from './Teamtable' ;
import AjaxGet from './../../Server/ajaxget' ;
import Loading from './../../Component/Loading/Loading'

class Teamlist extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loaded:false,
            dat:""
        }
    };

    componentDidMount() {
        AjaxGet( "GET" , "/classes/Team" , (response)=> {

          let listData = response.results.reverse().map(lists => {

            let teamtime = new Date(lists.updatedAt);
            let timestamp = Date.parse(new Date());
            let timestamp2 = Date.parse(teamtime);
            let times = new Date((timestamp - timestamp2))
            var publictime;
            if (times.getFullYear()!==1970) {
              publictime = (times.getFullYear()-1970) + "年前"
            }else if (times.getMonth()){
              publictime = times.getMonth() + "月前"
            }else if (times.getDate()>1){
              publictime = (times.getDate()-1 )+ "天前"
            }else if (times.getHours()>8){
              publictime = (times.getHours()-8) + "小时前"
            }else if (times.getMinutes()){
              publictime = times.getMinutes() + "分钟前"
            }else if (times.getSeconds()){
              publictime = times.getSeconds() + "秒前"
            };

            return (
                <Teamtable
                    key={lists.objectId}
                    tit={lists.tit}
                    area={lists.area}
                    maximum={lists.maximum}
                    city={lists.city}
                    gender={lists.gender}
                    order={publictime}
                    id={lists.objectId}
                    ></Teamtable>
            )
          });
          this.setState({
            loaded:true,
            dat:listData
          });
        })
    };

    render() {

        // 加载动画
        if(!this.state.loaded){
          return(
            <Loading></Loading>
          )
        }

        return (
            <div>
                <table className="table table-hover">

                  <thead>
                    <tr>
                      <th>最后更新</th>
                      <th>标题</th>
                      <th>商圈</th>
                      <th>人数</th>
                      <th>性别</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.dat}
                  </tbody>

                </table>
            </div>
        );
    }
}

export { Teamlist as default } ;
