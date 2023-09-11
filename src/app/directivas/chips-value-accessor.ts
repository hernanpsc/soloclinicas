import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[appChipsFormControl]'
})
export class ChipsFormControlDirective implements OnInit {
  @Input('appChipsFormControl')
    formControlName!: FormControlName;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const chipsElement = this.el.nativeElement;
    const formControl = this.formControlName.control;

    // Escuchar cambios en el valor del formulario y actualizar el componente p-chips
    formControl.valueChanges.subscribe((newValue) => {
      // Actualizar el valor del componente p-chips
      chipsElement.value = newValue;
    });

    // Escuchar eventos de cambio en el componente p-chips y actualizar el valor del formulario
    chipsElement.addEventListener('onAdd', (event: any) => {
      // Actualizar el valor del formulario cuando se agregue un elemento
      formControl.setValue([...formControl.value, event.value]);
    });

    chipsElement.addEventListener('onRemove', (event: any) => {
      // Actualizar el valor del formulario cuando se elimine un elemento
      const newValue = formControl.value.filter((item: any) => item !== event.value);
      formControl.setValue(newValue);
    });
  }
}
