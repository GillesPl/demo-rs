import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class CheckDigitService {

  constructor() { }

  private dict = { '<': 0, '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18, 'J': 19,
    'K': 20, 'L': 21, 'M': 22, 'N': 23, 'O': 24, 'P': 25, 'Q': 26, 'R': 27, 'S': 28, 'T': 29, 'U': 30, 'V': 31,
    'W': 32, 'X': 33, 'Y': 34, 'Z': 35
  };

  calculate(string) {
    return _.sum(_.map(_.map(string, (letter) => {
      return this.dict[letter.toUpperCase()];
    }), (val, index) => {
      let weighted = val;
      switch (index % 3) {
        case 0:
          weighted = val * 7;
          break;
        case 1:
          weighted = val * 3;
          break;
        case 2:
          break;
      }
      return weighted;
    })) % 10;
  }

}
