import { TagCategory } from "@api/models/tag-manage.model";


export const TagCategoryMock: Array<TagCategory> = [
  {
    "categoryValue": "category_value_1",
    "categoryName": "主構面1",
    "tagTopic": [
      {
        "tagTopicValue": "topic_value_1_1",
        "tagTopicName": "子構面1_1"
      },
      {
        "tagTopicValue": "topic_value_1_2",
        "tagTopicName": "子構面1_2"
      }
    ]
  },
  {
    "categoryValue": "category_value_2",
    "categoryName": "主構面2",
    "tagTopic": [
      {
        "tagTopicValue": "topic_value_2_1",
        "tagTopicName": "子構面2_1"
      },
      {
        "tagTopicValue": "topic_value_2_2",
        "tagTopicName": "子構面2_2"
      }
    ]
  }
]
