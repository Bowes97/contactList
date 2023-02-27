import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import { IPerson } from 'src/app/interfaces/main.inteface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit, OnDestroy {

  public updateForm!: FormGroup;
  public arr!: IPerson;
  public edit = false;
  public show = false;
  public number = 100;
  public progresBar = 50;

  constructor(
    private router: Router,
    readonly location: Location,
    readonly mainService: MainService,
    private fb: FormBuilder,
    private activedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getPerson();
    this.initUpdatePerosnForm();
  }

  initUpdatePerosnForm(): void {
    this.updateForm = this.fb.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.pattern(new RegExp("[0-9 ]{12}"))]],
      email: [null, [Validators.required, Validators.email]],
      address: [null, Validators.required],
    })
  }

  getPerson(): void {
    this.mainService.getOne(this.activedRoute.snapshot.params['id']).subscribe((data) => {
      this.arr = data;
      this.show = true;
      this.progresBar = 50;
    })
  }

  deletePerson(): void {
    this.mainService.delete(this.activedRoute.snapshot.params['id']).subscribe(() => {
      this.backToHomePage();
    })
  }

  editPerson(person: IPerson): void {
    this.updateForm.patchValue({
      firstname: person.firstname,
      lastname: person.lastname,
      dateOfBirth: person.dateOfBirth,
      phoneNumber: person.phoneNumber,
      email: person.email,
      address: person.address,
    })
    this.edit = true;
    this.progresBar = 100;
  }

  updatePerson(): void {
    this.mainService.update(this.updateForm.value, this.activedRoute.snapshot.params['id']).subscribe(() => {
      this.edit = false;
      this.getPerson();
    })
  }

  backToHomePage(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.show = false;
  }
}
