import {Reference} from '../../base/models/reference';

export interface Provider {
  id: string;
  name: string;
  description: string;
  type: string;
  owner: Reference;
}
