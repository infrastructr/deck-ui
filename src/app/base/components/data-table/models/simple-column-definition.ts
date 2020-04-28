import {ColumnDefinition} from './column-definition';

export class SimpleColumnDefinition implements ColumnDefinition<string> {
  toValue: (value: string) => string;

  constructor(
    public name: string,
    public title: string,
  ) {
    this.toValue = (value: string) => (value);
  }
}
