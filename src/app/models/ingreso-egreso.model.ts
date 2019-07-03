export enum TYPE_INGRESO_EGRESO {
  INGRESO = 'Ingreso',
  EGRESO = 'Egreso'

}

export interface IIngresoEgreso {
  description: string;
  amount: number;
  type: TYPE_INGRESO_EGRESO;
  uid: any;
}

export class IngresoEgreso implements IIngresoEgreso {
  description: string;
  amount: number;
  type: TYPE_INGRESO_EGRESO;
  uid: any;

  constructor(obj: any) {
    this.description = obj.description || null;
    this.amount = obj.amount || null;
    this.type = obj.type || null;
    if (obj && obj.uid) {
      this.uid = obj.uid;
    }
  }
}
