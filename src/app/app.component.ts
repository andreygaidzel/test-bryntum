import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('scheduler')
  schedulerComponent: any;

  isLoading = false;
  zoomLevel = 9;
  assistant: any;

  features = {
    cellEdit: true,
    filter: false,
    quickFind: true,
    regionResize: true,
    stripe: true,
    eventEdit: false,
    pan: true,
    eventDragCreate: false,
    eventMenu: {
      processItems({ eventRecord }) {
        return !eventRecord.data.readonly;
      },
      items: {
        remove: {
          text: 'Delete', icon: 'b-fa b-fa-trash', weight: 400,
          onItem: (event: any) => this.removeItem(event.eventRecord.id)
        },
        deleteEvent: false
      }
    },
    timeAxisHeaderMenu: {
      items: {
        eventsFilter: false,
        dateRange: false
      }
    },
    eventDrag: {
      constrainDragToResource: true
    },
    scheduleMenu: {
      items: {
        addEvent: false
      }
    },
    cellMenu: {
      filterRemove: true,
      items: {
        filterStringEquals: false,
        removeRow: false,
        removeAssignee: {
          text: 'Remove assignee', icon: 'b-fa b-fa-trash', weight: 200,
          onItem: (e: any) => this.removeUserFromSchedule(e.cellData.id)
        }
      },
      processItems() {
      }
    }
  };

  columns = [
    { text: 'Name', field: 'name', width: 150, locked: true },
    { text: 'LOE', field: 'loe_human', width: 100, locked: true, align: 'center' }
  ];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getAssistants();
  }

  onSchedulerZoom(num: number): void {
    this.zoomLevel += num;
  }

  public getJSON(): Observable<any> {
    return this.http.get("/assets/mydata.json");
  }

  getAssistants(): void {
      this.isLoading = true;
      setTimeout(() => {
        this.getJSON().subscribe(res => {
          console.log(res);
          this.assistant = res;
          this.isLoading = false;
        })

      }, 2000)
  }

  removeUserFromSchedule(userId: number): void {
  }

  onBeforeEventResizeFinalize(event: any): void {
  }

  removeItem(eventId: number): void {
  }

  onBeforeDragCreateFinalize(event: any): void {
  }

  onBeforeEventDropFinalize(event: any): void {
  }
}
