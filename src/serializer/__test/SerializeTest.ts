// import util from 'util';
import { expect } from 'chai';

import Vec2 from '../../common/Vec2';
import Circle from '../../collision/shape/CircleShape';
import Box from '../../collision/shape/BoxShape';
import DistanceJoint from '../../dynamics/joint/DistanceJoint';
import World from '../../dynamics/World';

import Serializer from '../../serializer';

describe('Serializer', function(): void {
  it('saves and loads to JSON', function(): void {

    var world = new World();

    var circle = new Circle(1);
    var box = new Box(1, 1);

    var b1 = world.createBody({
      position : new Vec2(0, 0),
      type : 'dynamic'
    });

    b1.createFixture(circle);

    var b2 = world.createBody({
      position : new Vec2(2, 0),
      type : 'dynamic'
    });
    b2.createFixture(box);

    world.createJoint(new DistanceJoint({
      bodyA: b1,
      localAnchorA: new Vec2(6, 0),
      bodyB: b2,
      localAnchorB: new Vec2(0, -1)
    }));

    var json = Serializer.toJson(world);
    var text = JSON.stringify(json, null, ' ');
    // console.log(util.inspect(json, false, null, true));

    world = Serializer.fromJson(json);
    var json2 = Serializer.toJson(world);

    var text2 = JSON.stringify(json, null, ' ');

    expect(json).to.deep.equal(json2);
    expect(text.split('\n')).to.deep.equal(text2.split('\n'));
  });
});
