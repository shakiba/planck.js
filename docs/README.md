[Planck.js API Doc](README.md) › [Globals](globals.md)

# Planck.js API Doc

### Tutorial
A physics simulation in Planck starts by creating a World and adding Bodies and Joints.
A world is composed of a number of bodies and joints interacting with each other. Every time world’s step() function is called, world solver will advance world time and update bodies position and velocity based on velocities, forces, contacts (collisions), and joints constraints. It also detects any contact between objects and updates them if required.
Let’s create a world:

```js
var world = planck.World();
```

This will create a world with default options. You can pass a definition object as first argument to World constructor, for example:

```js
var world = planck.World({
  gravity: planck.Vec2(0, -10)
});
```

If the parameter is a `planck.Vec2` type object, it will be interpreted as a value for gravity option:

```js
var world = planck.World(planck.Vec2(0, -10));
```

Bodies are directly created and added to world.
Each body is composed of a number of fixtures which are fixed together, that is a body is a set of shapes with physical properties.
Bodies have position, angle, linear velocity, angular velocity, etc. which can be changed by applying linear and angular forces or impulses.
Bodies represent rigid objects in the world, such as ground, a box or a car.
Here is an example:
```js
var ground = world.createBody();
```

This will create a body with default options, which means a ‘static’ body at position 0, 0 with no velocity. You can pass a body definition object to change it:

```js
var ground = world.createBody({
  type: 'static',
  position: planck.Vec2(2, 5),
});
```

A shape contains geometrical information and is used in collision detections.
A fixture consists of a shape and physical properties such as density.
After creating a body, you can create and add fixtures and shapes:

```js
ground.createFixture({
  shape: planck.Edge(planck.Vec2(-40.0, 0.0), planck.Vec2(40.0, 0.0))
});
```

Joints are constraints on bodies position or velocity.

### API Doc

#### Core

* [World](/docs/classes/world.md)
* [Body](/docs/classes/body.md)
* [Fixture](/docs/classes/fixture.md)
* [Settings](/docs/classes/settings.md)

#### Shapes

* [BoxShape](/docs/classes/boxshape.md)
* [ChainShape](/docs/classes/chainshape.md)
* [CircleShape](/docs/classes/circleshape.md)
* [EdgeShape](/docs/classes/edgeshape.md)
* [PolygonShape](/docs/classes/polygonshape.md)

#### Joints

* [FrictionJoint](/docs/classes/frictionjoint.md)
* [DistanceJoint](/docs/classes/distancejoint.md)
* [GearJoint](/docs/classes/gearjoint.md)
* [MotorJoint](/docs/classes/motorjoint.md)
* [MouseJoint](/docs/classes/mousejoint.md)
* [PrismaticJoint](/docs/classes/prismaticjoint.md)
* [PulleyJoint](/docs/classes/pulleyjoint.md)
* [RevoluteJoint](/docs/classes/revolutejoint.md)
* [RopeJoint](/docs/classes/ropejoint.md)
* [WeldJoint](/docs/classes/weldjoint.md)
* [WheelJoint](/docs/classes/wheeljoint.md)

#### Math

* [Math](/docs/classes/math.md)
* [Vec2](/docs/classes/vec2.md)
* [Vec3](/docs/classes/vec3.md)
* [Transform](/docs/classes/transform.md)
* [Rot](/docs/classes/rot.md)
* [Mat22](/docs/classes/mat22.md)
* [Mat33](/docs/classes/mat33.md)

#### Internal

* [Solver](/docs/classes/solver.md)
* [Contact](/docs/classes/contact.md)
* [ContactEdge](/docs/classes/contactedge.md)
* [BroadPhase](/docs/classes/broadphase.md)
* [AABB](/docs/classes/aabb.md)
* [DynamicTree](/docs/classes/dynamictree.md)
* [TreeNode](/docs/classes/treenode.md)
* [ContactImpulse](/docs/classes/contactimpulse.md)
* [DistanceProxy](/docs/classes/distanceproxy.md)
* [ContactFeatureType](/docs/enums/contactfeaturetype.md)
* [ManifoldType](/docs/enums/manifoldtype.md)
* [TOIOutputState](/docs/enums/toioutputstate.md)
* [ContactFeature](/docs/interfaces/contactfeature.md)
* [ContactID](/docs/interfaces/contactid.md)
* [FixtureProxy](/docs/interfaces/fixtureproxy.md)
* [Manifold](/docs/interfaces/manifold.md)
* [ManifoldPoint](/docs/interfaces/manifoldpoint.md)
* [WorldManifold](/docs/interfaces/worldmanifold.md)
* [Position](/docs/classes/position.md)
* [Velocity](/docs/classes/velocity.md)
* [Sweep](/docs/classes/sweep.md)
* [VelocityConstraintPoint](/docs/classes/velocityconstraintpoint.md)
