'use strict';

import React from 'react' ;
import Header from './../Component/Header/Header' ;
import Footer from './../Component/Footer/Footer' ;
import { Router , Route , Link } from 'react-router' ;
import Banner from './Component/Banner' ;
import Block from './Component/Block' ;

class MainPage extends React.Component {
    render(){
        return (
            <div>
                <Banner
                  position="head"
                  tit="1和有趣的年轻人住在一起"
                  subtit="Live with geek, and make a difference in your life."
                  img="bannerImg11.jpg">
                </Banner>

                <div className="container">

                  <div className="row">
                    <div className="col-sm-8">
                      <Block tit="陆家嘴"
                             subtit="16个租客"
                             image="block1.jpg"
                            ></Block>
                    </div>
                    <div className="col-sm-4 col-xs-6">
                      <Block tit="虹桥中心"
                           subtit="16个租客"
                           image="block2.jpg"
                          ></Block>
                    </div>

                    <div className="col-sm-4 col-xs-6">
                      <Block tit="静安寺"
                             subtit="16个租客"
                             image="block3.jpg"
                            ></Block>
                    </div>
                    <div className="col-sm-4 col-xs-6">
                      <Block tit="张江高科"
                             subtit="16个租客"
                             image="block4.jpg"
                            ></Block>
                    </div>
                    <div className="col-sm-4 col-xs-6">
                      <Block tit="徐家汇"
                             subtit="16个租客"
                             image="block5.jpg"
                            ></Block>
                    </div>

                  </div>
                </div>

                <Banner
                  position="middle"
                  tit="热爱生活的人，终究会相遇"
                  subtit="Love your life，and love your roommate."
                  img="bannerImg5.jpg">
                </Banner>

                <div className="container">

                  <div className="row text-center">
                    <div className="col-xs-6 col-sm-3">
                      <div className="thumbnail">
                        <img src="./app/images/icon-music.svg" style={{height:120,margin:"30px auto"}} />
                        <div className="caption">
                          <h3>17 位乐手</h3>
                          <p className="text-center">
                            <a href="#" className="btn btn-primary" role="button">加入他们</a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-xs-6 col-sm-3">
                      <div className="thumbnail">
                        <img src="./app/images/icon-food.svg" style={{height:120,margin:"30px auto"}} />
                        <div className="caption">
                          <h3>215 枚吃货</h3>
                          <p className="text-center">
                            <a href="#" className="btn btn-primary" role="button">加入他们</a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-xs-6 col-sm-3">
                      <div className="thumbnail">
                        <img src="./app/images/icon-study.svg" style={{height:120,margin:"30px auto"}} />
                        <div className="caption">
                          <h3>99 个学霸</h3>
                          <p className="text-center">
                            <a href="#" className="btn btn-primary" role="button">加入他们</a>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-xs-6 col-sm-3">
                      <div className="thumbnail">
                        <img src="./app/images/icon-sport.svg" style={{height:120,margin:"30px auto"}} />
                        <div className="caption">
                          <h3>41 位球迷</h3>
                          <p className="text-center">
                            <a href="#" className="btn btn-primary" role="button">加入他们</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

            </div>
        ) ;
    }
}

export { MainPage as default } ;
