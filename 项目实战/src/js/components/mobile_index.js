import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list'
import {Carousel, Tabs} from "antd";
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };
        return (
            <div>
                <MobileHeader/>
                <Tabs>
                    <TabPane tab="头条" key="1">
                        <div className="m_header_carousel">
                            <div className="carousel">
                                <Carousel {...settings} >
                                    <div><img src="./src/images/psb.jpg" alt="news1"/></div>
                                    <div><img src="./src/images/psb.jpg" alt="news2"/></div>
                                    <div><img src="./src/images/psb.jpg" alt="news3"/></div>
                                    <div><img src="./src/images/psb.jpg" alt="news4"/></div>
                                </Carousel>
                            </div>
                        </div>
                        <MobileList count={20} type="top" />
                    </TabPane>
                    <TabPane tab="社会" key="2">
                    </TabPane>
                    <TabPane tab="国内" key="3">
                    </TabPane>
                    <TabPane tab="国际" key="4">
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                    </TabPane>
                </Tabs>
                <MobileFooter></MobileFooter>
            </div>
        );
    };
}
