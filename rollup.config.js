import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import license from 'rollup-plugin-license';
import replace from '@rollup/plugin-replace';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-ts';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import declarationTransformer from './declarationTransformer';

import licenseBanner from './license';

const functionClasses = [
  'Vec2', 'Vec3', 'Rot', 'Transform', 'AABB', 'World', 'BoxShape', 'CircleShape',
  'ChainShape', 'EdgeShape', 'PolygonShape', 'DistanceJoint', 'FrictionJoint', 'GearJoint', 'MotorJoint',
  'MouseJoint', 'PrismaticJoint', 'PulleyJoint', 'RevoluteJoint', 'RopeJoint', 'WeldJoint', 'WheelJoint'
];

export const configFactory = options => {
  const config = {
    input: options.src,
    output: {
      name: 'planck',
      file: options.dest,
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'DEBUG': JSON.stringify(false),
          'ASSERT': JSON.stringify(false),
        },
      }),
      nodeResolve(),
      commonjs({
        include: ['node_modules/stage-js/**']
      }),
      typescript({
        tsconfig: resolvedConfig => ({
          ...resolvedConfig,
          declaration: options.declaration
        }),
        transformers: {
          afterDeclarations: [
            declarationTransformer({
              classes: functionClasses
            })
          ]
        },
      }),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      }),
      license({
        banner: licenseBanner,
      }),
      {...(options.minimize ? terser({
          format: {
            comments: false,
          }
        }) : null)},
      filesize(),
    ]
  };
  return config;
};

export default [
  {
    src: 'src/index.ts',
    dest: 'dist/planck.js',
    minimize: false,
    declaration: true,
  },
  {
    src: 'src/index.ts',
    dest: 'dist/planck.min.js',
    minimize: true,
    declaration: false,
  },
  {
    src: 'testbed/index.ts',
    dest: 'dist/planck-with-testbed.js',
    minimize: false,
    declaration: true,
  },
  {
    src: 'testbed/index.ts',
    dest: 'dist/planck-with-testbed.min.js',
    minimize: true,
    declaration: false,
  }
].map(configFactory);
