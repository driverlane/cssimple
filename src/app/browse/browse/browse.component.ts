import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../core/app.service';
import { ToasterService } from '../../toaster/toaster.service';


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

  id: any;
  children: any;

  constructor(private app: AppService, private route: ActivatedRoute, private toaster: ToasterService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      this.id = environment.start;
    }
    this.app.getChildren(this.id)
      .then(response => this.children = response)
      .catch(error => this.toaster.showToast(error));
  }

}
