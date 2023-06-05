
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../../../interfaces/posts';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: [ './post-form.component.css',  ]
})
export class PostFormComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Post> = new BehaviorSubject({});
    @Output()
    
  formValuesChanged = new EventEmitter<Post>();

  @Output()
  formSubmitted = new EventEmitter<Post>();

  postForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }
  get name() { return this.postForm.get('name'); }
  
  
  

  

  ngOnInit() {
    this.initialState.subscribe(post => {
      this.postForm = this.fb.group({

        name: [ post.title ],
    
      });
    });

    this.postForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }
 
  submitForm() {
    console.log(this.postForm.value)
    this.formSubmitted.emit(this.postForm.value);
  }
}
