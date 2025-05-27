// 團隊成員介面
export interface TeamMember {
  discordId: string;
  name: string;
  link: string;
  avatar: string;
}

// 團隊組別介面
export interface TeamGroup {
  id: string;
  name: string;
  primaryLeader: TeamMember | null; // 可能沒有組長
  deputyLeader: TeamMember | null; // 可能沒有副組長
  members: TeamMember[] | null; // 可能沒有剩餘成員
}

// 團隊數據介面
export interface TeamData {
  totalMembers: number;
  lastUpdated: string;
  groups: TeamGroup[];
}
