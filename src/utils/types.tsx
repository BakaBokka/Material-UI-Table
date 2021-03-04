export type Data = {
  id: number;
  firstName: string;
  lastName: string;
  group: string;
};

export type Order = "asc" | "desc";

export type HeadCell = {
  id: keyof Data;
  label: string;

}

export type TableType = "users" | "groups";