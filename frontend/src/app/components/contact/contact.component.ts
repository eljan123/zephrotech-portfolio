import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import emailjs from 'emailjs-com';

/*
  MongoDB Atlas Project-portfolio username and password:
  username: eljan 
  password: Collectionpassword12
 */

@Component({
  selector: 'app-contact',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  setupHamburgerMenu(): void {
    const hamburger = document.querySelector('.hamburger') as HTMLElement;
    const navbar = document.querySelector('.navbar') as HTMLElement;
    // This will ensure elements exist before proceeding
    if (!hamburger || !navbar) return; 

    // Remove any existing event listeners to prevent duplication
    hamburger.replaceWith(hamburger.cloneNode(true));
    const newHamburger = document.querySelector('.hamburger') as HTMLElement;

    // Toggle the navbar on hamburger menu click
    newHamburger.addEventListener('click', () => {
        navbar.classList.toggle('show');
    });

    // Add click event listener to hide navbar on link click
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            navbar.classList.remove('show');
        });
    });
  }

  // THIS BLOCK OF CODE USING NODE.JS SERVER TO SEND EMAIL
  // I TRIED USING MONGODB ATLAS TO SEND EMAIL BUT IT DIDN'T WORK
  // BECAUSE IT NEEDS A SERVER TO KEEP ON TO SEND EMAIL
  /*  
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:3000/api/contact', this.formData)
      .subscribe(
        (response: any) => {
          console.log('Message sent successfully:', response);
          alert(response.message || 'Message sent successfully!');
        },
        (error) => {
          console.error('Error sending message:', error);
          alert(error.error?.message || 'Error sending message. Please try again.');
        }
      );
  }*/
  
  // THIS BLOCK OF CODE USING EMAILJS TO SEND EMAIL WITHOUT SERVER OR DATABASE

   // Send email using EmailJS
    /**
     * Service ID: service_pvxdj9r
     * Template ID: template_11ocpob
     * Public Key: Jyx3C1TNBygFZ52UW
     */
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log(this.formData); // Check the form data
    emailjs.sendForm('service_pvxdj9r', 'template_11ocpob', '#contactForm', 'Jyx3C1TNBygFZ52UW')
      .then((response) => {
        console.log('Message sent successfully:', response);
        alert('Message sent successfully!');
      }, (error) => {
        console.error('Error sending message:', error);
        alert('Error sending message. Please try again.');
      });
  }
  
}
