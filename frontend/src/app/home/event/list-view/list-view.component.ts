import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ManageEventComponent } from "../manage-event/manage-event.component";
import { IEvent } from "src/app/shared/interface/interface";
import {
  findObjectNIndex,
  getLocalStorage,
  setLocalStorage,
} from "src/app/shared/common/function";
import { EVENT } from "src/app/shared/constant/keys.constant";
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { CommonService } from "src/app/shared/services/common.service";
import { Subscription } from "rxjs";
import { EventService } from "src/app/shared/services/event.service";

@Component({
  selector: "app-list-view",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent implements OnInit, OnDestroy {
  eventList: IEvent[] = [];
  private modalService = inject(NgbModal);
  //Store all subscription.
  subscribed: Subscription[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    public common: CommonService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    //Get event list from local storage.
    const sub = this.common.updateEvent$.subscribe({
      next: () => {
        this.getEventList();
      },
    });
    this.subscribed.push(sub);
    this.getEventList();
  }

  /**
   * Open Modal to add event
   */
  addEvent() {
    this.modalService.open(ManageEventComponent);
  }

  /**
   * View location of event in google map by opening modal.
   * @param address address that need to view
   */
  viewLocation(address: any) {
    const locationModalRef = this.modalService.open(ModalComponent, {
      size: "lg",
      centered: true,
      modalDialogClass: "custom-modal-dialog",
      backdropClass: "custom-modal-backdrop",
    });
    locationModalRef.componentInstance.location = address;
  }

  /**
   * View event details in a modal.
   */
  viewEventDetails(event: IEvent) {
    const viewModalRef = this.modalService.open(ModalComponent, {
      size: "lg",
      centered: true,
      modalDialogClass: "custom-modal-dialog",
      backdropClass: "custom-modal-backdrop",
    });
    viewModalRef.componentInstance.eventDetails = event;
  }

  /**
   * Delete event.
   * @param eventId record id that need to delete.
   */
  deleteEvent(eventId: number) {
    const allEvent = getLocalStorage(EVENT);
    const eventIndex = findObjectNIndex(eventId).index;
    allEvent.splice(eventIndex, 1);
    this.eventList = allEvent;
    setLocalStorage(EVENT, allEvent);
  }

  getEventList() {
    const sub = this.eventService.fetchEvents().subscribe({
      next: (res: any) => {
        this.eventList = res?.data?.list;
        this.cdr.markForCheck();
      },
    });
    this.subscribed.push(sub);
  }

  ngOnDestroy(): void {
    //Unsubscribe all event.
    this.subscribed.forEach((element: Subscription) => {
      return element.unsubscribe();
    });
  }
}
