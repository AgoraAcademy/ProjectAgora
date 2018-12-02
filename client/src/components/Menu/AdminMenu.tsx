import * as React from "react";
import * as PropTypes from "prop-types";
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
    title: "人员管理",
    children: [{
        title: "添加人员",
        children: [{
            title: "A-Child1-Hidden",
            hidden: true
        }, {
            title: "A-Child1-Child2"
        }]
    }]
},{
    title: "D",
    disabled: true
}]

export default class AdminMenu extends React.Component<{}> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ReactUWP.ThemeType };

    public render() {
        console.log("i got it!")
        const { theme } = this.context;
        return (
            <div>
                <TreeView
                    style={{ height: 640 }}
                    iconDirection="left"
                    itemHeight={32}
                    headerIcon={false && <Icon style={{ fontSize: 32 / 3 }}>FolderLegacy</Icon>}
                    itemIcon={false && <Icon style={{ fontSize: 32 / 3 }}>OpenFileLegacy</Icon>}
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