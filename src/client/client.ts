import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'
import { MixOperation, PointLightHelper } from 'three'



// adds gui controls to the window
const gui = new dat.GUI()

const scene = new THREE.Scene()
// scene.background = new THREE.Color( 0xff0000 );

// when spotlight not on model then model has no light
// when Directional light not on model then model has some light
const light = new THREE.SpotLight(0xffffff, 2.3, 2, 90 )

light.position.set(0,1,0);
// light.lookAt(0,0,0);
scene.add(light)
const pointLightHelper = new THREE.SpotLightHelper(light, 1)
// adds the light outines
// scene.add(pointLightHelper);

const light1 = gui.addFolder('Middle Light')
light1.add(light.position, 'x').min(-3).max(3).step(0.01)
light1.add(light.position, 'y').min(-10).max(10).step(0.01)
light1.add(light.position, 'z').min(-3).max(3).step(0.01)
light1.add(light, 'intensity').min(-5).max(5).step(0.01)





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

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {animate
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}




document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0
let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2

const clock = new THREE.Clock();


function render() {
    
    renderer.render(scene, camera)
}

function onDocumentMouseMove(event: MouseEvent) {
    if (event.clientX > window.innerWidth/2.7 && event.clientX < window.innerWidth / 1.57 && event.clientY > window.innerHeight/3.5 && event.clientY < window.innerHeight/1.2){
        mouseX = (event.clientX - windowHalfX) * 8
        // light.position.set(0, 1, 3)
        light.position.set(mouseX * 0.001, 1,2.3)
    }
    else{
        // light.position.set(0, 1, 0)
    }


}


function _LoadNerdModel(){
    const objs: { fbx: THREE.Group; mixer: THREE.AnimationMixer }[] = [];
    let mixer: THREE.AnimationMixer
const loader = new FBXLoader();
loader.load('resources/aj_Nerd.fbx', (fbx) => {
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
    objs.push({fbx, mixer});
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
        targetX = mouseX * .001
        targetY = mouseY * .001
        const elapsedTime = clock.getElapsedTime()
        fbx.rotation.y += 1.5 * (targetX - fbx.rotation.y)    
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

function _LoadNerdMode2(){
    const objs: { nerd2: THREE.Group; mixer: THREE.AnimationMixer }[] = [];
    let mixer: THREE.AnimationMixer
    const loader = new FBXLoader();
    loader.load('resources/aj_Nerd.fbx', (nerd2) => {
    nerd2.scale.set(.01, .01, .01)
    nerd2.position.set(-2.1 ,-0.5,1)

    nerd2.traverse(c => {
        c.castShadow = true;
    });

    let anim2 = new FBXLoader();
    anim2.load('resources/Zombie_Idle.fbx', (anim2) => {
        mixer = new THREE.AnimationMixer(nerd2);
        mixer.update
        let idle = mixer.clipAction(anim2.animations[0]).play();
        idle.play();
    });
    objs.push({nerd2, mixer});
    scene.add(nerd2);
   

    const model1 = gui.addFolder('Left Model')
    model1.add(nerd2.position, 'x').min(-3).max(3).step(0.01)
    model1.add(nerd2.position, 'y').min(-3).max(3).step(0.01)
    model1.add(nerd2.position, 'z').min(-3).max(3).step(0.01)
    var prevTime = Date.now()
   
    function animate2() {
        requestAnimationFrame(animate2)
        
        if (mixer){
            var time = Date.now()
            mixer.update((time - prevTime) * 0.001)
            prevTime = time;
        }   
        targetX = -mouseX * .001
        targetY = mouseY * .001
        const elapsedTime = clock.getElapsedTime()
    
        nerd2.rotation.y = -261
        nerd2.rotation.y += 1.5 * (targetX - nerd2.rotation.y)
    
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

function _LoadNerdMode3(){
    const objs: { nerd3: THREE.Group; mixer: THREE.AnimationMixer }[] = [];
    let mixer: THREE.AnimationMixer
    const loader = new FBXLoader();
    loader.load('resources/aj_Nerd.fbx', (nerd3) => {
    nerd3.scale.set(.01, .01, .01)
    nerd3.position.set(2.1 ,-0.5,1)
    nerd3.traverse(c => {
        c.castShadow = true;
    });

    let anim2 = new FBXLoader();
    anim2.load('resources/Zombie_Idle.fbx', (anim2) => {
        mixer = new THREE.AnimationMixer(nerd3);
        mixer.update
        let idle = mixer.clipAction(anim2.animations[0]).play();
        idle.play();
    });
    objs.push({nerd3, mixer});
    scene.add(nerd3);
   

    const model1 = gui.addFolder('Right Model')
    model1.add(nerd3.position, 'x').min(-3).max(3).step(0.01)
    model1.add(nerd3.position, 'y').min(-3).max(3).step(0.01)
    model1.add(nerd3.position, 'z').min(-3).max(3).step(0.01)
    var prevTime = Date.now()
   
    function animate2() {
        requestAnimationFrame(animate2)
        
        if (mixer){
            var time = Date.now()
            mixer.update((time - prevTime) * 0.001)
            prevTime = time;
        }   
        targetX = -mouseX * .001
        targetY = mouseY * .001
        const elapsedTime = clock.getElapsedTime()
    
        nerd3.rotation.y = 261
        nerd3.rotation.y += 1.5 * (targetX - nerd3.rotation.y)
    
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


function _LoadLightMode3(){
    const objs: { lightModel: THREE.Group; mixer: THREE.AnimationMixer }[] = [];
    let mixer: THREE.AnimationMixer
    const loader = new FBXLoader();
    loader.load('resources/Light1.fbx', (lightModel) => {
    lightModel.scale.set(.01, .01, .01)
    lightModel.position.set(0 ,0,1)
    lightModel.traverse(c => {
        c.castShadow = true;
    });

    
    objs.push({lightModel, mixer});
    scene.add(lightModel);
   

    const model1 = gui.addFolder('Light Model')
    model1.add(lightModel.position, 'x').min(-3).max(3).step(0.01)
    model1.add(lightModel.position, 'y').min(-3).max(3).step(0.01)
    model1.add(lightModel.position, 'z').min(-3).max(3).step(0.01)
    var prevTime = Date.now()
   
    function animate2() {
        requestAnimationFrame(animate2)

        targetX = mouseX * .0015
        lightModel.position.x = targetX
    
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


function animate() {

    _LoadNerdModel()    
    _LoadNerdMode2()
    _LoadNerdMode3()
    _LoadLightMode3()

}

animate()