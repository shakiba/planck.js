import { expect } from 'chai';

import Vec2 from '../common/Vec2';
import Circle from '../collision/shape/CircleShape';
import World from '../dynamics/World';

import '../collision/shape/CollideCircle';

describe('Basic', function(): void {

  it('World', function(): void {

    var world = new World();

    var circle = new Circle(1);

    var b1 = world.createBody({
      position : new Vec2(0, 0),
      type : 'dynamic'
    });

    b1.createFixture(circle);

    expect(b1.getFixtureList().getType()).equal('circle');
    expect(b1.getWorld()).equal(world);
    expect(world.getBodyList()).equal(b1);

    b1.applyForceToCenter(new Vec2(1, 0), true);

    var b2 = world.createBody({
      position : new Vec2(2, 0),
      type : 'dynamic'
    });
    b2.createFixture(circle);
    b2.applyForceToCenter(new Vec2(-1, 0), true);

    world.step(1 / 20);

    // console.log(b2.getPosition());

    var p = b1.getPosition();
    expect(p.x).closeTo(0.0, 1e-12);
    expect(p.y).closeTo(0.0, 1e-12);
  });

});
