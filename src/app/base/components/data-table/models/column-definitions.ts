import {ColumnDefinition} from './column-definition';

export class ColumnDefinitions implements Iterable<any> {
  constructor(
    public values: ColumnDefinition<any>[],
  ) {
  }

  toColumnNames() {
    return this.values.map(value => value.name);
  }

  [Symbol.iterator](): Iterator<any> {
    return this.values[Symbol.iterator]();
  }
}
