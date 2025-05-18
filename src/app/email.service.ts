import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  // private serviceID = 'service_gwwkw18';   // Replace with your EmailJS Service ID
  // private templateID = 'template_8qm3ahk'; // Replace with your EmailJS Template ID
  // private userID = 'LOGA';         // Replace with your EmailJS User ID

  constructor() {
    emailjs.init("I3rqa3cU8jjLeYqHf"); // Initialize EmailJS with your User ID
  }

 async sendEmail(name:string,email:string,desc:string): Promise<any> {
    return emailjs.send("service_gwwkw18","template_8qm3ahk",{
      to_name: "LOGA KRISHNA",
      from_name: name,
      message: desc,
      form_email: email,
      });
  }
}
