import {Pipe, PipeTransform} from '@angular/core';
import {IIngresoEgreso, TYPE_INGRESO_EGRESO} from '../models/ingreso-egreso.model';

@Pipe({
  name: 'orderAdmin'
})
export class OrderAdminPipe implements PipeTransform {

  transform(items: IIngresoEgreso[]): IIngresoEgreso[] {
    return items.sort((a, b) => a.type === TYPE_INGRESO_EGRESO.INGRESO ? -1 : 1);
  }

}
