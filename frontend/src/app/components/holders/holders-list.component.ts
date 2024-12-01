import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject,
  LOCALE_ID,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  timer,
  Subscription,
} from 'rxjs';
import {
  filter,
  map,
  retryWhen,
  delayWhen,
  switchMap,
  tap,
  throttleTime,
} from 'rxjs/operators';
import { ApiService } from '@app/services/api.service';
import { StateService } from '@app/services/state.service';
import { SeoService } from '@app/services/seo.service';
import { OpenGraphService } from '@app/services/opengraph.service';
import {
  IHolder as Holder,
  IHolderApiResponse,
} from '@app/interfaces/node-api.interface';

@Component({
  selector: 'app-holders-list',
  templateUrl: './holders-list.component.html',
  styleUrls: ['./holders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoldersList implements OnInit, OnDestroy {
  holders$: Observable<Holder[]> = undefined;

  isLoading = true;
  page = 1;
  lastPage = 1;
  maxSize = window.innerWidth <= 767.98 ? 3 : 5;
  holdersCount: number;
  skeletonLines: number[] = [];
  holdersCountInitialized$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  holdersCountInitializedSubscription: Subscription;
  keyNavigationSubscription: Subscription;
  dir: 'rtl' | 'ltr' = 'ltr';

  constructor(
    private apiService: ApiService,
    public stateService: StateService,
    private cd: ChangeDetectorRef,
    private seoService: SeoService,
    private ogService: OpenGraphService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string
  ) {
    if (
      this.locale.startsWith('ar') ||
      this.locale.startsWith('fa') ||
      this.locale.startsWith('he')
    ) {
      this.dir = 'rtl';
    }
  }

  ngOnInit(): void {
    // Set SEO
    this.seoService.setTitle('Holders');
    this.ogService.setManualOgImage('holders.jpg'); // Provide an appropriate image
    this.seoService.setDescription('See the list of holders');

    // Handle route params and page changes
    this.holdersCountInitializedSubscription = combineLatest([
      this.holdersCountInitialized$,
      this.route.params,
    ])
      .pipe(
        filter(([holdersCountInitialized, _]) => holdersCountInitialized),
        tap(([_, params]) => {
          this.page = +params['page'] || 1;
        })
      )
      .subscribe();

    const prevKey = this.dir === 'ltr' ? 'ArrowLeft' : 'ArrowRight';
    const nextKey = this.dir === 'ltr' ? 'ArrowRight' : 'ArrowLeft';

    // Keyboard navigation
    this.keyNavigationSubscription = this.stateService.keyNavigation$
      .pipe(
        filter((event) => event.key === prevKey || event.key === nextKey),
        tap((event) => {
          if (event.key === prevKey && this.page > 1) {
            this.page--;
            this.isLoading = true;
            this.cd.markForCheck();
          }
          if (event.key === nextKey && this.page * 100 < this.holdersCount) {
            this.page++;
            this.isLoading = true;
            this.cd.markForCheck();
          }
        }),
        throttleTime(1000, undefined, { leading: true, trailing: true })
      )
      .subscribe(() => {
        this.pageChange(this.page);
      });

    this.skeletonLines = [...Array(100).keys()];
    this.maxSize = window.matchMedia('(max-width: 670px)').matches ? 3 : 5;

    // Fetch holders data
    this.holders$ = this.route.params.pipe(
      switchMap((params) => {
        this.page = +params['page'] || 1;
        this.isLoading = true;
        return this.apiService.getHolders$(this.page).pipe(
          tap((response) => {
            this.holdersCount = response.total;
            this.holdersCountInitialized$.next(true);
            this.holdersCountInitialized$.complete();

            this.isLoading = false;
          }),
          map((response) => response.holders),
          retryWhen((errors) => errors.pipe(delayWhen(() => timer(10000))))
        );
      })
    );
  }

  pageChange(page: number): void {
    this.router.navigate(['holders', page]);
  }

  trackByHolder(index: number, holder: Holder): number {
    return holder.position;
  }

  isEllipsisActive(e): boolean {
    return e.offsetWidth < e.scrollWidth;
  }

  ngOnDestroy(): void {
    this.holdersCountInitializedSubscription?.unsubscribe();
    this.keyNavigationSubscription?.unsubscribe();
  }
}
