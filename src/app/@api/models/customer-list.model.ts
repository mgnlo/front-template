export interface Customer {
    customerId: string
    userName: string
    mobile: string
    tagSetting: Array<{tagName: string, tagDescription: string, department?: string, startDate?: string, endDate?: string}>
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