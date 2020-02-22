import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DashBoardPage } from './dash-board.page';

describe('DashBoardPage', () => {
  let component: DashBoardPage;
  let fixture: ComponentFixture<DashBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashBoardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DashBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
