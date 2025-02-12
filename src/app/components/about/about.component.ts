import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

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


  education =[
    { title: 'High School Graduation', description: 'Graduated from Holy Angel University, 2022.' },
    { title: 'Bachelor\'s Degree', description: 'Started Bachelor\'s in Information Technology at Holy Angel University, 2022.' },
    { title: 'Internship', description: "Haven't applied yet" },
    { title: 'Graduation', description: 'Expected graduation from Holy Angel University, 2027.' }
  ]

  activeIndex = 0;

    @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const eventElements = document.querySelectorAll('.timeline-event');
    const line = document.querySelector('.timeline-line') as HTMLElement;

    eventElements.forEach((event, index) => {
      const rect = event.getBoundingClientRect();
      const top = rect.top + window.scrollY;

      // Check if the event is in view
      if (scrollPosition >= top + rect.height / 2) {
        this.activeIndex = index;
        // Highlight the line by changing its background color
        if (line) {
          line.style.backgroundColor = this.getLineColor(index); // Use a method to define line color
        }
      }
    });
  }

  // Method to return the line color based on the active index
  getLineColor(index: number): string {
    const colorList = [
      '#007bff', 
      '#28a745', 
      '#ffc107', 
      '#dc3545'  
    ];

    // Return the appropriate color for the active event, or a default inactive color
    return colorList[index] || '#ccc';  
  }


  profile = {
    name: 'Eljan',
    title: 'Student',
    image: 'assets/about-images/my-picture.jpeg', 
    description:
      "I'm a student at Holy Angel University, pursuing a Bachelor's degree in Information Technology. ",
    details: [
      "I spend my time gaming, enhancing my coding skills, and learning new technologies. I'm an incoming 4th year student, and I'm looking forward to gain more experience in the field of IT.",
      "Out of the campus, you’ll see me in my house or somewhere in my village playing games, basketball, or trying new things in life"
    ]
  };


}