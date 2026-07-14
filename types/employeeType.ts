export interface Employee {
  id?: number;
  img: string;
  imgId: string;
  name: string;
  email: string;
  password?: string;
  department: string;
  status: string;
  salary: number | string;
}