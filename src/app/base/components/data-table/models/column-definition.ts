export interface ColumnDefinition<T> {
  name: string;
  title: string;
  toValue: (value: T) => string;
}
