import {SearchPipe} from './search.pipe';

describe('SearchPipe', () => {

  let pipe = new SearchPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should find user', function () {
    let testData = ['Grisha', 'Ruslan', 'Orest'];
    expect(pipe.transform(testData, 'Grisha')).toEqual(['Grisha']);
  });

  it('should give empty array', function () {
    let testData: any = [];
    expect(pipe.transform(testData.length, 'Grisha')).toEqual([]);
  });
});
