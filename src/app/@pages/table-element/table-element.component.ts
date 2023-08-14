import { Component, OnInit } from "@angular/core"
import { ToggleColumnComponent } from "./custom-column/toggle.component";
import { ButtonColumnComponent } from "./custom-column/button.component";
import { StatusColumnComponent } from "./custom-column/status.component";
import { CheckboxColumnComponent } from "./custom-column/checkbox.component";
import { RadioColumnComponent } from "./custom-column/radio.component";
import { TagColumnComponent } from "./custom-column/tag.component";

interface GroupRow {
  name: string;
  col01: string;
  col02: string;
  col03: string;
  col04: string;
  col05: string;
  showSubRow: boolean;
  sub: SubRow[];
}
interface SubRow {
  name: string;
  col01: string;
  col02: string;
  col03: string;
  col04: string;
  col05: string;
  showChild: boolean;
  child: ChildRow[];
}
interface ChildRow {
  col01: string;
  col02: string;
  col03: number;
  col04: number;
}
interface CRUDGroupRow {
  name: string;
  showSubRow: boolean;
  sub: CRUDSubRow[];
}
interface CRUDSubRow {
  name: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}
@Component({
  selector: "app-page-table",
  templateUrl: "./table-element.component.html",
  styleUrls: ["./table-element.component.scss"]
})
export class TableElementComponent implements OnInit {  
  isOpen = false;
  isOpen2 = false;

  isAllSelected:boolean = false;
  isIndeterminate:boolean = false;
  
  basicTable = {
    // 操作欄位
    actions: false,

    // 篩選功能
    // hideSubHeader: true,

    // 欄位
    columns: {
        // 連結欄位
        column01: {
          title: '欄位標題',
        },
        column02: {
          title: '欄位文字置中',
          type: 'html',
          class: 'text_center',
          valuePrepareFunction: (value: any, row: any, cell: any) => {
            return `<p class="text_center">` + value + `</p>`;
          }
        },
        column03: {
          title: '欄位文字靠右',
          type: 'html',
          class: 'text_right',
          valuePrepareFunction: (value: any, row: any, cell: any) => {
            return `<p class="text_right">` + value + `</p>`;
          }
        },
        // toggle欄位
        toggle: {
          title:'啟用',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: ToggleColumnComponent,
        },
        // 狀態欄位
        status: {
          title:'狀態',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: StatusColumnComponent,
          valuePrepareFunction: (value: any, row: any, cell: any) => {
            return value;
          },
        },
        // 檢視欄位
        view: {
          title:'檢視',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: ButtonColumnComponent,
          onComponentInitFunction: (instance: ButtonColumnComponent, row: any) => {
            instance.buttonStatus = 'info';
            instance.buttonIcon = 'maximize-outline'
          },
        },
        // 編輯欄位
        edit: {
          title:'編輯',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: ButtonColumnComponent,
          onComponentInitFunction: (instance: ButtonColumnComponent, row: any) => {
            instance.buttonStatus = 'primary';
            instance.buttonIcon = 'edit-outline'
          },
        },
        // 刪除欄位
        delete: {
          title:'刪除',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: ButtonColumnComponent,
          onComponentInitFunction: (instance: ButtonColumnComponent, row: any) => {
            instance.buttonStatus = 'danger';
            instance.buttonIcon = 'trash-2-outline'
          },
        },
        // 分享欄位
        share: {
          title:'分享',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: ButtonColumnComponent,
          onComponentInitFunction: (instance: ButtonColumnComponent, row: any) => {
            instance.buttonStatus = 'info';
            instance.buttonIcon = 'share-outline'
          },
        },
        // 設定欄位
        setting: {
          title:'設定',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: ButtonColumnComponent,
          onComponentInitFunction: (instance: ButtonColumnComponent, row: any) => {
            instance.buttonStatus = 'primary';
            instance.buttonIcon = 'settings-outline'
          },
        },
        // 附件欄位
        attach: {
          title:'附件',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: ButtonColumnComponent,
          onComponentInitFunction: (instance: ButtonColumnComponent, row: any) => {
            instance.buttonStatus = 'success';
            instance.buttonIcon = 'attach-outline'
          },
        },
        // 訊息欄位
        info: {
          title:'訊息',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: ButtonColumnComponent,
          onComponentInitFunction: (instance: ButtonColumnComponent, row: any) => {
            instance.buttonStatus = 'info';
            instance.buttonIcon = 'share-outline'
          },
        },
        // 上傳欄位
        upload: {
          title:'上傳',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: ButtonColumnComponent,
          onComponentInitFunction: (instance: ButtonColumnComponent, row: any) => {
            instance.buttonStatus = 'success';
            instance.buttonIcon = 'cloud-upload-outline'
          },
        },
        // 下載欄位
        download: {
          title:'下載',
          type: 'custom',
          width: '3rem',
          class: 'center',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: ButtonColumnComponent,
          onComponentInitFunction: (instance: ButtonColumnComponent, row: any) => {
            instance.buttonStatus = 'success';
            instance.buttonIcon = 'cloud-download-outline'
          },
        },
    },
    noDataMessage: '查無資料',
  };
  basicdata = [
    {
      status: true,
      column01: '內容文字',
      column02: '內容文字',
      column03: '內容文字',
    },
    {
      status: true,
      column01: '內容文字',
      column02: '內容文字',
      column03: '內容文字',
    },
    {
      status: false,
      column01: '內容文字',
      column02: '內容文字',
      column03: '內容文字',
    },
  ];
  basicTable2 = {
    // 操作欄位
    actions: {
      columnTitle: '操作',
      // 新增
      add: false,
      // 編輯
      edit: true,
      // 刪除
      delete: true,
    },

    // 編輯按鈕
    edit: {
        editButtonContent: '<i class="actionIcon edit"></i>',
        saveButtonContent: '<i class="actionIcon save"></i>',
        cancelButtonContent: '<i class="actionIcon cancel"></i>',
    },

    // 刪除按鈕
    delete: {
        deleteButtonContent: '<i class="actionIcon delete"></i>',
        cancelButtonContent: '<i class="actionIcon cancel"></i>',
    },

    // 篩選功能
    hideSubHeader: false,

    // 欄位
    columns: {
        // 連結欄位
        column01: {
            title: '欄位標題',
        },
        column02: {
            title: '欄位標題',
            type: 'html',
            class: 'textAlign_Center',
            valuePrepareFunction: (cell: string, row: any) => {
              // 將文字置中的 CSS 樣式應用於特定欄位
              return `<p class="textAlign_Center">` + cell + `</p>`;
            }
        },
        column03: {
          title: '下拉欄位',
          editor: {
            type: 'list',
            config: {
              selectText: '請選擇',
              list: [
                { value: 'Option 1', title: 'Option 1' },
                { value: 'Option 2', title: 'Option 2' },
                { value: 'Option 3', title: 'Option 3' },
              ],
            },
          },
          filter: {
            type: 'list',
            config: {
              selectText: '請選擇',
              list: [
                { value: 'Option 1', title: 'Option 1' },
                { value: 'Option 2', title: 'Option 2' },
                { value: 'Option 3', title: 'Option 3' },
              ],
            },
          },
        },
    },
    noDataMessage: '查無資料',
  };
  basicdata2 = [
    {
        column01: '內容文字',
        column02: '內容文字',
        column03: 'Option 1',
    },
    {
        column01: '內容文字',
        column02: '內容文字',
        column03: 'Option 1',
    },
    {
        column01: '內容文字',
        column02: '內容文字',
        column03: 'Option 1',
    },
    {
        column01: '內容文字',
        column02: '內容文字',
        column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    {
      column01: '內容文字',
      column02: '內容文字',
      column03: 'Option 1',
    },
    
  ];
  basicTable3 = {
    // 操作欄位
    actions: false,

    // 篩選功能
    hideSubHeader: true,

    // selectMode: 'multi',
    // isAllSelected: false,

    // 欄位
    columns: {
        // 複選欄位
        isChecked: {
          title: '',
          type: 'custom',
          width: '3rem',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: CheckboxColumnComponent,
          valuePrepareFunction: (value: any, row: any, cell: any) => {
            return value;
          },
        },
        // 單選欄位
        radio: {
          title:'選擇',
          type: 'custom',
          width: '3rem',
          sort: false,
          filter: false,
          filterFunction: false,
          renderComponent: RadioColumnComponent,
        },
        column01: {
            title: '欄位標題',
        },
        // 標籤
        tag: {
          title: '標籤欄位',
          type: 'custom',
          renderComponent: TagColumnComponent,
        },
    },
    noDataMessage: '查無資料',
  };
  basicdata3 = [
    {
      isChecked: true,
      column01: '內容文字'
    },
    {
      isChecked: true,
      column01: '內容文字'
    },
    {
      isChecked: false,
      column01: '內容文字'
    },
  ];
  basicTable4 = {
    // 操作欄位
    actions: false,

    // 篩選功能
    hideSubHeader: true,

    // 欄位
    columns: {
      column01: {
        title: '欄位標題',
        class: 'min_w250'
      },
      create: {
        title:'新增',
        type: 'custom',
        class: 'center',
        sort: false,
        filter: false,
        filterFunction: false,
        renderComponent: CheckboxColumnComponent,
        valuePrepareFunction: (value: any, row: any, cell: any) => {
          return value;
        },
      },
      read: {
        title:'檢視',
        type: 'custom',
        class: 'center',
        sort: false,
        filter: false,
        filterFunction: false,
        renderComponent: CheckboxColumnComponent,
      },
      update: {
        title:'編輯',
        type: 'custom',
        class: 'center',
        sort: false,
        filter: false,
        filterFunction: false,
        renderComponent: CheckboxColumnComponent,
      },
      delete: {
        title:'刪除',
        type: 'custom',
        class: 'center',
        sort: false,
        filter: false,
        filterFunction: false,
        renderComponent: CheckboxColumnComponent,
      },
    },
    noDataMessage: '查無資料',
  };
  basicdata4 = [
    {
      column01: '內容文字',
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    {
      column01: '內容文字',
      create: false,
      read: true,
      update: true,
      delete: true,
    },
    {
      column01: '內容文字',
      create: false,
      read: true,
      update: false,
      delete: true,
    },
    {
      column01: '內容文字',
      create: false,
      read: true,
      update: false,
      delete: true,
    },
  ];
  treeTable: GroupRow[] = [
    {
      name: "群組名稱",
      col01: "內容文字",
      col02: "內容文字",
      col03: "內容文字",
      col04: "內容文字",
      col05: "內容文字",
      showSubRow: false,
      sub: [
        {
          name: "子群組名稱",
          col01: "內容文字",
          col02: "內容文字",
          col03: "內容文字",
          col04: "內容文字",
          col05: "內容文字",
          showChild: false,
          child: [
            {
              col01: "內容文字",
              col02: "內容文字",
              col03: 100,
              col04: 1000,
            }
          ]
        },
        {
          name: "子群組名稱",
          col01: "內容文字",
          col02: "內容文字",
          col03: "內容文字",
          col04: "內容文字",
          col05: "內容文字",
          showChild: false,
          child: [
            {
              col01: "內容文字",
              col02: "內容文字",
              col03: 100,
              col04: 1000,
            }
          ]
        },
      ]
    },
    {
      name: "群組名稱",
      col01: "內容文字",
      col02: "內容文字",
      col03: "內容文字",
      col04: "內容文字",
      col05: "內容文字",
      showSubRow: false,
      sub: [
        {
          name: "子群組名稱",
          col01: "內容文字",
          col02: "內容文字",
          col03: "內容文字",
          col04: "內容文字",
          col05: "內容文字",
          showChild: false,
          child: [
            {
              col01: "內容文字",
              col02: "內容文字",
              col03: 100,
              col04: 1000,
            }
          ]
        },
        {
          name: "子群組名稱",
          col01: "內容文字",
          col02: "內容文字",
          col03: "內容文字",
          col04: "內容文字",
          col05: "內容文字",
          showChild: false,
          child: []
        },
      ]
    },
    {
      name: "群組名稱",
      col01: "內容文字",
      col02: "內容文字",
      col03: "內容文字",
      col04: "內容文字",
      col05: "內容文字",
      showSubRow: false,
      sub: [
        {
          name: "子群組名稱",
          col01: "內容文字",
          col02: "內容文字",
          col03: "內容文字",
          col04: "內容文字",
          col05: "內容文字",
          showChild: false,
          child: []
        },
      ]
    },
  ];
  department: CRUDGroupRow[] = [
    {
      name: "視覺設計部門",
      showSubRow: false,
      sub: [
        {
          name: "設計總監",
          create: true,
          read: true,
          update: true,
          delete: true,
        },
        {
          name: "設計副理",
          create: true,
          read: true,
          update: true,
          delete: true,
        },
        {
          name: "資深設計師",
          create: true,
          read: true,
          update: true,
          delete: false,
        },
        {
          name: "設計師",
          create: false,
          read: true,
          update: false,
          delete: false,
        },
        {
          name: "設計助理",
          create: false,
          read: true,
          update: false,
          delete: false,
        },
      ],
    },
    {
      name: "專案辦公室",
      showSubRow: false,
      sub: [
        {
          name: "專案長",
          create: true,
          read: true,
          update: true,
          delete: true,
        },
        {
          name: "專案經理",
          create: true,
          read: true,
          update: true,
          delete: true,
        },
        {
          name: "產品經理",
          create: true,
          read: true,
          update: true,
          delete: true,
        },
      ],
    }
  ];

  ngOnInit() { }
  
  toggleShowSubRow(groupRow: GroupRow): void {
    groupRow.showSubRow = !groupRow.showSubRow;
    if (!groupRow.showSubRow) {
      for (const subRow of groupRow.sub) {
        subRow.showChild = false;
      }
    }
  }
  toggleShowChild(subRow: SubRow): void {
    subRow.showChild = !subRow.showChild;
  }
  toggleShowPosition(groupRow: CRUDGroupRow): void {
    groupRow.showSubRow = !groupRow.showSubRow;
  }
}
