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
        return seriesList.filter(series=>
            series['name'].toLowerCase().includes(searchTerm.toLowerCase()) === true
        );
    }

}