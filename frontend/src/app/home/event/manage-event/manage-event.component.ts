import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModal, NgbModule, NgbOffcanvas } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { dateRangeValidator } from "src/app/shared/common/validations";
import { CommonService } from "src/app/shared/services/common.service";
import { LoggerService } from "src/app/shared/services/logger.service";
import { EventService } from "src/app/shared/services/event.service";

@Component({
  selector: "app-manage-event",
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  templateUrl: "./manage-event.component.html",
  styleUrls: ["./manage-event.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageEventComponent implements OnInit {
  eventForm!: FormGroup;
  allEvent: any = "";
  isSubmitted: boolean = false;

  @Input() id: string = "";
  @Input() editObject: any = "";
  @Input() date: any = "";

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public offcanvas: NgbOffcanvas,
    public modal: NgbModal,
    private common: CommonService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.initializeEventForm();

    if (this.id) {
      this.getEventById(this?.id);
    }
    if (this.date) {
      this.eventForm.get("timing")?.get("start")?.setValue(this.date.startDate);
      this.eventForm.get("timing")?.get("end")?.setValue(this.date.endDate);
    }
  }

  /**
   * Create Event Form controls
   */
  initializeEventForm() {
    this.eventForm = this.fb.group({
      id: new FormControl(""), //Hidden field
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      category: new FormControl("Other", [Validators.required]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      capacity: new FormControl(0, [Validators.required, Validators.min(1)]),
      tags: new FormControl(""), // Comma separated string for UI
      timing: new FormGroup(
        {
          start: new FormControl("", [Validators.required]),
          end: new FormControl("", [Validators.required]),
        },
        { validators: dateRangeValidator("start", "end") }
      ),
      address: new FormGroup({
        city: new FormControl("", [Validators.required]),
        area: new FormControl("", [Validators.required]),
        fullAddress: new FormControl("", [Validators.required]),
      }),
      image: new FormControl(null),
    });
  }

  /**
   * Get easy access of controls in HTML file.
   */
  get fc() {
    return this.eventForm.controls;
  }

  /**
   * Add/Edit Event form data.
   */
  onSubmitEventForm() {
    const value = this.eventForm.value;
    if (this.eventForm.valid) {
      const eventData = {
        title: value.title,
        description: value.description,
        startDate: value.timing.start,
        endDate: value.timing.end,
        category: value.category,
        price: value.price,
        capacity: value.capacity,
        tags: value.tags ? value.tags.split(",").map((t: string) => t.trim()) : [],
        address: [value.address], // Backend expects array of address objects
      };

      // Determine if this is an edit or create operation
      const apiCall = this.id
        ? this.eventService.updateEvent(this.id, eventData)
        : this.eventService.addEvent(eventData);

      apiCall.subscribe({
        next: (res: any) => {
          // Add toast message and update the event in list or calendar.
          this.common.updateEvent$.next(this.allEvent); //Emit subject
          this.eventForm.reset();
          this.id ? this.offcanvas.dismiss(value) : this.modal.dismissAll();
        },
        error: (err) => {
          console.error("Event operation failed", err);
        },
      });
    } else {
      this.isSubmitted = true;
    }
    this.cdr.detectChanges();
  }

  /**
   * Generate Unique Event ID.
   * @returns Unique ID
   */
  private generateUniqueEventId() {
    return this.allEvent.length ? this.allEvent.length + 1 : 1;
  }

  /**
   * Fetches the event by ID and populates the form with the event data.
   * @param id The ID of the event to be fetched.
   */
  private getEventById(id: string) {
    this.eventService.getSpecificEvent(id).subscribe({
      next: (res: any) => {
        const event = res?.data;
        const timing = {
          start: event?.eventDate?.startDate,
          end: event?.eventDate?.endDate,
        };
        const address = event?.address?.[0] || {};
        const tagsString = event?.tags?.join(", ") || "";

        this.eventForm.patchValue({
          title: event?.title,
          description: event?.description,
          timing,
          capacity: event?.capacity,
          category: event?.category,
          price: event?.price,
          tags: tagsString,
          address,
        });
        this.cdr.markForCheck();
      },
    });
  }
}
