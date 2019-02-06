import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import CommonComments from './common_comments';
import {Row, Col, BackTop} from 'antd';
export default class MobileNewssDetail extends React.Component {
    constructor(){
        super();
        this.state = {
            newsItem: ''
        }
    }
    componentDidMount(){
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://v.juhe.cn/toutiao/index?type=top&key=980c24b3d8e4d120798e822110f76e02",myFetchOptions)
            .then(response => response.json())
            .then(json => {
                this.setState({newsItem: json});
                document.title = this.state.newsItem.title + " - React News 驱动的新闻平台"
            });
    }
    createMarkup(){
        return {
            _html:this.state.newsItem.pagecontent
        };
    }
    render(){
        return (
            <div id="mobileDetailsContainer">
                <MobileHeader />
                <div className="ucmobileList">
                <Row>
                    <Col span={24} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <hr />
                        <CommonComments uniquekey={this.props.params.uniquekey} />
                    </Col>
                </Row>
                <MobileFooter />
                <BackTop/>
                </div>
            </div>
        )
    }
}