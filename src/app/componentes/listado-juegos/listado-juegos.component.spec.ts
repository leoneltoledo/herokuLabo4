import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoJuegosComponent } from './listado-juegos.component';

describe('ListadoJuegosComponent', () => {
  let component: ListadoJuegosComponent;
  let fixture: ComponentFixture<ListadoJuegosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoJuegosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoJuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
