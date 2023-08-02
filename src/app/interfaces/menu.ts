
export interface MyMenuItem {
    key: string;
    label: string | undefined;
    id?: string;
    children?: MyMenuItem[];
  }
  