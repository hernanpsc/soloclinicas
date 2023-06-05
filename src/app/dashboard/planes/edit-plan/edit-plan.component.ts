import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Planes } from '../../../interfaces/planes';
import { PlanesService } from '../../../servicios/planes.service';

@Component({
  selector: 'app-edit-plan.component.ts',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']

})
export class EditPlanComponent implements OnInit {
  plan: BehaviorSubject<Planes> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planesService: PlanesService,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No hay id provisto');
    }

    this.planesService.getPlan(id !).subscribe((plan) => {
      this.plan.next(plan);
    });
  }

  editPlan(plan: Planes) {
    this.planesService.updatePlan(this.plan.value._id || '', plan)
      .subscribe({
        next: () => {
          this.router.navigate(['/planes']);
        },
        error: (error) => {
          alert('Falló actualizar plan');
          console.error(error);
        }
      })
  }
}


