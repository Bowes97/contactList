import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MainPageComponent} from './main-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MainService} from "../../services/main.service";
import {of} from 'rxjs';
import {SearchPipe} from "../../pipes/search/search.pipe";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let testData: any;
  let emptyData: any;
  let mainService: MainService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageComponent, SearchPipe],
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [MainService]
    })
      .compileComponents();
    mainService = TestBed.inject(MainService);
  });

  beforeEach(() => {
    testData =
      {
        id: 1,
        firstname: 'A',
        lastname: 'B',
        phoneNumber: 12321,
        dateOfBirth: 'D',
        email: 's',
        address: 'F'
      };
    emptyData = {
      firstname: null,
      lastname: null,
      phoneNumber: null,
      dateOfBirth: null,
      email: null,
      address: null
    }
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    const PersonFormValues = {
      firstname: null,
      lastname: null,
      dateOfBirth: null,
      phoneNumber: null,
      email: null,
      address: null
    }
    expect(component.addPersonForm.value).toEqual(PersonFormValues);
  })

  it('phoneNumber field should be valid when it has value', function () {
    component.addPersonForm.controls['phoneNumber'].setValue(123456781012);
    fixture.detectChanges();
    expect(component.addPersonForm.controls['phoneNumber'].valid).toBeTruthy();
  });


  it('form should be valid', () => {
    const PersonFormValues = {
      firstname: "Grisha",
      lastname: "Tygach",
      phoneNumber: "0968031301",
      dateOfBirth: "18.11.2000",
      email: "grishah@gmail.com",
      address: "Zamarstunivska"
    }
    component.addPersonForm.get("firstname")?.setValue('Grisha')
    component.addPersonForm.get("lastname")?.setValue('Tygach');
    component.addPersonForm.get("phoneNumber")?.setValue('0968031301');
    component.addPersonForm.get("dateOfBirth")?.setValue('18.11.2000');
    component.addPersonForm.get("email")?.setValue('grishah@gmail.com');
    component.addPersonForm.get("address")?.setValue('Zamarstunivska');
    expect(component.addPersonForm.value).toEqual(PersonFormValues);
  })

  it('should get all people', function () {
    const response = [] as any;
    spyOn(mainService, 'getInfo').and.returnValue(of(response))
    component.getPersons();
    expect(component.arrPerson).toEqual(response);
    expect(component.addPersonForm.value).toEqual(emptyData)
  });

  it('should create person', function () {
    spyOn(component.mainService, 'create').and.returnValue(of(testData));
    let spy = spyOn(mainService, 'getInfo').and.returnValue(of(testData));
    component.addPerson();
    expect(component.arrPerson).toEqual(testData)
    expect(component.mainService.create).toHaveBeenCalled();
  });

});
