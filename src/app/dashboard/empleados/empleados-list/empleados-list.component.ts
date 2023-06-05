import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../../../interfaces/empleados';
import { EmpleadosService } from '../../../servicios/empleados.service';

@Component({
  selector: 'app-empleados-list',
  template: `
    <h2 class="text-center m-5">Lista de Empleados</h2>

    <table class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Level</th>
                <th>Action</th>
            </tr>
        </thead>

        <tbody>
            <tr *ngFor="let employee of employees$ | async">
                <td>{{employee.name}}</td>
                <td>{{employee.position}}</td>
                <td>{{employee.level}}</td>
                <td>
                    <button class="btn btn-primary me-1" [routerLink]="['editar/', employee._id]">Edit</button>
                    <button class="btn btn-danger" (click)="deleteEmployee(employee._id || '')">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>

    <button class="btn btn-primary mt-3" [routerLink]="['nuevo']">Add a New Employee</button>
  
    <br>
<br>
<br>
<button class="btn btn-primary mt-3" [routerLink]="['']">Volver</button>
  `
})
export class EmpleadosListComponent implements OnInit {
  employees$: Observable<Empleado[]> = new Observable();

  constructor(private employeesService: EmpleadosService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  deleteEmployee(id: string): void {
    this.employeesService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees()
    });
  }

  private fetchEmployees(): void {
    this.employees$ = this.employeesService.getEmployees();
  }
}
