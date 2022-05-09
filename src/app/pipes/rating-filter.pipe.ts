import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingFilter'
})
export class RatingFilterPipe implements PipeTransform {

  transform(items: any[], ratingObj: any): any[] {

    // No items? return nothing
    if (!items) {
      return [];
    }

    // No rating objects passed? return all items
    if (ratingObj === undefined) {
      return items;
    } else if (ratingObj.length === 0) {
      return items;
    }

    // Unravel the ratings and populate them into an array
    let ratings: any = [];
    ratingObj.forEach((item: any) => {
      ratings.push(item.rating);
    });

    return items.filter(item => {

      // Iterate through all the ratings
      // If any are found better than the specified rating, return the item
      let found = false;
      ratings.forEach((rating: any) => {
        if (item.rating >= rating) {
          found = true;
        }
      })

      return found;
    });
  }

}
