import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export default class ContactPageComponent implements OnInit {
  //? config para el CEO
  private title = inject(Title)
  private meta = inject(Meta)

  ngOnInit(): void {
    //? meta tagas:
    this.title.setTitle('Contact Page')
    this.meta.updateTag({name:'desciption',content:'Este es mi contact page'})
  }


}
