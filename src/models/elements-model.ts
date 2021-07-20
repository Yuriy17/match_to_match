export interface ModalConfig {
  id: string;
  body: {
    elements: Array<HTMLElement>;
  };
  header?: {
    title: string;
  };
  footer?: {
    isSpaceBetween: boolean;
    elements: Array<HTMLElement>;
  };
  isLink?: boolean;
  isForm?: boolean;
  size?: string;
  isExample?: boolean;
}
export type EntryButtons = {
  regButton: HTMLElement;
  logInButton: HTMLElement;
  logOutButton: HTMLElement;
};

export interface RouteLinks {
  [k: string]: any;
}
