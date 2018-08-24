import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaListaComponent } from './entrega-lista.component';

describe('EntregaListaComponent', () => {
  let component: EntregaListaComponent;
  let fixture: ComponentFixture<EntregaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
