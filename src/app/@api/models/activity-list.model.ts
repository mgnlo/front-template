export class Activity {
  activity_id: string
  activity_name: string
  activity_description: string
  filter_options: string
  list_limit: number
  status: string
  start_date: string
  end_date: string
  modification_time: string
  schedule_settings: string
  batch_update_time: string
  activity_list_condition: Array<activityListCondition>
  change_history: Array<changeHistory>
}

export class activityListCondition {
  activity_id: string
  condition_id: number
  tag_group: number
  tag_name: string
  tag_key: string
}

export class changeHistory {
  history_id: string
  activity_id: string
  group_id: number
  time: string
  title: string
  detail: string
  type: string
}