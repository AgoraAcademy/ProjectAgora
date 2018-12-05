import * as React from "react";
import * as PropTypes from "prop-types";
import ReactUWP from 'react-uwp'
import TreeView, { TreeItem } from "react-uwp/TreeView";
import Icon from "react-uwp/Icon";
import CheckBox from "react-uwp/CheckBox";
import Toggle from "react-uwp/Toggle";
import Slider from "react-uwp/Slider";
import DropDownMenu from "react-uwp/DropDownMenu";

const baseStyle: React.CSSProperties = {
    margin: "10px 10px 10px 0"
};

const listSource: TreeItem[]=[{
    title: "个人信息",
    children: [{
        title: "基础信息",
        }, {
        title: "联系信息",
        }, {
        title: "医疗信息"
        }]
    }]


export default class HomerMenu extends React.Component<{}> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public render(): JSX.Element {
        const { theme } = this.context;
        return (
            <div>
                <TreeView
                    style={{ height: 640 }}
                    iconDirection="left"
                    itemHeight={36}
                    headerIcon={false && <Icon style={{ fontSize: 36 / 3 }}>FolderLegacy</Icon>}
                    itemIcon={false && <Icon style={{ fontSize: 36 / 3 }}>OpenFileLegacy</Icon>}
                    listSource={listSource}
                    showFocus
                    background={theme.useFluentDesign ? (
                        theme.acrylicTexture40.background
                    ) : theme.chromeLow}
                />
            </div>
        );
    }
}