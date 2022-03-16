import { Genders } from './utils.enums';

export default class Genere {
  public static genereTypes = [
    {
      value: Genders.Maschio,
      showValue: 'Maschio',
    },
    {
      value: Genders.Femmina,
      showValue: 'Femmina',
    },
    {
      value: Genders.Undefined,
      showValue: 'Undefined',
    },
  ];
}
