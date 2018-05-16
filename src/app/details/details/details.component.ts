import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  loading = true;
  id: number;
  node: any;

  constructor(private app: AppService, private route: ActivatedRoute, private toaster: ToasterService) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.app.getNode(this.id)
      .then(response => {
        this.node = response;
        this.loading = false;
      })
      .catch(error => {
        this.toaster.showToast(error);
        this.loading = false;
      });
  }

}
