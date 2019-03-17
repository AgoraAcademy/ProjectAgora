import * as React from 'react';
import { Layout } from 'antd' 
import * as PropTypes from "prop-types";
import TextBox from "react-uwp/TextBox";
import Icon from "react-uwp/Icon";
import ReactUWP, { Toast } from 'react-uwp'
import Button from "react-uwp/Button";
import './Login.less'
import WxLogin from '../components/Widget/WxLogin';

const { Header, Content, Footer } = Layout;
const baseStyle: React.CSSProperties = {
    margin: "10px 0"
};

export interface ILoginProps {
    placeholder: string,
    location: any
};
export interface ILoginState {
    placeholder: string,
    message: string
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

    public message = this.props.location.search.split('&')[0].substr(9) || ""
    
    public state: ILoginState = {
        placeholder: "",
        message: this.message
    }

    public render(): JSX.Element {
        const toastMessageMapper = {
            noid: "未登录",
            notlearner: "未注册",
            notvalidated: "未验证",
            loggedout: "已注销"
        }
        return (
            <Layout>
                <Header>
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
                        redirect_uri="http://agora.mynetgear.com:10080/#/oauth2"
                    />
                </Content>
                <Footer>
                    <Toast
                        defaultShow={this.state.message === ""? false: true}
                        // onToggleShowToast={message => this.setState({ showToast1 })}
                        // logoNode={<Image style={{ clipPath: "circle(16px at 16px 16px)" }} src={require("assets/images/icon-32x32.png")} />}
                        title={toastMessageMapper[this.state.message]}
                        description={[`${toastMessageMapper[this.state.message]}`]}
                        showCloseIcon
                        closeDelay={5000}
                    />
                </Footer>
            </Layout>
        );
    };
}

export default Login;