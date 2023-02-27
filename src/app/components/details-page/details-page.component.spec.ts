import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DetailsPageComponent} from './details-page.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {IPerson} from "../../interfaces/main.inteface";
import {MainService} from "../../services/main.service";
import {of} from 'rxjs';

describe('DetailsPageComponent', () => {
  let component: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;
  let mainService: MainService;
  let testData: any;
  let user: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsPageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule]
    })
      .compileComponents();
    mainService = TestBed.inject(MainService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    testData = [
      {id: 1, firstname: 'A', lastname: 'B', phoneNumber: 'C', dateOfBirth: 'D', email: 's', address: 'F'}
    ] as IPerson[];
    user =
      {firstname: 'A', lastname: 'B', phoneNumber: 'C', dateOfBirth: 'D', email: 's', address: 'F'} as IPerson;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page', function () {
    spyOn(component, 'backToHomePage').and.callThrough();
    component.backToHomePage();
    expect(component.backToHomePage).toHaveBeenCalled();
  });

  it('should edit person', function () {
    spyOn(component, 'editPerson').and.callThrough();
    component.editPerson(testData);
    expect(component.edit).toBeTruthy()
  });

  it('should getPerson', function () {
    spyOn(mainService, 'getOne').and.returnValue(of(testData))
    component.getPerson();
    expect(component.mainService.getOne).toHaveBeenCalled();
  });

  it('should delete', function () {
    const spy = spyOn(component.mainService, 'delete').and.returnValue(of(user));
    component.deletePerson();
    component.backToHomePage();
    expect(spy).toHaveBeenCalled()
  });

  it('should update', function () {
    let spy = spyOn(component.mainService, 'update').and.returnValue(of(user));
    component.updatePerson();
    expect(component.edit).toBeFalsy()
    expect(spy).toHaveBeenCalled()
  });
});
