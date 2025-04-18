import { Component, Input, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModal, NgbModule, NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import { IEvent } from "../../interface/interface";
import { ManageEventComponent } from "src/app/home/event/manage-event/manage-event.component";
import { GoogleMapsModule, MapGeocoder } from "@angular/google-maps";
import { CommonService } from "../../services/common.service";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CommonModule, NgbModule, GoogleMapsModule],
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  public modalService = inject(NgbModal);
  private offCanvasService = inject(NgbOffcanvas);
  /**
   * Google Maps Api.
   */
  mapOptions: google.maps.MapOptions = {
    zoom: 10,
  };
  position = { lat: 37.9, lng: -76.8 };

  @Input() eventDetails: IEvent = {
    _id: 0,
    title: "",
    description: "",
    image: "",
    eventDate: { startDate: "", endDate: "" },
    address: undefined,
  };

  @Input() location: any = "";

  ngOnInit(): void {
    this.getLocation();
  }

  constructor(public common: CommonService) {}

  openEditForm() {
    const ref = this.offCanvasService.open(ManageEventComponent, {
      position: "end",
      animation: true,
      backdrop: true,
      panelClass: "manage-event-component",
    });
    ref.componentInstance.id = this.eventDetails._id;
    // Close the modal view.
    this.modalService.dismissAll();
    // When offcanvas is dismissed then subscribe and get the value.
    ref.dismissed.subscribe({
      next: (response: any) => {
        const modalRef = this.modalService.open(ModalComponent, {
          size: "lg",
          centered: true,
          modalDialogClass: "custom-modal-dialog",
          backdropClass: "custom-modal-backdrop",
        });
        modalRef.componentInstance.eventDetails = response || this.eventDetails;
      },
    });
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
   * Get geoLocation of event address.
   */
  getLocation() {
    if (this.location) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { address: `${this.location.area},${this.location.city}` },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results) {
            this.position = {
              lat: results[0]?.geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            console.log(this.position);
          } else {
            console.log("Not Found");
          }
        }
      );
    }
  }
}
