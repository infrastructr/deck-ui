import {ColumnDefinition} from './column-definition';

export class AdvancedColumnDefinition<T> implements ColumnDefinition<T> {
  constructor(
    public name: string,
    public title: string,
    public toValue: (value: T) => string,
  ) {
  }
}
