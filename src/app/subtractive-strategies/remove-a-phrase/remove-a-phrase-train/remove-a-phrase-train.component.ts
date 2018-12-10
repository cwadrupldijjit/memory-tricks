import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RemoveAPhraseService, IPhrase, ISplitPhrase } from '../remove-a-phrase.service';
import { SplitTypes } from 'src/app/data-types/split-types.enum';

@Component({
  selector: 'app-remove-a-phrase-train',
  templateUrl: './remove-a-phrase-train.component.html',
  styleUrls: ['./remove-a-phrase-train.component.scss'],
})
export class RemoveAPhraseTrainComponent implements OnInit {
  public phrase: IPhrase;
  
  get completionPercentage() {
    return this.phrase ? +(this.phrase.completionPercentage * 100).toFixed(1) : 0;
  }
  
  get SplitTypes() {
    return SplitTypes;
  }

  constructor(
    private route: ActivatedRoute,
    private removeAPhraseService: RemoveAPhraseService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.phrase = await this.removeAPhraseService.getPhrase(+params.id);
    });
  }
  
  public flip(fragment: ISplitPhrase) {
    fragment.isFlipped = !fragment.isFlipped;
    this.removeAPhraseService.updatePhrase(this.phrase, false)
      .catch(err => console.warn(err) as undefined || (fragment.isFlipped = !fragment.isFlipped));
  }
  
  public reset() {
    const originalValues = this.phrase.splits.map(f => ({...f}));
    this.phrase.splits.forEach(f => f.isFlipped = false);
    this.removeAPhraseService.updatePhrase(this.phrase, false)
      .catch(err => console.warn(err) as undefined || this.phrase.splits.forEach((f, i) => f.isFlipped = originalValues[i].isFlipped));
  }
}
