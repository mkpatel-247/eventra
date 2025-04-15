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
import {
  findObjectNIndex,
  getLocalStorage,
} from "src/app/shared/common/function";
import { EVENT } from "src/app/shared/constant/keys.constant";
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

  @Input() id = 0;
  @Input() editObject: any = "";
  //Date value from calendarView.
  @Input() date: any = "";
  profileImage: string | ArrayBuffer | undefined | null;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public offcanvas: NgbOffcanvas,
    public modal: NgbModal,
    private common: CommonService,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.initializeEventForm();

    if (this.id) {
      this.editObject = findObjectNIndex(this.id);
      this.profileImage = this.editObject.object.image;
      this.eventForm.patchValue(this.editObject.object);
    }
    if (this.date) {
      this.eventForm.get("timing")?.get("start")?.setValue(this.date.startDate);
      this.eventForm.get("timing")?.get("end")?.setValue(this.date.endDate);
    }
    //Get event object from localStorage.
    this.allEvent = getLocalStorage(EVENT);
  }

  /**
   * Create Event Form controls
   */
  initializeEventForm() {
    this.eventForm = this.fb.group({
      id: new FormControl(""), //Hidden field
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
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
      }),
      image: new FormControl(null, [Validators.required]),
    });
  }

  /**
   * Get easy access of controls in HTML file.
   */
  get fc() {
    return this.eventForm.controls;
  }

  /**
   * Convert the normal Image path to Base64.
   * @param event date of image field
   */
  onFileChange(event: any) {
    let reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  /**
   * Add/Edit Event form data.
   */
  onSubmitEventForm() {
    const value = this.eventForm.value;
    value.image = this.profileImage;
    if (this.eventForm.valid) {
      if (this.id) {
        this.allEvent[this.editObject.index] = value; //Update edited event.
      } else {
        value.id = this.generateUniqueEventId(); //Generate unique ID.
        this.allEvent.push(value); //Add new event.
      }
      const eventData = {
        title: value.title,
        description: value.description,
        startDate: value.timing.start,
        endDate: value.timing.end,
        image: value.image,
      };
      this.eventService.addEvent(eventData).subscribe({
        next: (res: any) => {
          // Add toast message and update the event in list or calendar.
          this.common.updateEvent$.next(this.allEvent); //Emit subject
        },
      });
      // setLocalStorage(EVENT, this.allEvent); //Set into localStorage.
      // Make Form variable empty.
      this.profileImage = "";
      this.eventForm.reset();
      // Close component.
      this.id ? this.offcanvas.dismiss(value) : this.modal.dismissAll();
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
}
