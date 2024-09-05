import { Component, OnInit } from '@angular/core';
import { BreadCrumpComponent } from '../bread-crump/bread-crump.component';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { comments, commentType } from '../../models/comments';

@Component({
  selector: 'app-dashboard-content',
  standalone: true,
  imports: [BreadCrumpComponent, NzCommentModule, CommonModule, NzAvatarModule, NzIconModule, NzDividerModule],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss',
})
export class DashboardContentComponent implements OnInit {
  protected commentList: commentType[] = [];

  ngOnInit(): void {
    this.commentList = comments;
  }
}
