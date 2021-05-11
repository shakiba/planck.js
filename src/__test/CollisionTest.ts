import { expect } from 'chai';
import sinon from 'sinon';

import Vec2 from '../common/Vec2';
import AABB from '../collision/AABB';
import DynamicTree from '../collision/DynamicTree';
import BroadPhase from '../collision/BroadPhase';
import { FixtureProxy } from "../dynamics/Fixture";

describe('Collision', function(): void {

  it('AABB', function(): void {
    var r, o = new AABB();
    expect(o.isValid()).equal(true);

    o.upperBound.set(10, 6);
    o.lowerBound.set(6, 4);

    r = o.getCenter();
    expect(r.x).equal(8);
    expect(r.y).equal(5);

    r = o.getExtents();
    expect(r.x).equal(2);
    expect(r.y).equal(1);

    r = o.getPerimeter();
    expect(r).equal(12);

    o.combine(new AABB(new Vec2(7, 4), new Vec2(9, 6)));
    expect(o.upperBound.x).equal(10);
    expect(o.upperBound.y).equal(6);
    expect(o.lowerBound.x).equal(6);
    expect(o.lowerBound.y).equal(4);

    o.combine(new AABB(new Vec2(5, 3), new Vec2(11, 7)));
    expect(o.upperBound.x).equal(11);
    expect(o.upperBound.y).equal(7);
    expect(o.lowerBound.x).equal(5);
    expect(o.lowerBound.y).equal(3);

    expect(o.contains(new AABB(new Vec2(5, 3), new Vec2(11, 7)))).equal(true);
    expect(o.contains(new AABB(new Vec2(5, 2), new Vec2(11, 7)))).equal(false);
    expect(o.contains(new AABB(new Vec2(4, 2), new Vec2(11, 7)))).equal(false);
    expect(o.contains(new AABB(new Vec2(5, 3), new Vec2(11, 8)))).equal(false);
    expect(o.contains(new AABB(new Vec2(5, 3), new Vec2(12, 7)))).equal(false);

    // rayCast
  });

  it('DynamicTree', function() {
    var tree = new DynamicTree();

    var foo = tree.createProxy(new AABB(new Vec2(0, 0), new Vec2(1, 1)), 'foo');
    var bar = tree.createProxy(new AABB(new Vec2(1, 1), new Vec2(2, 2)), 'bar');
    var baz = tree.createProxy(new AABB(new Vec2(2, 2), new Vec2(3, 3)), 'baz');

    expect(tree.getHeight()).equal(2);

    expect(tree.getUserData(foo)).equal('foo');
    expect(tree.getUserData(bar)).equal('bar');
    expect(tree.getUserData(baz)).equal('baz');

    expect(tree.getFatAABB(foo).upperBound.x).be.above(1);
    expect(tree.getFatAABB(foo).upperBound.y).be.above(1);
    expect(tree.getFatAABB(foo).lowerBound.x).be.below(0);
    expect(tree.getFatAABB(foo).lowerBound.y).be.below(0);

    var QueryCallback = sinon.spy();
    var callback = QueryCallback;

    tree.query(new AABB(new Vec2(1, 1), new Vec2(2, 2)), callback);
    expect(QueryCallback.calledWith(foo)).equal(true);
    expect(QueryCallback.calledWith(bar)).equal(true);
    expect(QueryCallback.calledWith(baz)).equal(true);

    tree.query(new AABB(new Vec2(0.3, 0.3), new Vec2(0.7, 0.7)),callback);
    expect(QueryCallback.lastCall.calledWith(foo)).equal(true);

    tree.query(new AABB(new Vec2(1.3, 1.3), new Vec2(1.7, 1.7)), callback);
    expect(QueryCallback.lastCall.calledWith(bar)).equal(true);

    tree.query(new AABB(new Vec2(2.3, 2.3), new Vec2(2.7, 2.7)), callback);
    expect(QueryCallback.lastCall.calledWith(baz)).equal(true);

    expect(tree.moveProxy(foo, new AABB(new Vec2(0, 0), new Vec2(1, 1)), new Vec2(0.01, 0.01))).equal(false);

    expect(tree.moveProxy(baz, new AABB(new Vec2(3, 3), new Vec2(4, 4)), new Vec2(0, 0))).equal(true);

    tree.query(new AABB(new Vec2(3.3, 3.3), new Vec2(3.7, 3.7)), callback);
    expect(QueryCallback.lastCall.calledWith(baz)).equal(true);

    tree.destroyProxy(foo);
    expect(tree.getHeight()).equal(1);

    tree.destroyProxy(bar);
    expect(tree.getHeight()).equal(0);

    tree.destroyProxy(baz);
    expect(tree.getHeight()).equal(0);

  });

  it('BroadPhase', function() {
    var bp = new BroadPhase();

    var AddPair = sinon.spy();
    var callback = AddPair;

    // @ts-ignore
    var foo = bp.createProxy(new AABB(new Vec2(0, 0), new Vec2(1, 1)), 'foo');
    // @ts-ignore
    var bar = bp.createProxy(new AABB(new Vec2(2, 2), new Vec2(3, 3)), 'bar');

    bp.updatePairs(callback);
    expect(AddPair.callCount).equal(0);

    // @ts-ignore
    var baz = bp.createProxy(new AABB(new Vec2(1, 1), new Vec2(2, 2)), 'baz');

    AddPair.resetHistory();
    bp.updatePairs(callback);
    expect(AddPair.callCount).equal(2);
    expect(AddPair.calledWith('bar', 'baz')).equal(true);
    expect(AddPair.calledWith('foo', 'baz')).equal(true);

    bp.moveProxy(baz, new AABB(new Vec2(0.5, 0.5), new Vec2(1.5, 1.5)), new Vec2());

    AddPair.resetHistory();
    bp.updatePairs(callback);
    expect(AddPair.callCount).equal(1);
    expect(AddPair.calledWith('foo', 'baz')).equal(true);

  });

});
