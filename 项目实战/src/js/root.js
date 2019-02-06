import React from 'react';
import ReactDOM from 'react-dom';
import {BrowsRouter, HashRouter, Route, Switch} from 'react-router-dom';
import PCIndex from './components/pc_index';
import PCNewsDetail from './components/pc_news_detail';
import MobileNewsDetail from './components/mobile_news_detail';
import MobileIndex from './components/mobile_index';
import MediaQuery from 'react-responsive';
import PCUserCenter from "./components/pc_usercenter";
import MobileUserCenter from './components/mobile_usercenter';
require ('../css/pc.css');
require ('../css/mobile.css');
export default class Root extends React.Component{
    render(){
        return (
            <div>
                <MediaQuery query='(min-device-width: 1224px)'>
                    <HashRouter >
                        <Switch>
                            <Route exact path="/" component={PCIndex}></Route>
                            <Route exact path="/details/:uniquekey" component={PCNewsDetail}></Route>
                            <Route exact path="/usercenter" component={PCUserCenter}></Route>
                        </Switch>
                    </HashRouter>
                </MediaQuery>
                <MediaQuery query='(max-device-width: 1224px)'>
                    <HashRouter >
                        <Switch>
                            <Route exact path="/" component={MobileIndex}></Route>
                            <Route exact path="/details:uniquekey" component={MobileNewsDetail}></Route>
                            <Route exact path="/usercenter" component={MobileUserCenter}></Route>
                        </Switch>
                    </HashRouter>
                </MediaQuery>
            </div>
        );
    };
}

ReactDOM.render(<Root/>,document.getElementById("mainContainer"));