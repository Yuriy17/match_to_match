export type Elements = {
  [key: string]: any,
};
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
}
