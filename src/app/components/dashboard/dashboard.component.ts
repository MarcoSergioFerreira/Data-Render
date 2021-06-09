import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { InterviewRequest } from 'src/app/models/interviewRequest.interface';
import { InterviewRequestsService } from 'src/app/services/interview-requests.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {


  @ViewChild(MatSort) sort: MatSort = new MatSort;

  public displayedColumns: string[] = [
    'image',
    'candidate',
    'role',
    'salary',
    'last_comms',
    'sent_by',
    // 'status',
    'archived'
  ];
  public dataSource: MatTableDataSource<InterviewRequest> = new MatTableDataSource();
  public showArchived = true;
  private isAscending = false;
  private originalOrder: InterviewRequest[] = [];

  private interviewRequestSubscription = new Subscription;

  constructor(
    public interviewRequestService: InterviewRequestsService
  ) { }

  ngOnInit(): void {
    this.interviewRequestSubscription = this.interviewRequestService.interviewRequests
      .subscribe((requests: InterviewRequest[]) => {
        this.dataSource.data = requests as InterviewRequest[];
        this.originalOrder = requests;
        this.dataSource.sort = this.sort;
        this.sort.disableClear = true;

      });
  }

  ngOnDestroy(): void {
    this.interviewRequestSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public filterResults(filterEvent: Event): void {
    const FILTER_STR = (<HTMLInputElement>filterEvent.target).value;
    this.dataSource.filter = FILTER_STR.trim().toLocaleLowerCase();
  }

  public toggleShowArchived() {
    this.showArchived = !this.showArchived;
    const FILTER_STR = !this.showArchived ? 'true' : '';
    this.dataSource.filter = FILTER_STR.trim().toLocaleLowerCase();
  }

  public sortByLastComms() {
    this.isAscending = !this.isAscending;
    this.dataSource.data.sort((a: InterviewRequest, b: InterviewRequest) => {
      return this.isAscending
        ? new Date(a.last_comms.date_time).getTime() - new Date(b.last_comms.date_time).getTime()
        : new Date(b.last_comms.date_time).getTime() - new Date(a.last_comms.date_time).getTime();
    });
  }

  public archiveRequest(request: InterviewRequest) {
    const REQUEST_INDEX = this.dataSource.data.findIndex(existingReq => existingReq.candidate == request.candidate);
    this.dataSource.data[REQUEST_INDEX].archived = !this.dataSource.data[REQUEST_INDEX].archived;
  }

}
