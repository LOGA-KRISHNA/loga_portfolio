import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  projects = [
    {
      title: 'Blog using Angular and StringBoot',
      image: 'blog.png',
      link: 'https://blogbyloga.netlify.app/'
    },
    {
      title: 'Portfolio using Angular',
      image: 'portfolio.png',
      link: 'https://logakrishna.netlify.app/'
    },
    {
      title: 'College Syposium website',
      image: 'symbo.png',
      link: 'https://avinyaa2025.web.app'
    }
    

  ];
}
