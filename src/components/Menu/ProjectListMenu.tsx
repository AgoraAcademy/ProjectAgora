import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import TreeView, { TreeItem } from "react-uwp/TreeView";
import Icon from "react-uwp/Icon";
import { connect } from 'dva'
import { Badge } from "antd";


const baseStyle: React.CSSProperties = {
    margin: "10px 10px 10px 0"
};

export interface IProjectListMenuProps {
    dispatch: any
    learnerProfile: any
    main:any
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
    
    public getListSource = () => {
        let projectList = [...this.props.main.projectList] || []
        console.log("old projectList", projectList)
        projectList = projectList.filter(project => project.projectMentorID.toString() === localStorage.getItem("learnerId"))
        console.log("mid projectList", projectList)
        projectList = projectList.filter(project => project.status === "审核中")
        console.log("new projectList", projectList)
        const listSource: TreeItem[] = [{
            title: "项目管理",
            hidden: localStorage.getItem("isMentor") === "true",
            expanded: true,
            children: [{
                title: "创建新项目",
                onClick: () => this.props.dispatch(
                    {type: "main/redirect", path:"#/project/create"}
                )
            }, {
                title: "进行中项目",
                onClick: () => this.props.dispatch(
                    {type: "main/redirect", path:"#/project?status=ongoing"}
                )
            }, {
                title: "已完成项目",
                onClick: () => this.props.dispatch(
                    {type: "main/redirect", path:"#/project?status=finished"}
                )
            }, {
                title: "待审核项目",
                onClick: () => this.props.dispatch(
                    {type: "main/redirect", path:"#/project?status=waitingForAprroval"}
                )
            }, {
                title: "全部项目",
                onClick: () => this.props.dispatch(
                    {type: "main/redirect", path:"#/project"}
                )
            }]
        }, {
            title: "项目管理（导师）",
            hidden: !(localStorage.getItem("isMentor") === "true"),
            expanded: true,
            children: [{
                title: "指导中项目",
                onClick: () => this.props.dispatch(
                    {type: "main/redirect", path:"#/project?status=ongoing"}
                )
            }, {
                title: "已完成项目",
                onClick: () => this.props.dispatch(
                    {type: "main/redirect", path:"#/project?status=finished"}
                )
            }, {
                titleNode: <div><span>待审核项目  </span><Badge count={projectList.length} /></div>,
                onClick: () => this.props.dispatch(
                    {type: "main/redirect", path:"#/project?status=waitingForAprroval"}
                )
            }]
        }, {
            title: "课程管理（导师）",
            hidden: !(localStorage.getItem("isMentor") === "true"),
            expanded: true,
            children: [{
                title: "创建新课程（引导项目）",
                onClick: () => this.props.dispatch(
                    {type: "main/redirect", path:"#/course/create"}
                )
            }, {
                title: "进行中课程",
                onClick: () => this.props.dispatch(
                    { type: "learnerProfile/setField", name: "activeTab", value: "basicInfo" }
                )
            }, {
                title: "已完成课程",
                onClick: () => this.props.dispatch(
                    { type: "learnerProfile/setField", name: "activeTab", value: "basicInfo" }
                )
            }, {
                title: "审核中课程",
                onClick: () => this.props.dispatch(
                    { type: "learnerProfile/setField", name: "activeTab", value: "contactInfo" }
                )
            }]
        }]
        return listSource
    }
    
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
                    listSource={this.getListSource()}
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