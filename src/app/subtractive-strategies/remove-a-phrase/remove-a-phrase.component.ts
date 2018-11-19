import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-remove-a-phrase',
  templateUrl: './remove-a-phrase.component.html',
  styleUrls: ['./remove-a-phrase.component.scss']
})
export class RemoveAPhraseComponent implements OnInit {
  public form: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      phrase: [''],
      divisionType: [''],
    });
  }

}
