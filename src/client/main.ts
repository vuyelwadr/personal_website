import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import { MixOperation, PointLightHelper } from 'three'

const gui = new dat.GUI()

const scene = new THREE.Scene()

const light = new THREE.SpotLight(0xffffff, 2.3, 2, 90 )

light.position.set(0,1,0);
scene.add(light)