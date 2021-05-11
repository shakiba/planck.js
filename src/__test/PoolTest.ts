import { expect } from 'chai';

import Pool from '../util/Pool';

describe('Pool', function(): void {
  it('Pool', function(): void {

    interface Type {
      busy: boolean;
      discarded: boolean;
      created: boolean;
    }
    var pool = new Pool<Type>({
      create : function(): Type {
        return {
          created : true,
          busy : false,
          discarded : false,
        };
      },
      allocate : function(obj: Type): void {
        obj.busy = true;
      },
      release : function(obj: Type): void {
        obj.busy = false;
      },
      discard : function(obj: Type): Type {
        obj.discarded = true;
        return;
      },
      max : 1
    });

    var a = pool.allocate();
    var b = pool.allocate();

    expect(a.created).be.true;
    expect(a.busy).be.true;
    expect(a.discarded).be.false;

    pool.release(a);
    expect(a.busy).be.false;
    expect(a.discarded).be.false;

    pool.release(b);
    expect(b.discarded).be.true;

  });
});
