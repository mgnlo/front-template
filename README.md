# ConsoleFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## 資料夾結構
├── src
│   ├── app
│	│	├── @api
│	│	├── @common
│	│	├── @component
│	│	├── @pages 
│	│	├── @theme

### @資料夾

開發時若需要 import `@api`, `@common`, `@pages`, `@theme` 等等路徑，可參考以下寫法:

```
import ... from "@api/..."
import ... from "@common/..."
import ... from "@component/..."
import ... from "@theme/..."
import ... from "@pages/..."
```

因為目前已經在 `tsconfig.json` 定義好 `@api`, `@common`, `@pages`, `@theme` 的路徑了，
未來若有常使用的 Folder 也可以在 `tsconfig.json` 加入設定。

### @api

├── @api
│   ├── models
│   ├── services

**services** 
全站使用的 service 由 ApiModule 管理與提供，這些 services 通常是 Singleton，只會有一個實例存在並且由 ApiMoudle 提供確保 services 抱持一個實例，此外 ApiModule 只會 import 在 AppModule 做註冊，其他 feature modules 不可 import ApiModule。

**models**
定義 service response 的資料結構(class、interface)

### @common

CommonModuel 主要提供常用的設定(const、enum)與函式庫(pipes、directives、utils)

├── @common
│   ├── consts
│   ├── enums
│   ├── pipes
│   ├── utils
│   ├── directives

### @component
全站共用元件(Dialog、Popup...etc)

### @pages

已功能頁面切分模組(feature modules)放在此目錄底下，並由 PagesRoutingModule 做路由設定與 lazyloading。
各 feature modules 內會有自己的 routing 與 service。

### @theme
整個專案的 `Layout`、`Theme` 都會設定在 ThemeModule。
