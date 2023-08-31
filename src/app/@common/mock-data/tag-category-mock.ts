import { TagCategory, TagSubCategory } from "@api/models/tag-manage.model";


export const TagCategoryMock: Array<TagCategory> = [
  {
      "categoryKey": "category_value_1",
      "categoryName": "主構面1"
  },
  {
      "categoryKey": "category_value_2",
      "categoryName": "主構面2"
  }
]

export const TagSubCategoryMock: TagSubCategory= {
  "categoryKey": "category_value_1",
  "categoryName": "主構面1",
  "tagTopic": [
      {
          "tagTopicKey": "topic_value_1_1",
          "tagTopicName": "子構面1"
      },
      {
          "tagTopicKey": "topic_value_1_2",
          "tagTopicName": "子構面2"
      }
  ]
}

