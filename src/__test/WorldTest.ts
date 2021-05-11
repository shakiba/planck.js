import { expect } from 'chai';;

import Vec2 from '../common/Vec2';
import World from '../dynamics/World';
import Box from '../collision/shape/BoxShape';

// registers Box-Box collision
import '../collision/shape/CollidePolygon';

describe('World', function(): void {

  // This is the Box2D HelloWorld unit test translated to planck.js
  it('simulates gravity', function(): void {
    // Define the gravity vector.
    var gravity = new Vec2(0.0, -10.0);

    // Construct a world object, which will hold and simulate the rigid bodies.
    var world = new World(gravity);

    // Call the body factory.
    // The body is also added to the world.
    var groundBody = world.createBody({
      position: new Vec2(0.0, -10.0)
    });

    // The extents are the half-widths of the box.
    var groundBox = new Box(50.0, 10.0);
    // Add the ground fixture to the ground body.
    groundBody.createFixture(groundBox, 0.0);

    // Define the dynamic body. We set its position and call the body factory.
    var body = world.createBody({
      position: new Vec2(0.0, 4.0),
      type: 'dynamic'
    });

    // Define another box shape for our dynamic body.
    var dynamicBox = new Box(1.0, 1.0);
    // Add the shape to the body.
    body.createFixture(dynamicBox, {
      // Set the box density to be non-zero, so it will be dynamic.
      density: 1.0,
      // Override the default friction.
      friction: 0.3
    });

    // Prepare for simulation. Typically we use a time step of 1/60 of a
    // second (60Hz) and 10 iterations. This provides a high quality simulation
    // in most game scenarios.
    var timeStep = 1.0 / 60;
    var velocityIterations = 6;
    var positionIterations = 2;

    var position = body.getPosition();
    var angle = body.getAngle();

    // This is our little game loop.
    for (var i = 0; i < 60; ++i) {
      // Instruct the world to perform a single step of simulation.
      // It is generally best to keep the time step and iterations fixed.
      world.step(timeStep, velocityIterations, positionIterations);

      // Now print the position and angle of the body.
      position = body.getPosition();
      angle = body.getAngle();

      // console.log("%s %s %s", position.x.toFixed(4), position.y.toFixed(4), angle.toFixed(4));
    }

    expect(position.x).closeTo(0.0, 1e-5);
    expect(position.y).closeTo(1.015, 5e-5);
    expect(angle).closeTo(0.0, 1e-5);
  });

});
