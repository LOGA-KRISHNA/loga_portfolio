import { NgClass } from '@angular/common';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { NavComponent } from "./nav/nav.component";
import { ProjectComponent } from "./project/project.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, ProjectComponent, AboutComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
