import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailService } from "./../email.service";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatSelectModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  constructor(private emailService: EmailService) { }
  onSubmit(form: NgForm) {
    this.emailService.sendEmail(form.value.name,form.value.email,form.value.content);
    form.reset();
     // console.log(form.value.email);
      
  }
  title:string="CONTACT";


}