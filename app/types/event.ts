export interface EventCard {
  title: string;
  description: string;
  image: string[];
}

export interface EventData {
  title: string;
  info: string;
  link: string;
  date: string;
  type: string;
  icon?: string; // 修改為可選屬性
  color?: string; // 修改為可選屬性
  card: EventCard;
}

// 定義單個事件項目類型
export interface EventItem {
  id: string;
  detail: EventData;
}

// 定義整個 event.json 的數據類型
export type EventsList = EventItem[];
