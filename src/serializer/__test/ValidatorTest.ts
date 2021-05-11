import { expect } from 'chai';

// @ts-ignore
import Ajv from 'ajv';

import Vec2 from '../../common/Vec2';
import Circle from '../../collision/shape/CircleShape';
import Box from '../../collision/shape/BoxShape';
import DistanceJoint from '../../dynamics/joint/DistanceJoint';
import World from '../../dynamics/World';

import Serializer from '../';
const schema = require('../schema.json');

describe('Serializer', function(): void {
  var ajv = new Ajv();
  var validate = ajv.compile(schema);

  it('produces valid schema', function(): void {
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

    // console.log(JSON.stringify(json, null, ' '));

    var valid = validate(json);
    console.log(valid || validate.errors);
    expect(valid).be.true;
  });
});
