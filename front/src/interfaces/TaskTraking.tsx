import { ITaskClient } from './TaskClient';
import { ITaskSupplier } from './TaskSupplier';
import { ITaskBarCode } from './TaskBarCode';

interface Tracking {
  id: number;
  product: string;
  date: Date;
  quantity: number;
  status: string;
  client: ITaskClient;
  supplier: ITaskSupplier;
  barcode: ITaskBarCode;
}
