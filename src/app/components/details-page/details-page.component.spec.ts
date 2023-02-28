import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DetailsPageComponent} from './details-page.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {Person} from "../../interfaces/person.inteface";
import {MainService} from "../../services/main.service";
import {of} from 'rxjs';
import {Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

describe('DetailsPageComponent', () => {
  let component: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;
  let mainService: MainService;
  let testData: any;
  let user: any;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsPageComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, MatIconModule]
    })
      .compileComponents();
    mainService = TestBed.inject(MainService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router)
    testData = [
      {id: 1, firstname: 'A', lastname: 'B', phoneNumber: 'C', dateOfBirth: 'D', email: 's', address: 'F'}
    ] as Person[];
    user =
      {firstname: 'A', lastname: 'B', phoneNumber: 'C', dateOfBirth: 'D', email: 's', address: 'F'} as Person;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be form invalid', function () {
    const personForm = {
      firstname: null,
      lastname: null,
      dateOfBirth: null,
      phoneNumber: null,
      email: null,
      address: null
    }
    expect(component.updateForm.value).toEqual(personForm)
  });

  it('phoneNumber should be valid when it has value', function () {
    component.updateForm.controls['phoneNumber'].setValue(123456781012);
    fixture.detectChanges();
    expect(component.updateForm.controls['phoneNumber'].valid).toBeTruthy();
  });

  it('should navigate to home page', function () {
    let spy = spyOn(router, 'navigate')
    component.backToHomePage();
    expect(spy).toHaveBeenCalledWith(['/']);
  });

  it('should get person', function () {
    spyOn(mainService, 'getOne').and.returnValue(of(testData))
    component.getPerson();
    expect(component.mainService.getOne).toHaveBeenCalled();
    expect(component.arr).toEqual(testData);
    expect(component.show).toBeTruthy();
  });

  it('should edit person', function () {
    component.editPerson(user);
    expect(component.updateForm.value).toEqual(user)
    expect(component.edit).toBeTruthy()
  });


  it('should delete person', function () {
    let spy = spyOn(component.mainService, 'delete').and.returnValue(of(user));
    component.deletePerson();
    expect(spy).toHaveBeenCalled();
  });

  it('should update person', function () {
    spyOn(component.mainService, 'update').and.returnValue(of(testData));
    spyOn(component.mainService, 'getOne').and.returnValue(of(testData));
    component.updatePerson();
    expect(component.edit).toBeFalsy();
    expect(component.arr).toEqual(testData);
  });
});
