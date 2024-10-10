import { Pipe, PipeTransform } from "@angular/core";
import { ITodo } from "../../core/models/todo.model";


@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterByStatusPipe implements PipeTransform {
    transform(data: ITodo[], status: string) {
        if (!status) return data;
        return data.filter(item => item.status === status)
    }
}