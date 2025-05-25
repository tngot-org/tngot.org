// 團隊成員介面
export interface TeamMember {
  name: string;
  img: string;
  alt: string;
  link: string;
  classes: string[];
}

// 團隊組別介面
export interface TeamGroup {
  id: string;
  name: string;
  members: TeamMember[];
}

// 團隊數據介面
export interface TeamData {
  groups: TeamGroup[];
}

// Google Apps Script API 回應介面
export interface TeamCountResponse {
  members: number;
}

// 團隊總人數數據介面
export interface TeamCountData {
  totalMemberCount: number;
}
