import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import TreeView, { TreeItem } from "react-uwp/TreeView";
import Icon from "react-uwp/Icon";
import { connect } from 'dva'


const baseStyle: React.CSSProperties = {
    margin: "10px 10px 10px 0"
};

export interface IProjectListMenuProps {
    dispatch: any
    learnerProfile: any
};

/**
 * 项目列表菜单
 *
 * @class ProjectListMenu
 * @extends {React.Component<IProjectListMenuProps>}
 */


class ProjectListMenu extends React.Component<IProjectListMenuProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public listSource: TreeItem[] = [{
        title: "项目管理",
        children: [{
            title: "创建新项目",
            onClick: () => this.props.dispatch(
                {type: "main/redirect", path:"#/project/create"}
            )
        }, {
            title: "进行中项目",
            onClick: () => this.props.dispatch(
                { type: "learnerProfile/setField", name: "activeTab", value: "basicInfo" }
            )
        }, {
            title: "已完成项目",
            onClick: () => this.props.dispatch(
                { type: "learnerProfile/setField", name: "activeTab", value: "contactInfo" }
            )
        }, {
            title: "审核中项目",
            onClick: () => this.props.dispatch(
                { type: "learnerProfile/setField", name: "activeTab", value: "medicalInfo" }
            )
        }]
    }, {
        title: "项目管理（导师）",
        children: [{
            title: "创建新课程（引导项目）",
            onClick: () => this.props.dispatch(
                {type: "main/redirect", path:"#/course/create"}
            )
        }, {
            title: "进行中项目",
            onClick: () => this.props.dispatch(
                { type: "learnerProfile/setField", name: "activeTab", value: "basicInfo" }
            )
        }, {
            title: "未开始项目",
            onClick: () => this.props.dispatch(
                { type: "learnerProfile/setField", name: "activeTab", value: "contactInfo" }
            )
        }, {
            title: "已完成项目",
            onClick: () => this.props.dispatch(
                { type: "learnerProfile/setField", name: "activeTab", value: "contactInfo" }
            )
        }, {
            title: "指导中项目",
            onClick: () => this.props.dispatch(
                { type: "learnerProfile/setField", name: "activeTab", value: "medicalInfo" }
            )
        }]
    }]
    public render(): JSX.Element {
        const { theme } = this.context;
        return (
            <div>
                <TreeView
                    style={{ height: 640, width:"100%" }}
                    iconDirection="left"
                    itemHeight={36}
                    headerIcon={false && <Icon style={{ fontSize: 36 / 3 }}>FolderLegacy</Icon>}
                    itemIcon={false && <Icon style={{ fontSize: 36 / 3 }}>OpenFileLegacy</Icon>}
                    listSource={this.listSource}
                    showFocus
                    background={theme.useFluentDesign ? (
                        theme.acrylicTexture40.background
                    ) : theme.chromeLow}
                />
            </div>
        );
    }
}

function mapStateToProps({main, learnerProfile}) {
    return { main, learnerProfile }
}

export default connect(mapStateToProps)(ProjectListMenu)