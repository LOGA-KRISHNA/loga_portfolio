import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Skill {
  name: string;
  level: number;
  animationState?: string;
}

interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  isActive: boolean;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface Particle {
  x: number;
  y: number;
  color: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  isHeaderVisible = false;
  isBioVisible = false;
  isSkillsVisible = false;
  isExperienceVisible = false;
  isEducationVisible = false;
  particles: Particle[] = [];

  skills: Skill[] = [
    { name: 'SpringBoot', level: 90 },
    { name: 'Angular/Typescript', level: 85 },
    { name: 'Java', level: 80 },
    { name: 'c/c++', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'linux/bash', level: 70 },
    { name: 'Tailwindcss', level: 70 }
  ];

  experiences: Experience[] = [
    {
      period: 'Oct 3, 2024 - Dec 5, 2024',
      role: 'Web Development Intern',
      company: 'Infosys Springboard',
      description: 'Internship 5.0 -Tourist Management System.Collaborated remotely with Team members and peers to implement scalable solutions.[ Angular, SpringBoot]',
      isActive: true
    },
    {
      period: '2021 - 2023',
      role: 'Full Stack Developer',
      company: 'Digital Solutions Ltd',
      description: 'Developed and maintained multiple web applications using modern technologies',
      isActive: true
    }
  ];

  education: Education[] = [
    {
      degree: 'Bachelor of Artificial Intelligence and Machine Learning',
      institution: 'RMD Engineering College',
      year: '2022 - 2026'
    },
    {
      degree: 'Higher Secondary School',
      institution: 'Bharathiar Higher Secondary School',
      year: '2019 - 2022'
    }
  ];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.initializeParticles();
    this.isHeaderVisible = true;
    this.triggerVisibilitySequence();
  }

  private initializeParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: `hsla(${Math.random() * 360}, 70%, 70%, 0.6)`
      });
    }
  }

  private triggerVisibilitySequence() {
    this.isBioVisible = true;
    this.isSkillsVisible = true;
    this.isExperienceVisible = true;
    this.isEducationVisible = true;
  }

  onCardHover(cardType: string) {
    const card = this.elementRef.nativeElement.querySelector(`.${cardType}-card`);
    this.renderer.addClass(card, 'hovered');

    if (cardType === 'skills') {
      this.skills.forEach(skill => {
        skill['animationState'] = 'shown';
      });
    }
  }

  onCardLeave(cardType: string) {
    const card = this.elementRef.nativeElement.querySelector(`.${cardType}-card`);
    this.renderer.removeClass(card, 'hovered');

    if (cardType === 'skills') {
      this.skills.forEach(skill => {
        skill['animationState'] = 'hidden';
      });
    }
  }

  private animateSkillBars() {
    const skillBars = this.elementRef.nativeElement.querySelectorAll('.skill-bar');
    skillBars.forEach((bar: HTMLElement, index: number) => {
      this.renderer.setStyle(bar, 'width', `${this.skills[index].level}%`);
    });
  }
}
