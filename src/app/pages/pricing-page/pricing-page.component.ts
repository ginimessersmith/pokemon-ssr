import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPageComponent implements OnInit {
  //? config para el CEO
  private title = inject(Title)
  private meta = inject(Meta)
  private platform = inject(PLATFORM_ID)

  ngOnInit(): void {
    // if(!isPlatformServer(this.platform)){
    //   document.title ='Pricing Page'
    // }
    //? meta tags:
    this.title.setTitle('Pricing Page')
    this.meta.updateTag({ name: 'desciption', content: 'Este es mi Pricing page' })
  }


}
