import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/interfaces/person.inteface';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public person!: string;
  public arrPerson!: Array<Person>
  public addPersonForm!: FormGroup;

  constructor(readonly mainService: MainService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getPersons();
    this.initAddPerosnForm();
  }

  initAddPerosnForm(): void {
    this.addPersonForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.pattern(new RegExp("[0-9]{12}"))]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, Validators.required],
    })
  }

  getPersons(): void {
    this.mainService.getInfo().subscribe((data) => {
      this.arrPerson = data;
    })
  }

  addPerson(): void {
    this.mainService.create(this.addPersonForm.value).subscribe(() => {
      this.initAddPerosnForm();
      this.getPersons();
    })
  }
}
