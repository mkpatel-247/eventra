import { ChangeDetectionStrategy, Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { TOKEN } from '../../constant/keys.constant';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  //Sidebar
  sidebarShow: boolean = true;

  constructor(
    private router: Router,
    private http: HttpService,
    private common: CommonService
  ) { }

  /**
   * Remove Token from localStorage and make the user logout from website.
   */
  logoutButton() {
    this.http.logout().subscribe({
      next: (response: any) => {
        localStorage.removeItem(TOKEN);
        this.router.navigateByUrl('/');
      },
    });
  }

  /**
   * Toggle Sidebar.
   */
  sidebarToggle() {
    if (this.sidebarShow) {
      this.common.addClassInBody('toggle-sidebar');
      this.sidebarShow = false;
    } else {
      this.common.removeClassInBody('toggle-sidebar');
      this.sidebarShow = true;
    }
  }
}
