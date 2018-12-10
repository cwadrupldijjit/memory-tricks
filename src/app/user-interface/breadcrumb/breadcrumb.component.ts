import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Route } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  public breadcrumbs$ = new BehaviorSubject(this.buildBreadcrumb(this.route.parent).filter(c => c.show));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        distinctUntilChanged(),
      )
      .subscribe(e => {
        this.breadcrumbs$.next(this.buildBreadcrumb(this.route.parent).filter(c => c.show));
      });
  }
  
  private buildBreadcrumb(route: ActivatedRoute) {
    let crumbs = [] as IBreadcrumb[];
    
    if (!route) {
      return crumbs;
    }
    
    const label = (route.routeConfig && route.routeConfig.data) ? route.routeConfig.data.breadcrumb : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';
    
    let url = path + '/';
    
    const crumb = {
      url,
      label,
      route,
      show: Boolean(label),
    } as IBreadcrumb;
    
    if (route.parent) {
      const parentCrumbs = this.buildBreadcrumb(route.parent);
      
      const parentCrumb = parentCrumbs[parentCrumbs.length - 1];
      crumb.url = (parentCrumb ? parentCrumb.url : '/') + url;
      crumb.show = crumb.url.slice(0, -1) != window.location.pathname;
      
      crumbs = [
        ...parentCrumbs,
        crumb,
      ];
    }
    else {
      crumbs.push(crumb);
    }
    
    return crumbs;
  }
}

export interface IBreadcrumb {
  label: string;
  url: string;
  route: Route;
  show: boolean;
}
