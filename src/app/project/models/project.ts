import {Reference} from '../../base/models/reference';

export interface Project {
  id: string;
  name: string;
  description: string;
  owner: Reference;
  author: Reference;
}
