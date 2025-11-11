import { Component, HostListener } from '@angular/core';
import { ScrollService } from './scroll.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { SkillsComponent } from './components/skills/skills.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule, AboutComponent, PortfolioComponent, ContactComponent, SkillsComponent],
  standalone: true,
  providers: [ScrollService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio';
  
  ngOnInit(): void {
    this.setupHamburgerMenu();
  }

  setupHamburgerMenu(): void {
    const hamburger = document.querySelector('.hamburger') as HTMLElement;
    const navbar = document.querySelector('.navbar') as HTMLElement;
    // This will ensure elements exist before proceeding
    if (!hamburger || !navbar) return; 

    // Toggle the navbar on hamburger menu click
    hamburger.addEventListener('click', () => {
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
     isHeaderScrolled = false;
   showScrollToTop = false;
   lastScrollTop = 0;
 
   constructor(private scrollService: ScrollService) {}
 
   @HostListener('window:scroll', [])
   onScroll(): void {
     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
 
     // Hide header when scrolling down and show when scrolling up
     this.isHeaderHidden = scrollTop > this.lastScrollTop && scrollTop > 100;

    this.isHeaderScrolled = scrollTop > 100;
 
     // Show "Scroll to Top" button after scrolling down 200px
     this.showScrollToTop = scrollTop > 200;
 
     // Update last scroll position
     this.lastScrollTop = scrollTop;
   }
 
   scrollTo(section: string): void {
    this.scrollService.scrollToElement(section);
  }

  scrollToTop(): void {
     this.scrollService.scrollToTop();
  }

  scrollToSection(sectionId: string): void {
    this.scrollService.scrollToElement(sectionId);
  }
}
