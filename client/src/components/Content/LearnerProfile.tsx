import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout;

import { connect } from 'dva'

export interface ILearnerProfileProps {
    dispatch: any,
    learnerProfile: any,
}

class LearnerProfile extends React.Component<ILearnerProfileProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public generateHeader(activeTab: string): any {
        let headerTitle
        if (activeTab === "basicInfo") {
            headerTitle = "基本信息"
        }
        if (activeTab === "contactInfo") {
            headerTitle = "联系信息"
        }
        if (activeTab === "medicalInfo") {
            headerTitle = "医疗信息"
        }
        return <span style={this.context.theme.typographyStyles.title}>{headerTitle}</span>
    }
    public generateContent = (activeTab: string) => {
        let displayedContent
        let content
        const { theme } = this.context;
        console.log(theme)
        const {data} = this.props.learnerProfile
        if (!activeTab) {
            return 
        }
        if (activeTab === "basicInfo") {
            displayedContent = [
                {label:"ID", value: data.id},
                {label:"姓名", value: data.name},
                {label:"昵称", value: data.nickname},
            ]
        }
        if (activeTab === "contactInfo") {
            displayedContent = [
                {label:"电话号码", value: data.phoneNumber},
                {label:"微信", value: data.weChatContact},
                {label:"QQ", value: data.QQ},
                {label:"Email", value: data.email},
                {label:"紧急联系人", value: data.emergentContact},
                {label:"监护人", value: data.custodianInfo}
            ]
        }
        if (activeTab === "medicalInfo") {
            displayedContent = [
                {label:"血型", value: data.medicalInfo.bloodtype},
            ]
        }
        if (displayedContent) {
            console.log("dc", displayedContent)
            content = displayedContent.map(
                (item) => {
                    if (typeof(item.value) === "string") {
                        return (
                            <div key={Math.random()}>
                                <p style={theme.typographyStyles.caption}>{item.label}</p>
                                <p style={theme.typographyStyles.title}>{item.value}</p>
                            </div>
                        )
                    }
                    if (item.label === "紧急联系人") {
                        const emergentContacts = item.value.map(
                            (contact) => {
                                return (
                                    <p key={Math.random()}>
                                        <span style={theme.typographyStyles.title}>{contact.name}</span>
                                        <span style={theme.typographyStyles.caption}>{contact.number}</span>
                                    </p>
                                )
                            }
                        )
                        return (
                            <div key={Math.random()}>
                                <p style={theme.typographyStyles.caption}>{item.label}</p>
                                {emergentContacts}
                            </div>
                        )
                    }
                    if (item.label === "监护人") {
                        console.log("jhr", item.value)
                        const custodianInfo = item.value.map(
                            (custodian) => {
                                return (
                                    <div key={Math.random()}>
                                        <span style={theme.typographyStyles.title}>{custodian.name}</span>
                                        <span style={theme.typographyStyles.caption}>{custodian.relationship}</span>
                                    </div>
                                )
                            }
                        )
                        return (
                            <p key={Math.random()}>
                                <p style={theme.typographyStyles.caption}>{item.label}</p>
                                {custodianInfo}
                            </p>
                        )
                    }
                    
                }
            )
        }
        console.log("content为", content)
        return content
        
        
    }
    public render():JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <Layout style={{paddingLeft: '50px'}}>
                <Header>
                    {this.generateHeader(learnerProfile.activeTab)}
                </Header>
                <Content>
                    {this.generateContent(learnerProfile.activeTab)}
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

export default connect(mapStateToProps)(LearnerProfile)