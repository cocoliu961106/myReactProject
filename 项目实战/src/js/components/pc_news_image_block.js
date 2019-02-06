import React from 'react';
import {Card} from 'antd';
import fetchJsonp from 'fetch-jsonp';
import {Router, Route, Link, browserHistory} from 'react-router';

export default class PCNewsImageBlock extends React.Component {
    constructor(){
        super();
        this.state = {
            news: ''
        };
    }

    componentWillMount(){
        var myFetchOptions = {
            method: 'GET',
            mode: 'cors'
        };
        fetch("http://v.juhe.cn/toutiao/index?type=top&key=980c24b3d8e4d120798e822110f76e02",myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({news: json.result.data}));
        console.log(this.state.news);
    };

    render(){
        const styleImage = {
            display: "block",
            width: this.props.imageWidth,
            height: "90px"
        };
        const styleH3 = {
            width: this.props.imageWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        };
        const {news} = this.state;
        const newsList = news.length
            ?
            news.map((newsItem,index) => (
                <div key={index} className="imageblock">
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        <div className="custom-image">
                            <img style={styleImage} src={newsItem.thumbnail_pic_s} alt=""/>
                        </div>
                        <div className="custom-card">
                            <h3 style={styleH3}>{newsItem.title}</h3>
                            <p>{newsItem.author_name}</p>
                        </div>
                    </Link>
                </div>
            ))
            :
            '没有加载到任何新闻';
        return(
            <div className="topNewsImage">
                <Card title={this.props.cartTitle} bordered={true} style={{width: this.props.width}}>
                    {newsList}
                </Card>
            </div>
        )
    }
}