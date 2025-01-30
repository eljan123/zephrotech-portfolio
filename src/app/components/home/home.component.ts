import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  // Corrected to styleUrls
})

export class HomeComponent implements AfterViewInit {
  words = ["Web Developer", "Gamer", "Frontend Developer"];
  wordIndex = 0;
  charIndex = 0;
  isDeleting = false;
  typingSpeed = 100;
  deletingSpeed = 50;
  delayBetweenWords = 1500;

  ngAfterViewInit():void {
    // This ensures that the typewriter effect starts after the view is initialized
    this.typeEffect();
    this.setupHamburgerMenu();
  }

  typeEffect() {
    const typewriterElement = document.querySelector('.typewriter') as HTMLElement;

    if (!typewriterElement) {
      console.error("Typewriter element not found!");
      return;
    }

    const currentWord = this.words[this.wordIndex];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    typewriterElement.textContent = currentWord.slice(0, this.charIndex);

    if (!this.isDeleting && this.charIndex === currentWord.length) {
      this.isDeleting = true;
      setTimeout(() => this.typeEffect(), this.delayBetweenWords);
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      setTimeout(() => this.typeEffect(), 500);
    } else {
      setTimeout(() => this.typeEffect(), this.isDeleting ? this.deletingSpeed : this.typingSpeed);
    }
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

}