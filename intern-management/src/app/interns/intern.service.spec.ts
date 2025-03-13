import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InternService } from './intern.service';
import { Intern } from './intern.model';

describe('InternService', () => {
  let service: InternService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InternService]
    });
    service = TestBed.inject(InternService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all interns', () => {
    const dummyInterns: Intern[] = [
      { id: 1, name: 'John Doe', age: 25, dateOfBirth: new Date('2000-01-01') },
      { id: 2, name: 'Jane Doe', age: 22, dateOfBirth: new Date('2003-01-01') }
    ];

    service.getInterns().subscribe(interns => {
      expect(interns.length).toBe(2);
      expect(interns).toEqual(dummyInterns);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyInterns);
  });

  it('should retrieve a single intern by id', () => {
    const dummyIntern: Intern = { id: 1, name: 'John Doe', age: 25, dateOfBirth: new Date('2000-01-01') };

    service.getIntern(1).subscribe(intern => {
      expect(intern).toEqual(dummyIntern);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/get/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyIntern);
  });

  it('should add a new intern', () => {
    const newIntern: Intern = { id: 3, name: 'Sam Smith', age: 23, dateOfBirth: new Date('2002-01-01') };

    service.addIntern(newIntern).subscribe(intern => {
      expect(intern).toEqual(newIntern);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/add`);
    expect(req.request.method).toBe('POST');
    req.flush(newIntern);
  });

  it('should update an existing intern', () => {
    const updatedIntern: Intern = { id: 1, name: 'John Doe', age: 26, dateOfBirth: new Date('2000-01-01') };

    service.updateIntern(1, updatedIntern).subscribe(intern => {
      expect(intern).toEqual(updatedIntern);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/update/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedIntern);
  });

  it('should delete an intern', () => {
    service.deleteIntern(1).subscribe(response => {
      expect(response).toEqual(Object.create(null));
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(Object.create(null));
  });
});
