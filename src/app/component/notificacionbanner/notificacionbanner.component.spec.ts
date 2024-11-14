import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionbannerComponent } from './notificacionbanner.component';

describe('NotificacionbannerComponent', () => {
  let component: NotificacionbannerComponent;
  let fixture: ComponentFixture<NotificacionbannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificacionbannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificacionbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
