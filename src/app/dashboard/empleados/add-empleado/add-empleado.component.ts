import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from '../../../interfaces/empleados';
import { EmpleadosService } from '../../../servicios/empleados.service';

@Component({
  selector: 'app-add-empleado',
  template: `
    <h2 class="text-center m-5">Add a New Employee</h2>
    <app-empleado-form (formSubmitted)="addEmployee($event)"></app-empleado-form>
  `
})
export class AddEmpleadoComponent {
  constructor(
    private router: Router,
    private employeeService: EmpleadosService
  ) { }

  addEmployee(employee: Empleado) {
    this.employeeService.createEmployee(employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/empleados']);
        },
        error: (error) => {
          alert("Failed to create employee");
          console.error(error);
        }
      });
  }
}
