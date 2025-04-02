import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, NgClass, NgForOf } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Toast, ToastService } from '../../services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone : true,
  imports: [CommonModule,NgForOf],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('toastAnimation',[
      transition(':enter',[
        style({transform: 'translateY(100%)', opacity: 0}),
        animate('300ms ease-out',style({transform :'translateY(0)',opacity: 1}))
      ]),
      transition(':leave',[
        animate('300ms ease-in', style({transform: 'translateY(100%)', opacity: 0 }))
      ])
    ]) 
  ] 
   
})
export class ToastComponent implements OnInit, OnDestroy{

  private toasterService = inject(ToastService);
  private subscription!: Subscription;
  toasts: Toast[] = [];
  
  
  ngOnInit(): void {
    this.subscription = this.toasterService.toasts$.subscribe((toasts) => {
      this.toasts = toasts;
    })
  } 
 
  ngOnDestroy() : void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  removeToast(id: number){
    this.toasterService.remove(id);
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}