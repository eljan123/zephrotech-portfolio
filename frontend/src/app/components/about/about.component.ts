import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  // Modal properties
  showModal = false;
  selectedCertificate: Certificate | null = null;

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

  certificates: Certificate[] = [
    {
      title: 'Responsive Web Design',
      issuer: 'FreeCodeCamp',
      date: 'January 18, 2024',
      image: 'assets/certificates/Responsive-Web-Design.png'
    },
    {
      title: 'Legacy JavaScript Algorithms and Data Structures',
      issuer: 'FreeCodeCamp',
      date: 'March 4, 2024',
      image: 'assets/certificates/Legacy-JavaScript-Algorithms-and-Data-Structure.png'
    },
    {
      title: 'Google Analytics Certification',
      issuer: 'Google',
      date: 'March 2, 2025',
      image: 'assets/certificates/Google-Analytics-Cert.png'
    },
    {
      title: 'Dive Deeper into GA4 Data and Reports',
      issuer: 'Google',
      date: 'February 22, 2025',
      image: 'assets/certificates/GA4_Data-and-reports.png'
    },
    {
      title: 'Use GA4 with other Tools and Data Sources',
      issuer: 'Google',
      date: 'March 2, 2025',
      image: 'assets/certificates/GA4-with-other_Tools-and-Data-Sources.png'
    },
    {
      title: 'Manage GA4 Data and Learn to Read Reports',
      issuer: 'Google',
      date: 'March 2, 2024',
      image: 'assets/certificates/GA4_Data-and-Learn-to-Read-Reports.png'
    },
    {
      title: 'HubSpot SEO II Certified',
      issuer: 'HubSpot',
      date: 'February 1, 2025',
      image: 'assets/certificates/HubSpot-SEO-II.png'
    },
    {
      title: 'CCNAv7: Introduction to Networks',
      issuer: 'Cisco',
      date: 'June 23 2024',
      image: 'assets/certificates/CCNAv7-Introduction-to-Networks.png'
    }
  ];

  activeIndex = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const eventElements = document.querySelectorAll('.timeline-event');
    
    eventElements.forEach((event, index) => {
      const rect = event.getBoundingClientRect();
      const top = rect.top + window.scrollY;

      // Check if the event is in view
      if (scrollPosition >= top + rect.height / 2) {
        this.activeIndex = index;
      }
    });
  }

  // Modal methods
  openCertificateModal(index: number): void {
    this.selectedCertificate = this.certificates[index];
    this.showModal = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCertificate = null;
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  // Keyboard event listener for closing modal with Escape key
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.showModal) {
      this.closeModal();
    }
  }

  profile = {
    name: 'Eljan',
    title: 'Student',
    image: 'assets/about-images/my-picture.jpeg', 
    description:
      "I'm a student at Holy Angel University, pursuing a Bachelor's degree in Information Technology. ",
    details: [
      "I spend my time gaming, enhancing my coding skills, and learning new technologies. I'm an incoming 4th year student, and I'm looking forward to gain more experience in the field of IT.",
      "Out of the campus, you'll see me in my house or somewhere in my village playing games, basketball, or trying new things in life"
    ]
  };
}