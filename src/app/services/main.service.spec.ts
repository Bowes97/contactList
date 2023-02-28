import {TestBed} from '@angular/core/testing';
import {MainService} from './main.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Person} from "../interfaces/person";

describe('MainService', () => {
  let service: MainService;
  let testData: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MainService);
    testData = [
      {id: 1, firstname: 'A', lastname: 'B', phoneNumber: 'C', dateOfBirth: 'D', email: 's', address: 'F'}
    ] as Person[];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  })

  it('should create a new person', () => {
    spyOn(service, 'create').and.callThrough();
    service.create(testData);
    expect(service.create).toHaveBeenCalled();
  })

  it('should delete person', () => {
    spyOn(service, 'delete').and.callThrough();
    service.delete(1);
    expect(service.delete).toHaveBeenCalled();
  })

  it('should update info about person', () => {
    spyOn(service, 'update').and.callThrough();
    service.update(testData, 1);
    expect(service.update).toHaveBeenCalled();
  })
});
