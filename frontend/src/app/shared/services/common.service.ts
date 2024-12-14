import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  //Breadcrumb Data
  breadCrumb$ = new BehaviorSubject<any>([]);

  //Indicate any changes in event list
  updateEvent$ = new BehaviorSubject('');

  private render!: Renderer2;
  private body!: HTMLElement;
  constructor(
    private renderFactory: RendererFactory2,
    private modalService: NgbModal
  ) {
    this.render = renderFactory.createRenderer(null, null);
    this.body = this.render.selectRootElement('body', true); //Safe way to select body tag.
  }

  /**
   * Add Class at body tag.
   * @param className name of class that need to add.
   */
  addClassInBody(className: string) {
    this.render.addClass(this.body, className);
  }

  /**
   * Remove class from body tag.
   * @param className name of class that need to remove.
   */
  removeClassInBody(className: string) {
    this.render.removeClass(this.body, className);
  }
}
