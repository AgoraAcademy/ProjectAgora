import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import TreeView, { TreeItem } from "react-uwp/TreeView";
import Icon from "react-uwp/Icon";
import { connect } from 'dva'


const baseStyle: React.CSSProperties = {
    margin: "10px 10px 10px 0"
};

export interface IAdminMenuProps {
    dispatch: any
    learnerProfile: any
};

/**
 * 管理员界面菜单
 *
 * @class AdminMenu
 * @extends {React.Component<IAdminMenuProps>}
 */


class AdminMenu extends React.Component<IAdminMenuProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public listSource: TreeItem[]=[{
        title: "人员管理",
        children: [{
            title: "审核新成员",
            onClick: ()=> this.props.dispatch(
                // {type: "main/redirect", path:"#/learner/create"}
            )}, {
            title: "查询成员信息",
            onClick: ()=> this.props.dispatch(
                {type: "learnerProfile/setField", name: "activeTab", value: "contactInfo"}
            )}, {
            title: "设定导师关系",
            onClick: ()=> this.props.dispatch(
                {type: "learnerProfile/setField", name: "activeTab", value: "medicalInfo"}
            )}]
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

export default connect(mapStateToProps)(AdminMenu)