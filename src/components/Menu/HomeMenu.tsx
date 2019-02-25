import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import TreeView, { TreeItem } from "react-uwp/TreeView";
import Icon from "react-uwp/Icon";
import { connect } from 'dva'


const baseStyle: React.CSSProperties = {
    margin: "10px 10px 10px 0"
};

export interface IHomeMenuProps {
    dispatch: any
    learnerProfile: any
};

/**
 * 主页菜单
 *
 * @class HomeMenu
 * @extends {React.Component<IHomeMenuProps>}
 */
class HomeMenu extends React.Component<IHomeMenuProps> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public listSource: TreeItem[]=[{
        title: "公示信息",
        children: [{
            title: "公示信息",
            onClick: ()=> this.props.dispatch(
            )}, {
            title: "公示信息",
            onClick: ()=> this.props.dispatch(
            )}, {
            title: "公示信息",
            onClick: ()=> this.props.dispatch(
            )}]
        },
        {
            title: "使用帮助",
            children: [{
                title: "使用帮助",
                onClick: ()=> this.props.dispatch(
                )}, {
                title: "使用帮助",
                onClick: ()=> this.props.dispatch(
                )}, {
                title: "使用帮助",
                onClick: ()=> this.props.dispatch(
                )}]
            },    
    ]
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

export default connect(mapStateToProps)(HomeMenu)