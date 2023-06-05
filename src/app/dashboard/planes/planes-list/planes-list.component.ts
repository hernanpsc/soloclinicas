import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Planes } from '../../../interfaces/planes';
import { PlanesService } from '../../../servicios/planes.service';
import {ServcioRetornoPrecioService} from '../../../servicios/servcio-retorno-precio.service';
import {ServicioDeCompararService} from '../../../servicios/servicio-de-comparar.service';
import { ModalService } from '../../../_modal';
import { HttpClient } from '@angular/common/http';
declare var actualizarPrecios:any;

@Component({
  selector: 'app-planes-list',
  templateUrl: './planes-list.component.html',
  styleUrls: [ './planes-list.component.css']  
})
export class PlanesListComponent implements OnInit {
  planes$: Observable<Planes[]> = new Observable();
  arrayActualizado: any;
  constructor(
    private planesService: PlanesService,
    private retornarService: ServcioRetornoPrecioService,
    private servicioComparar: ServicioDeCompararService,
    private modalService : ModalService,
    private http: HttpClient
    ) { }
    ngOnInit(): void {


      
      this.fetchPlanes();
      this.retornarService.disparadorDePrecio.subscribe(data=>{
        console.log('Recibiendo data en planes-list...',data);
        this.fetchPlanes();



  this.planes$.subscribe(planes => {
    console.log('array1:', planes);
    console.log('datas:', data);
    const resultado = this.planesService.actualizarPrecios(planes, data);
    console.log('resultado:', resultado);
    this.arrayActualizado = resultado;
});

        
  });
    }

    openModa(id: string) {
      this.modalService.open('custom-modal-3');
  
    }
  
    closeModa(id: string) {
      this.modalService.close('custom-modal-3');
  
    }


  deletePlan(id: string): void {
    this.planesService.deletePlan(id).subscribe({
      next: () => this.fetchPlanes()
    });
  }

  private fetchPlanes(): void {
    this.planes$ = this.planesService.getPlanes();

  }

  
}

