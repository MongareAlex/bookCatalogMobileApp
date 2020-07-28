import { Component, OnInit, Input } from '@angular/core';
import { Author } from 'src/app/_Data/Author';

@Component({
  selector: 'app-authorView',
  templateUrl: './authorView.component.html',
  styleUrls: ['./authorView.component.css']
})
export class AuthorViewComponent implements OnInit {
  @Input() author: Author;
  imgUrl = 'https://ipsumimage.appspot.com/200';
  constructor() { }

  ngOnInit() {
  }

}
