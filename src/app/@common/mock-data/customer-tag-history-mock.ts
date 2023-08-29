export const CustomerTagHistory: {
  tagName: string,
  tagType: 'normal' | 'document', // normal=規則標籤, document=名單標籤
  tracks: { startDate: string, endDate: string }[]
}[] =
  [{
    tagName: "淨流出", //標籤名稱
    tagType: 'normal',
    tracks: [
      { startDate: '2021-06-27', endDate: '2021-12-04' },   //起始日、結束日
      { startDate: '2022-07-27', endDate: '2023-02-29' },
      { startDate: '2023-09-07', endDate: '2023-09-29' }
    ]
  }, {
    tagName: "淨流入",
    tagType: 'normal',
    tracks: [
      { startDate: '2022-05-23', endDate: '2023-07-14' },
      { startDate: '2023-07-21', endDate: '2023-08-29' }
    ]
  }, {
    tagName: "產品持有－JCB白",
    tagType: 'document',
    tracks: [
      { startDate: '2021-04-23', endDate: '2022-12-14' },
      { startDate: '2023-07-11', endDate: '2023-09-29' }
    ]
  }, {
    tagName: "轉入金額－多",
    tagType: 'normal',
    tracks: [
      { startDate: '2021-02-23', endDate: '2021-08-14' },
      { startDate: '2022-07-11', endDate: '2023-09-29' }
    ]
  }, {
    tagName: "忠誠戶",
    tagType: 'document',
    tracks: [
      { startDate: '2021-07-23', endDate: '2022-02-14' },
      { startDate: '2022-03-23', endDate: '2022-11-14' },
      { startDate: '2023-07-11', endDate: '2023-09-29' }
    ]
  }, {
    tagName: "透支金額－少",
    tagType: 'normal',
    tracks: [
      { startDate: '2020-04-23', endDate: '2021-05-14' },
      { startDate: '2022-03-23', endDate: '2023-11-14' }
    ]
  }, {
    tagName: "官網平均停留時間－長",
    tagType: 'document',
    tracks: [
      { startDate: '2023-05-13', endDate: '2023-06-14' },
      { startDate: '2022-10-21', endDate: '2023-11-29' }
    ]
  }]
