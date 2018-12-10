import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SplitTypes } from 'src/app/data-types/split-types.enum';
import { RemoveAPhraseService, IPhrase } from '../remove-a-phrase.service';
import { conditionallyRequired } from 'src/app/shared/validators/conditional-required.validator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-a-phrase',
  templateUrl: './add-a-phrase.component.html',
  styleUrls: ['./add-a-phrase.component.scss']
})
export class AddAPhraseComponent implements OnInit {
  public formGroup: FormGroup;
  public splitTypes = [
    { id: SplitTypes.word, label: 'By word' },
    { id: SplitTypes.sentence, label: 'By sentence' },
    { id: SplitTypes.line, label: 'By line' },
    { id: SplitTypes.delimiter, label: 'By a delimiter' },
    { id: SplitTypes.custom, label: 'Custom split' },
  ];
  public splitPreview = [] as string[];
  public phrase: IPhrase;
  
  get isEditing() {
    return Boolean(this.phrase);
  }
  
  get showDelimiter() {
    return this.formGroup.controls.splitType.value == SplitTypes.delimiter;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private removeAPhraseService: RemoveAPhraseService,
  ) {}

  public ngOnInit() {
    this.createForm();
    
    this.route.params.subscribe(async params => {
      if (!+params.id) return;
      
      this.phrase = await this.removeAPhraseService.getPhrase(+params.id);
      
      this.formGroup.setValue({
        text: this.phrase.text,
        delimiter: this.phrase.delimiter,
        splitType: this.phrase.splitType,
        splitPoints: this.phrase.splitPoints,
      });
    });
  }
  
  public handleSubmit() {
    if (this.formGroup.invalid) return;
    
    let updatePromise: Promise<IPhrase>;
    
    if (this.isEditing) {
      updatePromise = this.removeAPhraseService.updatePhrase({
        ...this.phrase,
        ...this.formGroup.value,
      });
    }
    else {
      updatePromise = this.removeAPhraseService.addPhrase(this.formGroup.value);
    }
    
    updatePromise
      .then(() => {
        this.resetForm();
        this.router.navigate(['../'], { relativeTo: this.route });
      });
  }
  
  public previewSplit() {
    let phrase = this.formGroup.controls.text.value;
    let delimiter = this.formGroup.controls.delimiter.value;
    let splitType = this.formGroup.controls.splitType.value;
    
    this.splitPreview = this.removeAPhraseService.splitPhrase(phrase, splitType, delimiter);
  }
  
  public updateValidation(controlName?: string) {
    requestAnimationFrame(() => {
      if (controlName) {
        this.formGroup.get(controlName).updateValueAndValidity();
      }
      else {
        this.formGroup.updateValueAndValidity();
      }
    });
  }
  
  private createForm() {
    this.formGroup = this.fb.group({
      text: ['', Validators.required],
      delimiter: [
        '',
        conditionallyRequired(() => this.formGroup ? this.formGroup.controls.splitType.value == SplitTypes.delimiter : false),
      ],
      splitType: SplitTypes.word,
      splitPoints: null,
    });
  }
  
  private resetForm() {
    this.formGroup.setValue({
      text: '',
      splitType: SplitTypes.word,
      delimiter: '',
      splitPoints: null,
    }, { emitEvent: true });
  }
}
