import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookDetailedPage } from './book-detailed.page';

describe('BookDetailedPage', () => {
  let component: BookDetailedPage;
  let fixture: ComponentFixture<BookDetailedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookDetailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
