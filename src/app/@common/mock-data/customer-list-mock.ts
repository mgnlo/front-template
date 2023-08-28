import { Customer } from "@api/models/customer-list.model";

export const CustomerListMock: Array<Customer> = [
  {
    customerId: 'A130864804',
    userName: '唐XX',
    mobile: '0916169386',
    tagSetting: [
      {tagName:'近一個月_基金定期定額手續費-高', tagDescription:'近一個基金交易手續費大於等於3,000'},
      {tagName:'近三個月_基金手續費-低', tagDescription: '近三個月基金交易手續費小於100'},
      {tagName:'已婚', tagDescription: '已婚'},
      {tagName:'近一個月_基金定期定額手續費-高', tagDescription:'近一個基金交易手續費大於等於3,000'},
      {tagName:'近三個月_基金手續費-低', tagDescription: '近三個月基金交易手續費小於100'},
      {tagName:'已婚', tagDescription: '已婚'},
      {tagName:'近一個月_基金定期定額手續費-高', tagDescription:'近一個基金交易手續費大於等於3,000'},
      {tagName:'近三個月_基金手續費-低', tagDescription: '近三個月基金交易手續費小於100'},
      {tagName:'已婚', tagDescription: '已婚'},
    ],
    birthday: '1990-03-15',
    gender: 'F',
    totalTxAmount: 1547136,
    branchName: '松南分行',
    address: '台北市松山區南京東路五段XX號X',
    department: '信用卡暨支付處'
  },
  {
    customerId: 'A135041919',
    userName: '王XX',
    mobile: '0935547517',
    tagSetting: [
      {tagName:'近一個月_換匯_交易金額-高', tagDescription:'近三個月換匯交易金額大於等於5,000'},
      {tagName:'近三個月_基金_交易金額-低', tagDescription:'近三個月基金交易金額小於等於1,000'},
      {tagName:'已婚', tagDescription: '已婚'},
      {tagName:'居住地-北部', tagDescription:'現居地址位於北部'},
      {tagName:'近一個月_換匯_交易金額-高', tagDescription:'近三個月換匯交易金額大於等於5,000'},
      {tagName:'近三個月_基金_交易金額-低', tagDescription:'近三個月基金交易金額小於等於1,000'},
      {tagName:'已婚', tagDescription: '已婚'},
      {tagName:'居住地-北部', tagDescription:'現居地址位於北部'}
    ],
    birthday: '1985-06-03',
    gender: 'M',
    totalTxAmount: 1204420,
    branchName: '景美分行',
    address: '台北市文山區景美街5巷23號',
    department: '信用卡暨支付處'
  },
  {
    customerId: 'A195295988',
    userName: '康XX',
    mobile: '0969265172',
    tagSetting: [
      {tagName:'交易黏著度-高', tagDescription:'近三個月換匯交易金額大於等於5,000'},
      {tagName:'交易黏著度-高', tagDescription:'近三個月基金交易金額小於等於1,000'},
      {tagName:'居住地-中部', tagDescription: '現居地址位於中部'},
      {tagName:'美食愛好者', tagDescription:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'}
    ],
    birthday: '1995-10-27',
    gender: 'F',
    totalTxAmount: 335920,
    branchName: '中山分行',
    address: '台北市大同區南京西路18巷6弄8-2號',
    department: '信用卡暨支付處'
  },
  {
    customerId: 'B109170244',
    userName: '鄧XX',
    mobile: '0987967806',
    tagSetting: [
      {tagName:'循環信用額度-高', tagDescription:'近三個月循環金額大於等於3,000'},
      {tagName:'非信用卡客戶', tagDescription:'未於本公司申辦信用卡之用戶'},
      {tagName:'美食愛好者', tagDescription:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'}
    ],
    birthday: '1996-04-19',
    gender: 'F',
    totalTxAmount: 197312,
    branchName: '板橋北門分行',
    address: '新北市板橋區北門街10號',
    department: '數位金融處'
  },
  {
    customerId: 'B185810128',
    userName: '何XX',
    mobile: '0989381191',
    tagSetting: [
      {tagName:'美食愛好者', tagDescription:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'},
      {tagName:'居住地-南部', tagDescription:'現居地址位於南部'},
      {tagName:'交易黏著度-高', tagDescription:'近三個月換匯交易金額大於等於5,000'},
      {tagName:'男性', tagDescription:'性別為男性'}
    ],
    birthday: '1983-11-01',
    gender: 'M',
    totalTxAmount: 5943200,
    branchName: '江子翠分行',
    address: '新北市板橋區銘傳街76巷22號',
    department: '信用卡暨支付處'
  },
  {
    customerId: 'C112946963',
    userName: '熊XX',
    mobile: '0929064856',
    tagSetting: [
      {tagName:'男性', tagDescription:'性別為男性'},
      {tagName:'循環信用額度-高', tagDescription:'近三個月循環金額大於等於3,000'},
      {tagName:'居住地-南部', tagDescription:'現居地址位於南部'},
      {tagName:'已婚', tagDescription: '已婚'},
    ],
    birthday: '1965-09-22',
    gender: 'M',
    totalTxAmount: 80200,
    branchName: '板橋北門分行',
    address: '新北市板橋區北門街10號',
    department: '信用卡暨支付處'
  },
  {
    customerId: 'C113154540',
    userName: '譚XX',
    mobile: '0922997916',
    tagSetting: [
      {tagName:'女性', tagDescription:'性別為女性'},
      {tagName:'居住地-北部', tagDescription:'現居地址位於北部'},
      {tagName:'非信用卡客戶', tagDescription:'未於本公司申辦信用卡之用戶'},
      {tagName:'未婚', tagDescription: '未婚'},
    ],
    birthday: '1958-03-19',
    gender: 'F',
    totalTxAmount: 104500,
    branchName: '中山分行',
    address: '台北市大同區南京西路18巷6弄28號',
    department: '信用卡暨支付處'
  },
  {
    customerId: 'C119866018',
    userName: '孫XX',
    mobile: '0912345678',
    tagSetting: [
      {tagName:'非信用卡客戶', tagDescription:'未於本公司申辦信用卡之用戶'},
      {tagName:'美食愛好者', tagDescription:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'},
      {tagName:'信用狀況-良好', tagDescription: '無借貸紀錄或無欠繳紀錄'},
    ],
    birthday: '1966-12-25',
    gender: 'M',
    totalTxAmount: 156200,
    branchName: '東門分行',
    address: '台北市大安區信義路二段200號',
    department: '信用卡暨支付處'
  },
  {
    customerId: 'C150528007',
    userName: '羅XX',
    mobile: '0978500452',
    tagSetting: [
      {tagName:'循環信用額度-低', tagDescription:'近三個月循環金額小於3,000'},
      {tagName:'已婚', tagDescription:'已婚'},
      {tagName:'消費能力-高', tagDescription: '近三個月刷卡累計金額大於等於10,000'},
    ],
    birthday: '1980-01-18',
    gender: 'M',
    totalTxAmount: 426200,
    branchName: '信義分行',
    address: '台北市信義區忠孝東路五段68號',
    department: '財富管理處'
  },
  {
    customerId: 'C164346864',
    userName: '趙XX',
    mobile: '0978937402',
    tagSetting: [
      {tagName:'未婚', tagDescription:'未婚'},
      {tagName:'男性', tagDescription:'性別為男性'},
      {tagName:'消費能力-高', tagDescription: '近三個月刷卡累計金額大於等於10,000'},
    ],
    birthday: '1994-02-07',
    gender: 'M',
    totalTxAmount: 50200,
    branchName: '信義分行',
    address: '台北市信義區基隆路一段147巷5弄13號',
    department: '財富管理處'
  },
  {
    customerId: 'A123456789',
    userName: '高XX',
    mobile: '0912345678',
    tagSetting: [
      {tagName:'近三個月_基金定期定額手續費-高', tagDescription:'近三個月基金交易手續費大於等於9,000'},
      {tagName:'未婚', tagDescription:'未婚'},
    ],
    birthday: '1978-06-30',
    gender: 'F',
    totalTxAmount: 190200,
    branchName: '萬華分行',
    address: '台北市萬華區和平西路三段120號龍山美食廣場1樓',
    department: '財富管理處'
  },
  {
    customerId: 'F124491189',
    userName: '胡XX',
    mobile: '0931235217',
    tagSetting: [
      {tagName:'近一個月_換匯交易額-高', tagDescription:'近三個月換匯交易金額大於等於5,000'},
      {tagName:'近三個月_基金交易金額-低', tagDescription:'近三個月基金交易金額小於5,000'},
      {tagName:'居住地-北部', tagDescription:'現居地址位於北部'},
    ],
    birthday: '1984-07-27',
    gender: 'F',
    totalTxAmount: 43913250,
    branchName: '萬華分行',
    address: '台北市萬華區和平西路三段120號龍山美食廣場1樓',
    department: '數位金融處'
  },
  {
    customerId: 'A126400921',
    userName: '許XX',
    mobile: '0969265172',
    tagSetting: [
      {tagName:'交易黏著度-高', tagDescription:'近三個月換匯交易金額大於等於5,000'},
      {tagName:'交易黏著度-高', tagDescription:'近三個月基金交易金額小於等於1,000'},
      {tagName:'居住地-中部', tagDescription:'現居地址位於中部'},
      {tagName:'美食愛好者', tagDescription:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'},
    ],
    birthday: '1997-08-09',
    gender: 'F',
    totalTxAmount: 426200,
    branchName: '永和分行',
    address: '新北市永和區永利路108號1樓',
    department: '數位金融處'
  },
  {
    customerId: 'A237772047',
    userName: '陳XX',
    mobile: '0982614686',
    tagSetting: [
      {tagName:'循環信用額度-高', tagDescription:'近三個月循環金額大於等於3,000'},
      {tagName:'非信用卡客戶', tagDescription:'未於本公司申辦信用卡之用戶'},
      {tagName:'美食愛好者', tagDescription:'於各大運送平台(ex: UberEat、Food Panda) 刷卡訂餐5次以上'},
    ],
    birthday: '1999-05-14',
    gender: 'F',
    totalTxAmount: 9992408,
    branchName: '復興分行',
    address: '台北市大安區復興南路一段107巷7號1樓',
    department: '信用卡暨支付處'
  }
];