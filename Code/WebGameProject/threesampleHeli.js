import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const directionLight = new THREE.directionLight( 0xffffff, 0.5);
scene.add (directionLight);

const geometry = new THREE.CapsuleGemetry(1, 1, 4, 8);
const material = new THREE.MeshLambertMaterial( { color: 0xff9547, wireframe : true });
const cube = new THREE.Mesh( geometry, material );


const addPlane = (x,y,w,h, materialaspect) => {
   
    //add a plan
const geometry7 = new THREE.PlaneGemetry(w,h,2);
const material7 = new THREE.MeshLambertMaterial( materialaspect);

const plane = new THREE.Mesh( geometry7, material7 );

plane.position.x = x;
plane.position.y = y;
plane.position.x = -Math.PI/2;
scene.add(plane);

}

const texture = new THREE.TextureLoader().load("resources/img/galaxy.jpg");
const materialAspectfloor = {
	map:texture,
	side: THREE.DoubleSide,
	transparent:true
}
addPlane(0, -3.6, 30, 30, materialAspectfloor);


function animate() {

	

	renderer.render( scene, camera );

}