import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  categories: any = [{
    category: 'Restaurants',
    checked: false
  }, {
    category: 'Hotels',
    checked: false
  }, {
    category: 'Resorts & spa',
    checked: false
  }, {
    category: 'Bars & Pubs',
    checked: false
  }, {
    category: 'Clubs',
    checked: false
  }, {
    category: 'Shopping Malls',
    checked: false
  }, {
    category: 'Education',
    checked: false
  }];

  ratings: any = [{
    rating: 5,
    checked: false
  },{
    rating: 4,
    checked: false
  },{
    rating: 3,
    checked: false
  },{
    rating: 2,
    checked: false
  },{
    rating: 1,
    checked: false
  }]

  filteredProducts: any;
  products: any;
  categoryFilters: any;
  ratingFilters: any;

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  // triggers when a filter checkbox is toggled
  // used to aid in filtering search results
  filterChange(): void {
    this.categoryFilters = this.categories.filter((item: any) => {
      return item.checked;
    });

    this.ratingFilters = this.ratings.filter((item: any) => {
      return item.checked;
    });
  }

  getProducts(): void {
    this.productsService.getProducts()
      .subscribe((products: Product[]) => {
        this.products = products;

        // add openAt and closeAt property for UI
        // assumes products have open_at and close_at property
        this.products.forEach((product: Product) => {
          product.openAt = this.convertTime(product.open_at);
          product.closeAt = this.convertTime(product.close_at);
          product.createdAt = new Date(product.created_at);
        });
      });
  }

  // returns time converted from 24:00 format to 12am/pm
  // assumes time to convert is formatted as h:mm and has 00 minutes
  convertTime(time: string): string {
    let parsedTime: number = parseInt(time);
    let convertedTime: string;

    if (parsedTime < 12 || parsedTime >= 24) {
      convertedTime = parsedTime + 'am';
    } else {
      if (parsedTime > 12) {
        parsedTime -= 12;
      }
      convertedTime = parsedTime + 'pm';
    }

    return convertedTime;
  }

  // sorts product list by specified method
  sortBy(method: string): void {
    switch (method) {
      case 'newest':
        this.products.sort(this.compareCreatedAtDesc);
        break;
      case 'oldest':
        this.products.sort(this.compareCreatedAtAsc);
        break;
    }
  }

  compareCreatedAtAsc(a: Product, b: Product) {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  }

  compareCreatedAtDesc(a: Product, b: Product) {
    if (b.createdAt < a.createdAt) {
      return -1;
    }
    if (b.createdAt > a.createdAt) {
      return 1;
    }
    return 0;
  }
}
