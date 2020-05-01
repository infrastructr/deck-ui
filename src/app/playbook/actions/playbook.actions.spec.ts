import * as fromPlaybooks from './playbook.actions';

describe('getPlaybooks', () => {
  it('should return an action', () => {
    expect(fromPlaybooks.getPlaybooks.type).toBe('[Playbook] Get Playbooks');
  });
});
