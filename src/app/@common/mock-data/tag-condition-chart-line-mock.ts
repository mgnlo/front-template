import { TagConditionChartLine } from "@api/models/tag-manage.model";

export const TagConditionChartLineMock: TagConditionChartLine =
{
  "conditionKey": "人數",
  "conditionName": "刷卡消費金額",
  "conditionDistribution": [
    {
      "distributionKey": "3000萬",
      "distributionValue": 60,
      "sort": "3"
    },
    {
      "distributionKey": "9000萬",
      "distributionValue": 50,
      "sort": "-1"
    },
    {
      "distributionKey": "1000萬",
      "distributionValue": 10,
      "sort": "1"
    },
    {
      "distributionKey": "2000萬",
      "distributionValue": 40,
      "sort": "2"
    },
  ]
}
