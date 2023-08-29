export interface Customer {
    customerId: string
    userName: string
    mobile: string
    tagSetting: Array<Tag>
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
    tagId?: number;
    tagName: string;
    tagDescription: string;
    department?: string;
    tagType?: string;
    startDate?: string;
    endDate?: string;
}