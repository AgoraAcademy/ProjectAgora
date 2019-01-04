import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP, { ContentDialog, TextBox, Button } from 'react-uwp'
import { Layout, Drawer } from 'antd'
const { Header, Footer, Sider, Content } = Layout;

import { connect } from 'dva'

export interface IProjectInfoDrawerProps {
    dispatch: any,
    learnerProfile: any,
    visible: boolean,
    onClose: () => void
}

export interface IProjectInfoDrawerState {
    showDialog: boolean,
}
/**
 * 项目信息显示用Drawer组件
 *
 * @class ProjectInforDrawer
 * @extends {React.Component<IProjectInfoDrawerProps>}
 */

class ProjectInfoChildDrawer extends React.Component<IProjectInfoDrawerProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };
    public state: IProjectInfoDrawerState = {
        showDialog: false
    }

    public generateContent = (activeTab: string) => {
        let displayedContent
        let content
        const { theme } = this.context;
        const { data } = this.props.learnerProfile
        if (!activeTab) {
            return
        }
        if (activeTab === "basicInfo") {
            displayedContent = [
                { label: "ID", value: data.id },
                { label: "姓名", value: data.name },
                { label: "昵称", value: data.nickname },
            ]
        }
        if (activeTab === "contactInfo") {
            displayedContent = [
                { label: "电话号码", value: data.phoneNumber },
                { label: "微信", value: data.weChatContact },
                { label: "QQ", value: data.QQ },
                { label: "Email", value: data.email },
                { label: "紧急联系人", value: data.emergentContact },
                { label: "监护人", value: data.custodianInfo }
            ]
        }
        if (activeTab === "medicalInfo") {
            displayedContent = [
                { label: "血型", value: data.medicalInfo.bloodtype },
            ]
        }
        if (displayedContent) {
            console.log("dc", displayedContent)
            content = displayedContent.map(
                (item) => {
                    if (typeof (item.value) === "string") {
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
        return content
    }

    public render(): JSX.Element {
        const { theme } = this.context;
        const { learnerProfile } = this.props;
        return (
            <div>
                {this.generateContent(learnerProfile.activeTab)}
            </div>
        );
    }
}

function mapStateToProps({main, learnerProfile}) {
    return { main, learnerProfile }
}

export default connect(mapStateToProps)(ProjectInfoChildDrawer)