import { UserList } from "@api/models/user-list.model";

export const UserListMock: Array<UserList> = [
  {
    custId: 'A130864804',
    userName: '唐XX',
    mobile: '0916169386',
    userTag: [
      {tagTitle:'近一個月_基金定期定額手續費-高', tagRule:'近一個基金交易手續費大於等於3,000'},
      {tagTitle:'近三個月_基金手續費-低', tagRule: '近三個月基金交易手續費小於100'},
      {tagTitle:'已婚', tagRule: '已婚'},
      {tagTitle:'近一個月_基金定期定額手續費-高', tagRule:'近一個基金交易手續費大於等於3,000'},
      {tagTitle:'近三個月_基金手續費-低', tagRule: '近三個月基金交易手續費小於100'},
      {tagTitle:'已婚', tagRule: '已婚'},
      {tagTitle:'近一個月_基金定期定額手續費-高', tagRule:'近一個基金交易手續費大於等於3,000'},
      {tagTitle:'近三個月_基金手續費-低', tagRule: '近三個月基金交易手續費小於100'},
      {tagTitle:'已婚', tagRule: '已婚'},
    ],
    birth: '1990-03-15',
    gender: 'F',
    totalTxAmount: 1547136,
    branchName: '松南分行',
    addr: '台北市松山區南京東路五段XX號X',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'A135041919',
    userName: '王XX',
    mobile: '0935547517',
    userTag: [
      {tagTitle:'近一個月_換匯_交易金額-高', tagRule:'近三個月換匯交易金額大於等於5,000'},
      {tagTitle:'近三個月_基金_交易金額-低', tagRule:'近三個月基金交易金額小於等於1,000'},
      {tagTitle:'已婚', tagRule: '已婚'},
      {tagTitle:'居住地-北部', tagRule:'現居地址位於北部'},
      {tagTitle:'近一個月_換匯_交易金額-高', tagRule:'近三個月換匯交易金額大於等於5,000'},
      {tagTitle:'近三個月_基金_交易金額-低', tagRule:'近三個月基金交易金額小於等於1,000'},
      {tagTitle:'已婚', tagRule: '已婚'},
      {tagTitle:'居住地-北部', tagRule:'現居地址位於北部'}
    ],
    birth: '1985-06-03',
    gender: 'M',
    totalTxAmount: 1204420,
    branchName: '景美分行',
    addr: '台北市文山區景美街5巷23號',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'A195295988',
    userName: '康XX',
    mobile: '0969265172',
    userTag: [
      {tagTitle:'交易黏著度-高', tagRule:'近三個月換匯交易金額大於等於5,000'},
      {tagTitle:'交易黏著度-高', tagRule:'近三個月基金交易金額小於等於1,000'},
      {tagTitle:'居住地-中部', tagRule: '現居地址位於中部'},
      {tagTitle:'美食愛好者', tagRule:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'}
    ],
    birth: '1995-10-27',
    gender: 'F',
    totalTxAmount: 335920,
    branchName: '中山分行',
    addr: '台北市大同區南京西路18巷6弄8-2號',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'B109170244',
    userName: '鄧XX',
    mobile: '0987967806',
    userTag: [
      {tagTitle:'循環信用額度-高', tagRule:'近三個月循環金額大於等於3,000'},
      {tagTitle:'非信用卡客戶', tagRule:'未於本公司申辦信用卡之用戶'},
      {tagTitle:'美食愛好者', tagRule:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'}
    ],
    birth: '1996-04-19',
    gender: 'F',
    totalTxAmount: 197312,
    branchName: '板橋北門分行',
    addr: '新北市板橋區北門街10號',
    tagDept: '數位金融服務處'
  },
  {
    custId: 'B185810128',
    userName: '何XX',
    mobile: '0989381191',
    userTag: [
      {tagTitle:'美食愛好者', tagRule:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'},
      {tagTitle:'居住地-南部', tagRule:'現居地址位於南部'},
      {tagTitle:'交易黏著度-高', tagRule:'近三個月換匯交易金額大於等於5,000'},
      {tagTitle:'男性', tagRule:'性別為男性'}
    ],
    birth: '1983-11-01',
    gender: 'M',
    totalTxAmount: 5943200,
    branchName: '江子翠分行',
    addr: '新北市板橋區銘傳街76巷22號',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'C112946963',
    userName: '熊XX',
    mobile: '0929064856',
    userTag: [
      {tagTitle:'男性', tagRule:'性別為男性'},
      {tagTitle:'循環信用額度-高', tagRule:'近三個月循環金額大於等於3,000'},
      {tagTitle:'居住地-南部', tagRule:'現居地址位於南部'},
      {tagTitle:'已婚', tagRule: '已婚'},
    ],
    birth: '1965-09-22',
    gender: 'M',
    totalTxAmount: 80200,
    branchName: '板橋北門分行',
    addr: '新北市板橋區北門街10號',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'C113154540',
    userName: '譚XX',
    mobile: '0922997916',
    userTag: [
      {tagTitle:'女性', tagRule:'性別為女性'},
      {tagTitle:'居住地-北部', tagRule:'現居地址位於北部'},
      {tagTitle:'非信用卡客戶', tagRule:'未於本公司申辦信用卡之用戶'},
      {tagTitle:'未婚', tagRule: '未婚'},
    ],
    birth: '1958-03-19',
    gender: 'F',
    totalTxAmount: 104500,
    branchName: '中山分行',
    addr: '台北市大同區南京西路18巷6弄28號',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'C119866018',
    userName: '孫XX',
    mobile: '0912345678',
    userTag: [
      {tagTitle:'非信用卡客戶', tagRule:'未於本公司申辦信用卡之用戶'},
      {tagTitle:'美食愛好者', tagRule:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'},
      {tagTitle:'信用狀況-良好', tagRule: '無借貸紀錄或無欠繳紀錄'},
    ],
    birth: '1966-12-25',
    gender: 'M',
    totalTxAmount: 156200,
    branchName: '東門分行',
    addr: '台北市大安區信義路二段200號',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'C150528007',
    userName: '羅XX',
    mobile: '0978500452',
    userTag: [
      {tagTitle:'循環信用額度-低', tagRule:'近三個月循環金額小於3,000'},
      {tagTitle:'已婚', tagRule:'已婚'},
      {tagTitle:'消費能力-高', tagRule: '近三個月刷卡累計金額大於等於10,000'},
    ],
    birth: '1980-01-18',
    gender: 'M',
    totalTxAmount: 426200,
    branchName: '信義分行',
    addr: '台北市信義區忠孝東路五段68號',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'C164346864',
    userName: '趙XX',
    mobile: '0978937402',
    userTag: [
      {tagTitle:'未婚', tagRule:'未婚'},
      {tagTitle:'男性', tagRule:'性別為男性'},
      {tagTitle:'消費能力-高', tagRule: '近三個月刷卡累計金額大於等於10,000'},
    ],
    birth: '1994-02-07',
    gender: 'M',
    totalTxAmount: 50200,
    branchName: '信義分行',
    addr: '台北市信義區基隆路一段147巷5弄13號',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'A123456789',
    userName: '高XX',
    mobile: '0912345678',
    userTag: [
      {tagTitle:'近三個月_基金定期定額手續費-高', tagRule:'近三個月基金交易手續費大於等於9,000'},
      {tagTitle:'未婚', tagRule:'未婚'},
    ],
    birth: '1978-06-30',
    gender: 'F',
    totalTxAmount: 190200,
    branchName: '萬華分行',
    addr: '台北市萬華區和平西路三段120號龍山美食廣場1樓',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'F124491189',
    userName: '胡XX',
    mobile: '0931235217',
    userTag: [
      {tagTitle:'近一個月_換匯交易額-高', tagRule:'近三個月換匯交易金額大於等於5,000'},
      {tagTitle:'近三個月_基金交易金額-低', tagRule:'近三個月基金交易金額小於5,000'},
      {tagTitle:'居住地-北部', tagRule:'現居地址位於北部'},
    ],
    birth: '1984-07-27',
    gender: 'F',
    totalTxAmount: 43913250,
    branchName: '萬華分行',
    addr: '台北市萬華區和平西路三段120號龍山美食廣場1樓',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'A126400921',
    userName: '許XX',
    mobile: '0969265172',
    userTag: [
      {tagTitle:'交易黏著度-高', tagRule:'近三個月換匯交易金額大於等於5,000'},
      {tagTitle:'交易黏著度-高', tagRule:'近三個月基金交易金額小於等於1,000'},
      {tagTitle:'居住地-中部', tagRule:'現居地址位於中部'},
      {tagTitle:'美食愛好者', tagRule:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'},
    ],
    birth: '1997-08-09',
    gender: 'F',
    totalTxAmount: 426200,
    branchName: '永和分行',
    addr: '新北市永和區永利路108號1樓',
    tagDept: '信用卡暨支付處'
  },
  {
    custId: 'A237772047',
    userName: '陳XX',
    mobile: '0982614686',
    userTag: [
      {tagTitle:'循環信用額度-高', tagRule:'近三個月循環金額大於等於3,000'},
      {tagTitle:'非信用卡客戶', tagRule:'未於本公司申辦信用卡之用戶'},
      {tagTitle:'美食愛好者', tagRule:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'},
    ],
    birth: '1999-05-14',
    gender: 'F',
    totalTxAmount: 9992408,
    branchName: '復興分行',
    addr: '台北市大安區復興南路一段107巷7號1樓',
    tagDept: '信用卡暨支付處'
  }
];