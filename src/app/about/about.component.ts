import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';

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
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('fadeInStagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('cardAnimation', [
      state('default', style({
        transform: 'scale(1)',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      })),
      state('hovered', style({
        transform: 'scale(1.05)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
      })),
      transition('default <=> hovered', animate('200ms ease-in-out'))
    ]),
    trigger('skillBar', [
      state('shown', style({ width: '{{level}}%' }), { params: { level: 0 } }),
      state('hidden', style({ width: '0%' })),
      transition('hidden => shown', animate('600ms ease-out')),
      transition('shown => hidden', animate('300ms ease-in'))
    ])
  ]
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
      isActive: false
    },
    {
      period: '2021 - 2023',
      role: 'Full Stack Developer',
      company: 'Digital Solutions Ltd',
      description: 'Developed and maintained multiple web applications using modern technologies',
      isActive: false
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
    setTimeout(() => {
      this.isHeaderVisible = true;
      this.triggerVisibilitySequence();
    }, 500);
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
    setTimeout(() => this.isBioVisible = true, 500);
    setTimeout(() => this.isSkillsVisible = true, 1000);
    setTimeout(() => this.isExperienceVisible = true, 1500);
    setTimeout(() => this.isEducationVisible = true, 2000);
  }

  onCardHover(cardType: string) {
    const card = this.elementRef.nativeElement.querySelector(`.${cardType}-card`);
    this.renderer.addClass(card, 'hovered');
    
    if (cardType === 'skills') {
      this.skills.forEach((skill, index) => {
        setTimeout(() => {
          skill['animationState'] = 'shown';
        }, index * 100);
      });
    } else if (cardType === 'experience') {
      this.animateTimeline();
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
      setTimeout(() => {
        this.renderer.setStyle(bar, 'width', `${this.skills[index].level}%`);
      }, index * 100);
    });
  }

  private animateTimeline() {
    this.experiences.forEach((exp, index) => {
      setTimeout(() => {
        exp.isActive = true;
      }, index * 300);
    });
  }
}
