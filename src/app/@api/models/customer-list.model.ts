export interface CustomerList {
    customerId: string
    userName: string
    mobile: string
    userTag: Array<{tagTitle: string, tagRule: string}>
    department?: string
    birthday?: string
    gender?: string
    totalTxAmount?: number
    branchId?: string
    branchName? : string
    address?: string
    tagHistory?: Array<Tag>
}

export interface Tag {
    tagId: number;
    tagName: string;
    tagType: string;
    tagStartDate: string;
    tagEndDate: string;
}