import { Pipe, PipeTransform } from "@angular/core";
import { Genders } from "../commons/utils.enums";

@Pipe({
  name: "formatGender",
  pure: false,
})
export class FormatGenderPipe implements PipeTransform {
  constructor() {}

  transform(item: any): any {
    switch(item){
        case  Genders.Femmina:
         item = "Femmina"
        break;
        case Genders.Maschio:
         item = "Maschio"
         break;
         case Genders.Undefined: 
         item = "Undefined"
         break;
    }
    return item;
  }
}
