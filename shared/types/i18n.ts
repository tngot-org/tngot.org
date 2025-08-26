export interface I18nItem {
  loc?: {
    source?: string;
  };
  title?: {
    loc?: {
      source?: string;
    };
  };
  content?: {
    loc?: {
      source?: string;
    };
  };
  type?: number;
  start?: number;
  end?: number;
}
