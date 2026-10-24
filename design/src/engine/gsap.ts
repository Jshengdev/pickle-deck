/** The motion engine, registered once. Every recipe imports gsap and plugins from here, never from 'gsap' directly,
    so plugins and the named eases are always ready. */
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Flip } from 'gsap/Flip'
import { CustomEase } from 'gsap/CustomEase'
import { CustomBounce } from 'gsap/CustomBounce'
import { CustomWiggle } from 'gsap/CustomWiggle'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, Flip, CustomEase,
  CustomBounce, CustomWiggle, Physics2DPlugin, InertiaPlugin)

// Named eases from the motion tokens. Anticipation: 'route' pulls back a hair before it goes.
CustomEase.create('route', 'M0,0 C0.16,-0.10 0.30,0.02 0.44,0.36 0.60,0.76 0.80,1 1,1')
CustomBounce.create('land', { strength: 0.22, squash: 1.1, squashID: 'land-squash' })
CustomBounce.create('press', { strength: 0.5, squash: 2, squashID: 'press-squash' })
CustomWiggle.create('unsure', { wiggles: 8, type: 'uniform' })

export { gsap, useGSAP, SplitText, ScrambleTextPlugin, DrawSVGPlugin, MorphSVGPlugin, MotionPathPlugin, Flip, CustomEase,
  CustomBounce, CustomWiggle, Physics2DPlugin, InertiaPlugin }
