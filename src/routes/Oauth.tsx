import * as React from 'react';
import { Layout } from 'antd' 
import * as PropTypes from "prop-types";
import TextBox from "react-uwp/TextBox";
import Icon from "react-uwp/Icon";
import ReactUWP from 'react-uwp'
import Button from "react-uwp/Button";
import './Login.less'
import WxLogin from '../components/Widget/WxLogin';
import {WXLOGINAPPID, SERVERURL } from '../../env'
import { connect } from 'dva';

const { Header, Content, Footer } = Layout;
const baseStyle: React.CSSProperties = {
    margin: "10px 0"
};

export interface IOauthProps {
    location: any,
    dispatch: any,
    main: any
};
// 如果有记录，直接转入
//如果没记录，
class Oauth extends React.Component<IOauthProps> {
    public context: { theme: ReactUWP.ThemeType };
    public defaultBtnStyle: React.CSSProperties = {
        margin: 4
    };

    public componentDidMount = () =>{
        let code: string, state: string
        try{
            const query = this.props.location.search
            const arr = query.split('&')
            code = arr[0].substr(6)
            state = arr[1].substr(6)
        } catch(error)
        {
            console.log("没有正确获得code和state", error)
        }
        console.log("尝试获取登录信息，服务器地址为", SERVERURL)
        fetch(`${SERVERURL}/v1/oauth2?code=${code}&state=${state}`, {
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("access_token",data.access_token)
            localStorage.setItem("openid",data.openid)
            localStorage.setItem("refresh_token",data.refresh_token)
            localStorage.setItem("isLearner",data.isLearner)
            localStorage.setItem("validated",data.validated || false)
        })
    }
    public generateContent = () => {
        const { dispatch } = this.props
        const isLearner = localStorage.getItem("isLearner")
        const validated = localStorage.getItem("validated")
        if (validated) {
            dispatch({type: "main/redirect", path:"#/"})
            return
        }
        if (isLearner) {
            return(
                <div>等待验证</div>
            )
        }
        return (
            <div>添加用户</div>
        )
    }
    public render(): JSX.Element {
        return (
            <Layout>
                <Header>
                    Header
                </Header>
                <Content
                    className='mainView'
                >
                    <div>oauth2</div>
                    
                </Content>
                <Footer>
                    Footer
                </Footer>
            </Layout>
        );
    };
}


function mapStateToProps({main}) {
    return { main }
}
export default connect(mapStateToProps)(Oauth);