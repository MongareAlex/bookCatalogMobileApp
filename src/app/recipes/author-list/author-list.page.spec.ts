import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthorListPage } from './author-list.page';

describe('AuthorListPage', () => {
  let component: AuthorListPage;
  let fixture: ComponentFixture<AuthorListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
