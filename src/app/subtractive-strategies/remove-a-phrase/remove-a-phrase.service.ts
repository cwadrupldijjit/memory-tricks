import { Injectable } from '@angular/core';
import { IndexedDbService } from 'src/app/services/indexed-db.service';
import { SplitTypes } from 'src/app/data-types/split-types.enum';
import { REMOVE_A_PHRASE } from 'src/app/constants/collection-names';

@Injectable({
  providedIn: 'root'
})
export class RemoveAPhraseService {
  constructor(
    private indexedDbService: IndexedDbService,
  ) {}
  
  public splitPhraseByDelimiter(
    phrase: string,
    delimiter: string|string[]|RegExp,
    includeDelimiterInSplit = false,
  ): string[] {
    phrase = phrase.trim();
    
    let splitter;
    let splitPhrase = [''];
    let delimitingCharacters = '';
    
    if (typeof delimiter == 'string') {
      delimitingCharacters = delimiter;
    }
    else if (Array.isArray(delimiter)) {
      delimitingCharacters = delimiter.join('');
    }
    
    if (!(delimiter instanceof RegExp)) {
      splitter = this.getSplitter(new RegExp(`[${delimitingCharacters}]+`, 'mi'), includeDelimiterInSplit);
    }
    else {
      splitter = this.getSplitter(delimiter, includeDelimiterInSplit);
    }
    
    splitPhrase = phrase.split(splitter);
    
    splitPhrase = splitPhrase.filter(Boolean);
    
    return splitPhrase;
  }
  
  public splitPhraseBySpace(phrase: string) {
    return this.splitPhraseByDelimiter(phrase, [ '\\s', '\\r', '\\n' ]);
  }
  
  public splitPhraseByNewline(phrase: string) {
    return this.splitPhraseByDelimiter(phrase, '\\r\\n');
  }
  
  public splitPhraseBySentence(phrase: string) {
    return this.splitPhraseByDelimiter(phrase, '\\.')
      .map(fragment => fragment + '.');
  }
  
  public splitPhraseByPoints(phrase: string, pointIndexes: number[]) {
    
  }
  
  public splitPhrase(phrase: string, splitType: SplitTypes, delimiter?: string): string[];
  public splitPhrase(phraseData: INewPhrase): string[];
  public splitPhrase(
    phrase: string|INewPhrase,
    splitType?: SplitTypes,
    splitPoints?: string|number[]
  ) {
    if (typeof phrase == 'object') {
      let originalPhrase = phrase;
      phrase = originalPhrase.text;
      splitType = originalPhrase.splitType;
      splitPoints = splitType == SplitTypes.delimiter ?
          originalPhrase.delimiter :
          splitType == SplitTypes.custom ?
              originalPhrase.splitPoints :
              null;
    }
    
    let split: string[];
    
    switch (splitType) {
      case SplitTypes.word:
        split = this.splitPhraseBySpace(phrase);
        break;
      
      case SplitTypes.sentence:
        split = this.splitPhraseBySentence(phrase);
        break;
      
      case SplitTypes.line:
        split = this.splitPhraseByNewline(phrase);
        break;
      
      case SplitTypes.delimiter:
        split = this.splitPhraseByDelimiter(phrase, splitPoints as string, true);
        break;
    }
    
    return split;
  }
  
  public addPhrase(phraseData: INewPhrase) {
    phraseData.splits = this.splitPhrase(phraseData).map(fragment => ({ text: fragment, isFlipped: false } as ISplitPhrase));
    phraseData.completionPercentage = 0;
    return this.indexedDbService.add(REMOVE_A_PHRASE, phraseData) as Promise<IPhrase>;
  }
  
  public updatePhrase(data: IPhrase, refreshSplits = true) {
    if (refreshSplits) {
      data.splits = this.splitPhrase(data).map(fragment => ({ text: fragment, isFlipped: false } as ISplitPhrase));
    }
    
    data.completionPercentage = data.splits.reduce((t, f) => {
      if (f.isFlipped) {
        t++;
      }
      
      return t;
    }, 0) / data.splits.length;
    
    return this.indexedDbService.put(REMOVE_A_PHRASE, data) as Promise<IPhrase>;
  }
  
  public getPhrase(id: number) {
    return this.indexedDbService.get(REMOVE_A_PHRASE, id) as Promise<IPhrase>;
  }
  
  public getAllPhrases(): Promise<IPhrase[]> {
    return this.indexedDbService.getAll(REMOVE_A_PHRASE) as Promise<IPhrase[]>;
  }
  
  private getSplitter(
    delimiter: RegExp,
    includeDelimiter = false,
    limit = -1,
  ) {
    return Object.create({
      [Symbol.split](str: string) {
        const result = [] as string[];
        
        if (delimiter.global) {
          delimiter = new RegExp(delimiter.source, delimiter.flags.replace('g', ''));
        }
        
        let remainingString = str;
        let remainingLimit = limit;
        do {
          const delimiterMatch = remainingString.match(delimiter);
          
          if (!delimiterMatch) {
            result.push(remainingString);
            remainingString = '';
            break;
          }
          
          const { index, 0: currentDelimiter } = delimiterMatch;
          
          const fragment = remainingString.slice(0, index) + (includeDelimiter ? currentDelimiter : '');
          
          result.push(fragment);
          
          remainingString = remainingString.slice(index + currentDelimiter.length);
          remainingLimit--;
        } while ((limit > -1 ? remainingLimit > 0 : true) && remainingString);
        
        if (remainingString) {
          result.push(remainingString);
        }
        
        return result;
      },
    });
  }
}

export interface INewPhrase {
  text: string;
  splitType: SplitTypes;
  splits: ISplitPhrase[];
  delimiter?: string;
  splitPoints?: number[];
  completionPercentage: number;
}

export interface IPhrase extends INewPhrase {
  id: number;
}

export interface ISplitPhrase {
  text: string;
  isFlipped: boolean;
}
