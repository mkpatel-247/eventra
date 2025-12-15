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
import { ModalComponent } from "src/app/shared/components/modal/modal.component";
import { CommonService } from "src/app/shared/services/common.service";
import { Subscription } from "rxjs";
import { EventService } from "src/app/shared/services/event.service";
import {
  CustomTableComponent,
  TableColumn,
  TableAction,
} from "src/app/shared/components/custom-table/custom-table.component";

@Component({
  selector: "app-list-view",
  standalone: true,
  imports: [CommonModule, CustomTableComponent],
  templateUrl: "./list-view.component.html",
  styleUrls: ["./list-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent implements OnInit, OnDestroy {
  eventList: IEvent[] = [];
  private modalService = inject(NgbModal);
  subscribed: Subscription[] = [];

  // Table configuration
  columns: TableColumn[] = [
    { key: "image", label: "Image", type: "image" },
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "eventDate.startDate", label: "Start Date", type: "date" },
    { key: "eventDate.endDate", label: "End Date", type: "date" },
    { key: "category", label: "Category", type: "badge" },
  ];

  actions: TableAction[] = [
    {
      label: "",
      icon: "bi-geo-alt-fill",
      cssClass: "btn-link",
      callback: (row) => this.viewLocation(row.address),
    },
    {
      label: "",
      icon: "bi-info-circle",
      cssClass: "btn-outline-info",
      callback: (row) => this.viewEventDetails(row),
    },
    {
      label: "",
      icon: "bi-trash",
      cssClass: "btn-outline-danger",
      callback: (row) => this.deleteEvent(row._id),
    },
  ];

  constructor(
    private cdr: ChangeDetectorRef,
    public common: CommonService,
    private eventService: EventService
  ) { }

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
   * Delete event via backend API.
   * @param eventId record id that need to delete.
   */
  deleteEvent(eventId: string) {
    if (confirm("Are you sure you want to delete this event?")) {
      const sub = this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          alert("Event deleted successfully");
          this.getEventList(); // Refresh list
        },
        error: (err) => {
          alert("Error deleting event: " + (err.error?.message || "Unknown error"));
        },
      });
      this.subscribed.push(sub);
    }
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
