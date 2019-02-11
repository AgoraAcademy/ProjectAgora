import * as React from 'react';
import { Layout } from 'antd' 
import * as PropTypes from "prop-types";
import TextBox from "react-uwp/TextBox";
import Icon from "react-uwp/Icon";
import ReactUWP from 'react-uwp'
import Button from "react-uwp/Button";
import './Login.less'
import WxLogin from '../components/Widget/WxLogin';

const { Header, Content, Footer } = Layout;
const baseStyle: React.CSSProperties = {
    margin: "10px 0"
};

export interface ILoginProps {
    placeholder: string
};
export interface ILoginState {
    placeholder: string
};
/**
 * 登录页面
 *
 * @class Login
 * @extends {React.Component<ILoginProps, ILoginState>}
 */

class Login extends React.Component<ILoginProps, ILoginState> {
    public context: { theme: ReactUWP.ThemeType };
    public defaultBtnStyle: React.CSSProperties = {
        margin: 4
    };
    public render(): JSX.Element {
        return (
            <Layout>
                <Header>
                    Header
                </Header>
                <Content
                    className='mainView'
                >
                    {/* <div
                        className='loginPortal'
                    >
                        <TextBox
                            style={baseStyle}
                            background="none"
                            placeholder="Username"
                            leftNode={<Icon style={{ margin: "0 8px" }}>Contact</Icon>}
                        />
                        <TextBox
                            style={baseStyle}
                            background="none"
                            placeholder="Password"
                            leftNode={<Icon style={{ margin: "0 8px" }}>Lock</Icon>}
                        />
                        <Button
                                style={{float: 'right'}}
                        >
                                登录
                        </Button>
                    </div> */}
                    <WxLogin 
                        appid="wxbadf910ec2b32d3c"
                        scope="snsapi_login"
                        state="lalala"
                        redirect_uri="https://projectagora.agoraacademy.cn/oauth2"
                    />
                </Content>
                <Footer>
                    Footer
                </Footer>
            </Layout>
        );
    };
}

export default Login;