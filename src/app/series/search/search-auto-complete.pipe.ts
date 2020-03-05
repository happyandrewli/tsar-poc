import { Pipe, PipeTransform } from "@angular/core";
import { Series } from '../state/series.model';

@Pipe({
    name: 'searchAuto'
})
export class SearchAutoCompletePipe implements PipeTransform {
    transform(seriesList: Series[], searchTerm: string, labelKey?: string): any {
        if(!seriesList || !searchTerm) {
            return seriesList;
        }
        console.log(typeof seriesList);
        return seriesList.filter((series, index) => 
            seriesList.findIndex(element => element.name == series.name) === index && series['name'].toLowerCase().includes(searchTerm.toLowerCase()) === true
        );
    }

}