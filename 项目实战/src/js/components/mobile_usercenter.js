import React from 'react';
import { Row, Col, Modal, Menu, Iron,Tabs, message, Form, Input, Button, Checkbox, Card, notification, Upload} from 'antd';
import {BrowsRouter, HashRouter, Route, Switch} from 'react-router-dom';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

export default class MobileUserCenter extends React.Component {
    constructor(){
        super();
        this.state = {
            userCollection: '',
            userComments: '',
            previewImage: '',
            previewVisible: false
        }
    }
    componentDidMount(){
        const myFetchOptions = {
            method: 'GET'
        };
        fetch("http://v.juhe.cn/toutiao/index?type=top&key=980c24b3d8e4d120798e822110f76e02",myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({userCollection: json});
            });
        fetch("http://v.juhe.cn/toutiao/index?type=top&key=980c24b3d8e4d120798e822110f76e02",myFetchOptions) //获取用户评论
            .then(response => response.json())
            .then(json => {
                this.setState({userCollection: json});
            });
    }
    render(){
        const {userCollection,userComments} = this.state;
        const userCollectionList = userCollection.length ?
            userCollection.map((uc,index) => (
                <Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>} >
                    <p>{uc.title}</p>
                </Card>
            ))
            :
            '没有收藏任何新闻';
        const userCommentsList = userComments.length ?
            userComments.map((comment,index) => (
                <Card key={index} title={`您于${comment.datetime}评论了文章${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>} >
                    <p>{comment.comments}</p>
                </Card>
            ))
            :
            '您还没有评论过任何新闻';
        return (
            <div>
                <MobileHeader/>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                    <Row>
                                        <Col span={24}>
                                            {userCollectionList}
                                        </Col>
                                    </Row>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <Row>
                                    <Col span={24}>
                                        {userCommentsList}
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">

                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter />
            </div>
        )
    }
}