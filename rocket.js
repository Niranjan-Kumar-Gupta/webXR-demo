import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

class Rocket{
    constructor(x=0,y=0,z=0){
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = Math.random()*5+10
        this.point();
    }
    point(){
        let gem = new THREE.SphereGeometry( this.size, 64, 26 )
        let color =  new THREE.Color(`hsl(${50},100%,50%)`)
        let mat =   new THREE.MeshStandardMaterial({color:color})
        mat.transparent = true;
        mat.opacity = 1;
        mat.emissive = new THREE.Color(color)
        mat.emissiveIntensity =  1
        mat.metalness = 1;
        mat.roughness = 0;     
        let point = new THREE.Mesh(gem,mat);   
        point.position.set(this.x,this.y,this.z+this.size);   
       // scene1.add(point)   
    }
}