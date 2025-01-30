import { Component, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ScrollService} from '../../scroll.service'


@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
 // New property to track header visibility
    isHeaderHidden = false;
 
    showScrollToTop = false;
    lastScrollTop = 0;
  
    constructor(private scrollService: ScrollService) {}
  
    @HostListener('window:scroll', [])
    onScroll(): void {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
      // Hide header when scrolling down and show when scrolling up
      this.isHeaderHidden = scrollTop > this.lastScrollTop && scrollTop > 100;
  
      // Show "Scroll to Top" button after scrolling down 200px
      this.showScrollToTop = scrollTop > 200;
  
      // Update last scroll position
      this.lastScrollTop = scrollTop;
    }
  
    scrollToTop(): void {
      this.scrollService.scrollToTop();
    }


  setupHamburgerMenu(): void {
    const hamburger = document.querySelector('.hamburger') as HTMLElement;
    const navbar = document.querySelector('.navbar') as HTMLElement;

    if (!hamburger || !navbar) return; // Ensure elements exist before proceeding

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

  skills = [
    { image: 'assets/skills-images/HTML5.png' },
    { image: 'assets/skills-images/CSS3.png' },
    { image: 'assets/skills-images/JS.png' },
    { image: 'assets/skills-images/NODE.png' },
    { image: 'assets/skills-images/ANGULAR.png' },
    { image: 'assets/skills-images/GIT.png' },
    { image: 'assets/skills-images/DOCKER.png' },
    { image: 'assets/skills-images/SASS.png' },
    { image: 'assets/skills-images/MongoDB.png' },
    { image: 'assets/skills-images/FIREBASE.png' },
  ];

  whatIDo =   "I am from Pampanga, Philippines. I am currently studying at Holy Angel University taking up Bachelor's in Information Technology specialized in Web Development and will graduate in the year 2027. I am a Web Developer planning to learn Mobile Development soon, and currently enhancing my skills."
  
  
}