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
  name?: {
    loc?: {
      source?: string;
    };
  };
  img?: {
    loc?: {
      source?: string;
    };
  };
  link?: {
    loc?: {
      source?: string;
    };
  };
  paras?: I18nItem[];
  type?: number;
  start?: number;
  end?: number;
}
