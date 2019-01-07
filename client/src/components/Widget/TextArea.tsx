import { TextBox } from 'react-uwp'
import React from 'react'


class TextArea extends TextBox {
    render() {
        const {
            hoverStyle,
            focusStyle,
            leftNode,
            rightNode,
            style,
            className,
            textBoxStyle,
            onChange,
            onChangeValue,
            children,
            background,
            ...attributes
        } = this.props;
        const { hovered, focused } = this.state;
        const haveChild = leftNode || rightNode || children;
        const { theme } = this.context;
        const currBackground = (background === void 0 ? theme.altHigh : background);

        const hoverProps = {
            onMouseEnter: this.handleHover,
            onMouseLeave: this.handleUnHover
        };

        const rootWrapperStyle: React.CSSProperties = {
            lineHeight: "32px",
            height: 32,
            width: 296,
            padding: !haveChild ? "0 8px" : 0,
            fontSize: 14,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            color: focused ? "#000" : theme.baseHigh,
            background: focused ? "#fff" : currBackground || "none",
            boxShadow: focused ? `inset 0px 0px 0 2px ${this.context.theme.accent}` : hovered ? `inset 0px 0px 0 2px ${theme.baseMedium}` : `inset 0px 0px 0 2px ${theme.baseLow}`,
            border: "none",
            transition: "all .25s"
        };

        const inlineStyles = {
            root: haveChild ? theme.prefixStyle({
                ...rootWrapperStyle,
                ...style
            }) : {} as React.CSSProperties,
            input: theme.prefixStyle({
                ...(haveChild ? {
                    paddingLeft: rightNode ? 8 : void 0,
                    paddingRight: leftNode ? 8 : void 0,
                    width: "100%",
                    height: "100%",
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "inherit",
                    transition: "all .25s"
                } : rootWrapperStyle),
                ...(haveChild ? void 0 : style),
                ...textBoxStyle
            }) as React.CSSProperties
        };
        const styles = theme.prepareStyles({
            className: "text-box",
            styles: inlineStyles
        });

        const normalRender = (
            <textarea
                ref={inputElm => {
                    this.inputElm = inputElm as any;
                    if (!haveChild) this.rootElm = inputElm as any;
                }}
                {...attributes as any}
                style={styles.input.style}
                className={theme.classNames(className, styles.input.className)}
                onChange={(e) => {
                    onChangeValue(e.currentTarget.value);
                    onChange(e as any);
                }}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                {...(haveChild ? void 0 : hoverProps)}
            />
        );

        return haveChild ? (
            <div
                ref={rootElm => this.rootElm = rootElm}
                {...attributes as any}
                {...hoverProps}
                {...styles.root}
                onClick={this.handleClick}
            >
                {leftNode}
                {normalRender}
                {children}
                {rightNode}
            </div>
        ) : normalRender;
    }
}
export default TextArea