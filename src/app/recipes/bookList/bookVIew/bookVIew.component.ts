import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/_Data/Book';

@Component({
  selector: 'app-bookVIew',
  templateUrl: './bookVIew.component.html',
  styleUrls: ['./bookVIew.component.css']
})
export class BookVIewComponent implements OnInit {
@Input() book: Book;
imgUrl = 'https://ipsumimage.appspot.com/200';
  constructor() { }

  ngOnInit() {

  }

}
