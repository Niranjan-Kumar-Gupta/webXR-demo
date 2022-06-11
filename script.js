
//import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
           
// Canvas
const canvas = document.querySelector('canvas.webgl')
import { VRButton } from 'https://unpkg.com/three/examples/jsm/webxr/VRButton.js';
    
// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//preserveDrawingBuffer: true,
//renderer
// const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true, antialias: true,
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.autoClearColor = false;
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.xr.enabled = true;
let renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true,antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// Turn on VR support
console.log(renderer)
renderer.xr.enabled = true;
// Set animation loop
renderer.setAnimationLoop(animate);
// Add canvas to the page
document.body.appendChild(renderer.domElement);

document.body.appendChild(VRButton.createButton(renderer));
    




// Lights

let light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(light);


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Camera


// Make highly-transparent plane
var fadeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.04
});
var fadePlane = new THREE.PlaneBufferGeometry(1, 1);
var fadeMesh = new THREE.Mesh(fadePlane, fadeMaterial);

// Create Object3D to hold camera and transparent plane
var camGroup = new THREE.Object3D();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camGroup.add(camera);
camGroup.add(fadeMesh);


// Put plane in front of camera
fadeMesh.position.z = -0.1;

// Make plane render before particles
fadeMesh.renderOrder = -1;

// Add camGroup to scene
scene.add(camGroup)


//grid


var grid = new THREE.GridHelper(200, 25);
grid.position.set(0,-15,-30)
scene.add(grid);


let hue=0;

//rocket

class Rocket{
    constructor(s,x=0,y=-10,z=-30){
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = s//0.08;
        this.acc = new THREE.Vector3(0, 1, 0);
        this.acc.multiplyScalar(-1);
        this.velY= Math.random()*10+10;
        this.velYY= Math.random()*0.04-0.02;
        this.accY = -0.1
        this.velX = Math.random()*0.04-0.02
        this.velZ = Math.random()*0.04-0.02
        this.point1=null;
        this.alpha = Math.random()*4+1
        this.point()
      
    }
    point(){
        let gem = new THREE.SphereGeometry( this.size, 64, 26 )
        let color =  new THREE.Color(`hsl(${hue},100%,50%)`)
        this.mat =   new THREE.MeshStandardMaterial({color: color})
        this.mat.opacity = 1;
        this.mat.emissive = new THREE.Color(color)
        this.mat.emissiveIntensity =  1
        this.mat.metalness = 1;
        this.mat.roughness = 0;     
        this.point1 = new THREE.Mesh(gem,this.mat);  
      
 
        this.point1.position.set(this.x,this.y,this.z+this.size);   
        scene.add(this.point1)   
    }
    update(){
        this.alpha -= 0.03;
        this.velY += this.accY
        this.point1.position.y += this.velY*0.01
        this.point1.position.x += this.velX*2
        this.point1.position.z += this.velZ*2
    }
    updateFirework(){
       
        this.point1.position.y += this.velYY*5
        this.point1.position.x += this.velX*5
        this.point1.position.z += this.velZ*5
    }
    
}
//rocket-----------------------------

let __rocket = [];

for (let i = 0; i < 2; i++) { 
     
    __rocket.push( new Rocket(0.2,0,-10,-70))
}

let rocketParticle = [];

for (let j = 0; j < 150; j++) {
    rocketParticle.push(new Rocket(0.08))
 }

function handelRocket() {
      rocketParticle.forEach((object,index) => {
            object.updateFirework() 
            });

    __rocket.forEach((object,index) => {
        object.update()
       
        object.point1.material.color.setHSL(hue*2,1,0.7)
        object.point1.material.emissive.setHSL(hue*2,1,0.7)
        if (object.velY<0) {
            rocketParticle.forEach((object1,index) => {
              object1.point1.position.copy(object.point1.position);
              object1.point1.material.color.setHSL(hue*2,1,0.7)
              object1.point1.material.emissive.setHSL(hue*2,1,0.7)
              
            });
            object.accY = -0.1
            object.point1.position.set(Math.random()*60-30,-10,-50)
            object.velY = Math.random()*15+15
            object.velX = Math.random()*0.05-0.025
            object.velZ = Math.random()*0.04-0.02

        }
    });
    
}


//fuljhari-----------------------------

let full = [];

for (let i = 0; i < 4; i++) {
    let f = [];
    const geometryBase = new THREE.CylinderGeometry( 0.01, 0.5, 1, 32 );
    const materialBase = new THREE.MeshBasicMaterial( {color: 0xff1a10} );
    const cylinder = new THREE.Mesh( geometryBase, materialBase );
    cylinder.position.set(-35+i*22.5,-12,-40)
    scene.add( cylinder );
    
    for (let j = 0; j < 100; j++) {
        f.push(new Rocket(0.08,-35+i*22.5,-12,-40))
     }
     full.push(f)   
}


function handelFul() {

    for (let i = 0; i < full.length; i++) {
        full[i].forEach((object,index) => {
            object.update()
            object.point1.material.color.setHSL(hue,1,0.7)
            object.point1.material.emissive.setHSL(hue,1,0.7)
           
            if (object.alpha<0) {
                object.alpha = Math.random()*4+1;
                object.point1.position.set(-35+i*22.5,-12,-40)
                object.velY = Math.random()*10+12;
                object.velX = Math.random()*0.05-0.025
                object.velZ = Math.random()*0.04-0.02
                object.accY = -0.1
            }
        });
    }
  
  
}

//box------------------
let boxs=[];
let color1 =  new THREE.Color(`hsl(${hue},100%,70%)`)
for (let x = -5; x <= 5; x++) {
    for (let z = -2; z <= 6; z++) {
        
        let gem1 = new THREE.BoxGeometry(6,0.1,6);
       
        var mat1 = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading
          });
        mat1.opacity = 5;
        mat1.emissive = new THREE.Color(color1)
        mat1.emissiveIntensity =  1
        mat1.metalness = 1;
        mat1.roughness = 0;     
        let box = new THREE.Mesh(gem1,mat1);
        box.position.set(x*15,-15,-65+z*18);    
        scene.add(box)  
        boxs.push(box)   
        
    } 
}

//star------------------------

const vertices = [];

for ( let i = 0; i < 4000; i ++ ) {

    const x = THREE.MathUtils.randFloatSpread( 2000 );
    const y = THREE.MathUtils.randFloatSpread( 2000 );
    const z = THREE.MathUtils.randFloatSpread( 2000 );

    vertices.push( x, y, z );

}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

const material = new THREE.PointsMaterial( { color: 0xffffff } );

const points = new THREE.Points( geometry, material );

scene.add( points );

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(0,-4,-20)
scene.add(pointLight)

    

function animate(time){
    handelFul();
    handelRocket();
   
    if (hue>360) {
        hue = 0;
    }else{
        hue += 0.001
    }   
    renderer.render(scene, camera);
  
    boxs.forEach((object,index) => {
        let c = Math.random()*10+1
        object.material.color.setHSL(hue*c,1,0.7)
        object.material.emissive.setHSL(hue*c,1,0.7)
    });
  
    //camGroup.position.z -= 0.02
    
}
animate()