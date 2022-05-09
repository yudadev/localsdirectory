import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'categoryFilter'
})

export class CategoryFilterPipe implements PipeTransform {
    transform(items: any[], searchObj: any): any[] {

        // No items? return nothing
        if (!items) {
            return [];
        }

        // No search objects passed? return all items
        if (searchObj === undefined) {
            return items;
        } else if (searchObj.length === 0) {
            return items;
        }

        // Unravel the search terms and populate them into an array
        let searchTerms: any = [];
        searchObj.forEach((item: any) => {
            searchTerms.push(item.category);
        });

        console.log(searchTerms);

        return items.filter(item => {
            return item.categories.some((str: any) => {

                // Iterate through all the search terms
                // If any are found, return the item
                let found = false;
                searchTerms.forEach((item: any) => {
                    if (str.includes(item)) {
                        found = true;
                    }
                })
                return found;
            });
        });
    }
}