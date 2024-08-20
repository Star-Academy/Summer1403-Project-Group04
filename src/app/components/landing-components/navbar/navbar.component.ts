import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() showForm = false;
  @Output() handleForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleShowForm() {
    this.handleForm.emit(true);
  }
}
