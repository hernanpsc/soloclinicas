export interface TreeNodeWithoutPartialSelection <T = any> {
    id?: string;
    label?: string;
    data?: T;
    icon?: string;
    expandedIcon?: any;
    collapsedIcon?: any;
    children?: TreeNodeWithoutPartialSelection <T>[];
    leaf?: boolean;
    expanded?: boolean;
    type?: string;
    style?: string;
    styleClass?: string;
    draggable?: boolean;
    droppable?: boolean;
    selectable?: boolean;
    key?: string;
}
