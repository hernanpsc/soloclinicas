import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Planes } from '../../../interfaces/planes';
import { PlanesService } from '../../../servicios/planes.service';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: [ './add-plan.component.css']
})
export class AddPlanComponent {
  constructor(
    private router: Router,
    private planesService: PlanesService
  ) { }

  addPlan(plan: Planes) {
    this.planesService.createPlan(plan)
      .subscribe({
        next: () => {
          this.router.navigate(['/planes']);
        },
        error: (error) => {
          alert("Falló crear plan");
          console.error(error);
        }
      });
  }
}
