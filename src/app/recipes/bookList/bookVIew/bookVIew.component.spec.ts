/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookVIewComponent } from './bookVIew.component';

describe('BookVIewComponent', () => {
  let component: BookVIewComponent;
  let fixture: ComponentFixture<BookVIewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookVIewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookVIewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
