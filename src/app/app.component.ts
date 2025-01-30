import { Component, HostListener } from '@angular/core';
import { ScrollService } from './scroll.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
  
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
}
