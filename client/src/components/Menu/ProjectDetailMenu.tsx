import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import TreeView, { TreeItem } from "react-uwp/TreeView";
import Icon from "react-uwp/Icon";
import { connect } from 'dva'


const baseStyle: React.CSSProperties = {
    margin: "10px 10px 10px 0"
};

export interface IProjectDetailMenuProps {
    dispatch: any
    learnerProfile: any
};

/**
 * 项目详情菜单
 *
 * @class ProjectDetailMenu
 * @extends {React.Component<IProjectDetailMenuProps>}
 */

class ProjectDetailMenu extends React.Component<IProjectDetailMenuProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public listSource: TreeItem[]=[{
        title: "项目导航",
        children: [{
            title: "Item_0",
            onClick: ()=> this.props.dispatch(
                {type: "main/redirect", path: "/project/1#item_0"}
            )}, {
            title: "Item_1",
            onClick: ()=> this.props.dispatch(
                {type: "main/redirect", path: "/project/1#item_1"}
            )}, {
            title: "Item_2",
            onClick: ()=> this.props.dispatch(
                {type: "main/redirect", path: "/project/1#item_2"}
            )}, {
            title: "Item_3",
            onClick: ()=> this.props.dispatch(
                {type: "main/redirect", path: "/project/1#item_3"}
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

export default connect(mapStateToProps)(ProjectDetailMenu)