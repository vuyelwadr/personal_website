import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import { MixOperation, PointLightHelper } from 'three'

const gui = new dat.GUI()

const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0xff0000 );

// const light = new THREE.DirectionalLight()
// var light_1 = 0
// light.position.set(0, 1, light_1)
// scene.add(light)

// when spotlight not on model then model has no light
// when Directional light not on model then model has some light
const light = new THREE.SpotLight(0xffffff, 2.3, 2, 90 )

light.position.set(0,1,0);
// light.lookAt(0,0,0);
scene.add(light)
const pointLightHelper = new THREE.SpotLightHelper(light, 1)
scene.add(pointLightHelper);

const light1 = gui.addFolder('Middle Light')
light1.add(light.position, 'x').min(-3).max(3).step(0.01)
light1.add(light.position, 'y').min(-10).max(10).step(0.01)
light1.add(light.position, 'z').min(-3).max(3).step(0.01)
light1.add(light, 'intensity').min(-5).max(5).step(0.01)
// gui.add(light, 'intensity').min(-3).max(3).step(0.01)




const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 4
// camera.position.set(0.8, 1.4, 1.0)

// alpha transparrency buffer
const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight )
renderer.setClearColor( 0xffffff, 0)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const material2 = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: false,
})

const cube = new THREE.Mesh(geometry, material)
const solidCube = new THREE.Mesh(geometry, material2)
const solidCube2 = new THREE.Mesh(geometry, material2)


document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove(event: MouseEvent) {
    if (event.clientX > window.innerWidth/2.7 && event.clientX < window.innerWidth / 1.5 && event.clientY > window.innerHeight/3.5 && event.clientY < window.innerHeight/1.2){
        mouseX = (event.clientX - windowHalfX) * 8
        // light.position.set(0, 1, 3)
        light.position.set(mouseX * 0.001, 1,2.3)
        // scene.add(light)
    }
    else{
        // light.position.set(0, 1, 0)
    }

    
    // console.log("innerHeight" + window.innerWidth)
    // console.log(event.clientX)
    // mouseY = event.clientY - windowHalfY
    // mouseY = 0;
    // console.log(mouseY)
}

const clock = new THREE.Clock();



// scene.add(cube)
// // cube.position.set(100,100,100)
// scene.add(solidCube)
// solidCube.position.set(1.7,0,0)

// scene.add(solidCube2)
// solidCube2.position.set(-1.7,0,0)

function _LoadAnimatedModel(){
    const objs: { fbx: THREE.Group; mixer: THREE.AnimationMixer }[] = [];
    let mixer: THREE.AnimationMixer
const loader = new FBXLoader();
// loader.setPath('/resources/')
loader.load('resources/aj_Nerd.fbx', (fbx) => {
    // fbx.scale.setScalar(0.01);
    fbx.scale.set(.01, .01, .01)
    fbx.position.set(0,-0.5,1)
    fbx.traverse(c => {
        c.castShadow = true;
    });

    let anim = new FBXLoader();
    anim.load('resources/Zombie_Idle.fbx', (anim) => {
        mixer = new THREE.AnimationMixer(fbx);
        // mixer.push(mixer)
        mixer.update
        let idle = mixer.clipAction(anim.animations[0]).play();
        idle.play();
    });
    // objs.push({fbx, mixer});
    scene.add(fbx);
   

    const model1 = gui.addFolder('Middle Model')
    model1.add(fbx.position, 'x').min(-3).max(3).step(0.01)
    model1.add(fbx.position, 'y').min(-3).max(3).step(0.01)
    model1.add(fbx.position, 'z').min(-3).max(3).step(0.01)
    var prevTime = Date.now()
    function animate2() {
        requestAnimationFrame(animate2)
        
        if (mixer){
            var time = Date.now()
            mixer.update((time - prevTime) * 0.001)
            prevTime = time;
        }   
        // objs.forEach(({mixer}) => {mixer.update(clock.getDelta());});   
        targetX = mouseX * .001
        targetY = mouseY * .001
        const elapsedTime = clock.getElapsedTime()
        // console.log(elapsedTime
    
        // fbx.rotation.y = 0.25 )* elapsedTime
        fbx.rotation.y += 1.5 * (targetX - fbx.rotation.y)
        // fbx.rotation.x = 0.25 * (targetY - fbx.rotation.y)
        // console.log(fbx.rotation.y)
    
        render()
    }
    animate2()
},

(xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
},
(error) => {
    console.log(error)
}
)
}

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {animate
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)

    render()
}


function animate() {
    requestAnimationFrame(animate)

    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()

    // fbx.rotation.y += 0.001

    // cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // solidCube.rotation.x += 0.01
    solidCube.rotation.y += -0.01

    // solidCube2.rotation.x += 0.01
    solidCube2.rotation.y += -0.01

    // fbx.rotation.y += -0.01

    render()
}

function render() {
    
    renderer.render(scene, camera)
}
    


// function loadModel(){
//     const loader = new GLTFLoader();
//     loader.load('aj_Nerd.fbx', (gltf) => {
//         gltf.scene.traverse(c => {c.castShadow = true;})
//     });
// }


// animate()


// render()
_LoadAnimatedModel()