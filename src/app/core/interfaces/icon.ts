export interface Icon {
  img: string;
  color?: string;
  title?: string;
}

export interface Icons {
  [key: string]: Icon;
}
