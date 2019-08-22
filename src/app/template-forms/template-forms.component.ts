import { Component,ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.scss']
})
export class TemplateFormsComponent {
  @ViewChild('f', {static : false}) signupForm: NgForm;
  // signupForm here is to store with the helpp of the ViewChild 
  Option = '1';
  answer = '';
  genders = ['male' , 'female'];
  user = {
    email : '',
    questionanswer : '',
    Option : '',
    gender : ''
  };

  submitted = false;

  SuggestUsername(){
    const suggestedName='SuperUser';
    this.signupForm.form.patchValue({
      userData: {
        email: suggestedName
      }
    });
   }
  onAddItem() {
    this.submitted = true;
    this.user.email = this.signupForm.value.userData.email;
    this.user.questionanswer = this.signupForm.value.userData.questionanswer;
    this.user.Option = this.signupForm.value.userData.Option;
    this.user.gender = this.signupForm.value.userData.gender;

    this.signupForm.reset();
    console.log(this.signupForm);
  }
}
