import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/_Data/Category';

@Component({
  selector: 'app-categoryView',
  templateUrl: './categoryView.component.html',
  styleUrls: ['./categoryView.component.css']
})
export class CategoryViewComponent implements OnInit {
@Input() category: Category;
imgUrl = 'https://ipsumimage.appspot.com/200';
  constructor() { }

  ngOnInit() {
  }

}
