import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP , { Toggle, Button } from 'react-uwp'
import { Layout, Row, Col, Card } from 'antd'
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

import { connect } from 'dva'
import { SERVERURL } from "../../../env";

export interface IConnectToMicrosoftProps {
    dispatch: any,
    learnerProfile: object,
    location: any
}
/**
 *
 * 创建新项目
 * 
 * @class ConnectToMicrosoft
 * @extends {React.Component<IConnectToMicrosoftProps>}
 */
class ConnectToMicrosoft extends React.Component<IConnectToMicrosoftProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public componentDidMount = async () => {
        let code: string
        try{
            const query = this.props.location.search
            const arr = query.split('&')
            code = arr[0].substr(6)
        } catch(error)
        {
            return
        }
        if (code) {
            console.log("获得code,尝试录入")
            const connectToMicrosoftBody = {code}
            const connectToMicrosoftResponse  = await fetch(`${SERVERURL}/v1/utilities/connectToMicrosoft`, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    'Access-Control-Allow-Origin': '*',
                    "Authorization": window.localStorage.getItem("access_token"),
                    "refresh_token": window.localStorage.getItem("refresh_token"),
                    "openid": window.localStorage.getItem("openid")
                },
                method: "POST",
                body: JSON.stringify(connectToMicrosoftBody)
            }).then(response => response.json())
            localStorage.setItem("microsoftId", connectToMicrosoftResponse.microsoftId || "")
        }
    }

    public render():JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Layout>
                <Header style={{height:"48px", marginBottom:"20px", padding:"0px"}}>
                    <Row type="flex" justify="space-around" align="middle">
                        <Col span={18}>
                        </Col>
                        <Col span={2} >
                            <span>placeholder</span>
                        </Col>
                        <Col span={2}>
                            <span>placeholder</span>
                        </Col>
                        <Col span={1} >
                            <span>placeholder</span>
                        </Col>
                    </Row>
                </Header>
                <Content style={{display: "flex", top: "74px", bottom: "0px", width: "auto"}}>
                    <Row type="flex" justify="space-around" align="middle" style={{width: "-webkit-fill-available"}}> 
                    {/* 此处的width可能有兼容性问题 */}
                        <Col span={8}>
                            <Button
                                style={{display: `${localStorage.getItem("microsoftId")?"none":"block"}`}}
                                onClick={() => window.location.href =
                                `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?`+
                                `client_id=a4306d35-06ad-4bbc-ba58-95587dffab3f`+
                                `&response_type=code`+
                                `&redirect_uri=${encodeURIComponent("http://localhost:8000/connectToMicrosoft")}`+
                                `&scope=${encodeURIComponent("openid profile https://graph.microsoft.com/calendars.readwrite https://graph.microsoft.com/user.readwrite")}`+
                                `&response_mode=query`+
                                `&state=12345`+
                                `&nonce=678910`}
                            >
                                关联Microsoft/Office 365账号
                            </Button>
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    <p>footer</p>
                </Footer>
            </Layout>
        );
    }
}

function mapStateToProps({main, learnerProfile}) {
    return { main, learnerProfile }
}

export default connect(mapStateToProps)(ConnectToMicrosoft)