import { Component, OnInit } from '@angular/core';
import { RemoveAPhraseService, IPhrase } from './remove-a-phrase.service';

@Component({
  selector: 'app-remove-a-phrase',
  templateUrl: './remove-a-phrase.component.html',
  styleUrls: ['./remove-a-phrase.component.scss']
})
export class RemoveAPhraseComponent implements OnInit {
  public phrases: IPhrase[];

  constructor(
    private removeAPhraseService: RemoveAPhraseService,
  ) {}

  ngOnInit() {
    this.removeAPhraseService.getAllPhrases()
      .then(phrases => {
        this.phrases = phrases;
      });
  }
}
