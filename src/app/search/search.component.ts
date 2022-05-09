import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public categories: any;         // for categories dropdown
  public location: string = '';   // user-inputted, for location search

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  // fetch categories from service (mocked as static json)
  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

}
