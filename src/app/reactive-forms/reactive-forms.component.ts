import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  // name = new FormControl('');
  // email = new FormControl('');
  // favoriteColorControl = new FormControl('');

  constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
      'username': new FormControl(null, [Validators.required , this.forbiddenNames.bind(this)]), 
      'email' : new FormControl(null,[Validators.required , Validators.email], this.forbiddenEmails),
      }),
      'player':new FormArray([])
  });

  this.signupForm.statusChanges.subscribe(
    (status) => console.log(status)
  );
  this.signupForm.setValue({
    'userData': {
      'username': 'Max',
      'email': 'max@test.com'
    },
    'player': []
  });
  this.signupForm.patchValue({
    'userData': {
      'username': 'Anna',
    }
  });

  }
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddPlayer() {
    const control =new FormControl(null,Validators.required);
    (<FormArray> this.signupForm.get('player')).push(control);
  }
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
