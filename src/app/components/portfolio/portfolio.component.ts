import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Project {
  id: number;
  title: string;
  category: string;
  summary: string;
  description: string;
  image: string; // Main thumbnail image
  images: string[]; // Array of all project images
  technologies: string[];
  date: string;
  link?: string;
  features?: string[];
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent {
  // Modal properties
  showModal = false;
  selectedProject: Project | null = null;
  currentImageIndex = 0;

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

  // Featured projects data
  featuredProjects: Project[] = [
    {
      id: 1,
      title: 'Connectlify',
      category: 'Web Application',
      summary: 'A real-time messaging application using Next.js, Tailwind CSS, and Firebase.',
      description: 'Connectlify is a real-time messaging application built with Next.js, Tailwind CSS, and Firebase. It allows users to send and receive messages in real-time, and it also includes features like user authentication and profile management.',
      image: 'assets/projects/connectlify-images/Connectlify-sign-page.png',
      images: [
        'assets/projects/connectlify-images/Connectlify-sign-page.png',
        'assets/projects/connectlify-images/Connectlify-message-page.png',
      ],
      technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
      date: 'February 2025',
      link: 'https://example.com/ecommerce',
      features: [
        'Real-time messaging',
        'User authentication',
        'Profile management',
        'Responsive design',
        'Performance optimized animations',
        'Accessibility compliant UI components'
      ]
    },
    {
      id: 2,
      title: 'Novito',
      category: 'Mobile Development',
      summary: 'Novito is a note-taking app built with Flutter',
      description: 'Novito is a note-taking app built with Flutter. It allows users to create, edit, and delete notes. It also features a folder system to organize notes.',
      image: 'assets/projects/novito-note-app/Novito-note-page.png',
      images: [
        'assets/projects/novito-note-app/Novito-note-page.png',
        'assets/projects/novito-note-app/Novito-folder-page.png',
        'assets/projects/novito-note-app/Novito-Todo-page.png'
      ],
      technologies: ['Flutter'],
      date: 'March 2025',
      features: [
        'Note-taking',
        'Folder system',
        'Todo list',
        'Responsive design',
        'Performance optimized animations',
        'Accessibility compliant UI components'
      ]
    },
    {
      id: 3,
      title: 'Zephrotech Portfolio',
      category: 'Frontend Development',
      summary: 'A modern, responsive portfolio website built with Angular and SASS.',
      description: 'This portfolio website showcases my skills, projects, and professional experience. Built with Angular, it features a clean, responsive design with smooth animations and interactive elements. The site includes sections for project showcases, skill highlights, and contact information, all optimized for performance and accessibility.',
      image: 'assets/projects/portfolio-images/Portfolio.png',
      images: [
        'assets/projects/portfolio-images/Portfolio.png',
      ],
      technologies: ['Angular', 'TypeScript', 'SASS', 'HTML5', 'CSS3'],
      date: 'March 2025',
      features: [
        'Responsive design for all device sizes',
        'Interactive project showcases with modal details',
        'Dynamic content loading',
        'Performance optimized animations',
        'Accessibility compliant UI components'
      ]
    }
  ];

  // Other projects data
  /* 
  otherProjects: Project[] = [
    {
      id: 3,
      title: '',
      category: 'Web Application',
      summary: '',
      image: 'assets/projects/.jpg',
      technologies: ['React', 'Redux', 'Firebase', 'Material UI'],
      date: 'Coming Soon...',
      link: 'https://example.com/taskmanager',
      features: [
        'Task creation and assignment',
        'Drag-and-drop task management',
        'Progress tracking and reporting',
        'Team collaboration tools',
        'Email notifications and reminders'
      ]
    },
    {
      id: 4,
      title: '',
      category: 'Mobile Application',
      summary: '',
      image: 'assets/projects/.jpg',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Health API'],
      date: 'Coming Soon...'
    }
  ];*/

  // Modal methods
  openProjectModal(project: Project): void {
    this.selectedProject = project;
    this.showModal = true;
    this.currentImageIndex = 0;
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedProject = null;
    document.body.style.overflow = ''; // Re-enable scrolling
  }

  // Image navigation methods
  nextImage(): void {
    if (this.selectedProject) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedProject.images.length;
    }
  }

  prevImage(): void {
    if (this.selectedProject) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.selectedProject.images.length) % this.selectedProject.images.length;
    }
  }

  // Keyboard event listener for closing modal with Escape key and navigating images
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.showModal) return;
    
    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'ArrowLeft':
        this.prevImage();
        break;
    }
  }
}
