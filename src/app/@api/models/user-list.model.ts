export interface UserList {
    custId: string
    userName: string
    mobile: string
    userTag: Array<{tagTitle: string, tagRule: string}>
    tagDept?: string
    birth?: string
    gender?: string
    totalTxAmount?: number
    branchId?: string
    branchName? : string
    addr?: string
    tagHistory?: Array<Tag>
}

export interface Tag {
    tagId: number;
    tagName: string;
    tagType: string;
    tagStartDate: string;
    tagEndDate: string;
}