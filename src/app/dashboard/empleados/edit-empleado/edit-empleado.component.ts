import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Empleado } from '../../../interfaces/empleados';
import { EmpleadosService } from '../../../servicios/empleados.service';

@Component({
  selector: 'app-edit-empleado.component.ts',
  template: `
    <h2 class="text-center m-5">Edit an Employee</h2>
    <app-empleado-form [initialState]="employee" (formSubmitted)="editEmployee($event)"></app-empleado-form>
  `
})
export class EditEmpleadoComponent implements OnInit {
  employee: BehaviorSubject<Empleado> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmpleadosService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.employeeService.getEmployee(id !).subscribe((employee) => {
      this.employee.next(employee);
    });
  }

  editEmployee(employee: Empleado) {
    this.employeeService.updateEmployee(this.employee.value._id || '', employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/empleados']);
        },
        error: (error) => {
          alert('Failed to update employee');
          console.error(error);
        }
      })
  }
}
