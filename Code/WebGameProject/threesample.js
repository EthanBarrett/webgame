import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

//head
const geometry = new THREE.SphereGeometry( 5, 15, 6 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const Head = new THREE.Mesh( geometry, material ); 
Head.position.y = 4.8;
//body
const geometry1 = new THREE.CapsuleGeometry( 4, 4, 16, 32 ); 
const material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
const Body = new THREE.Mesh( geometry1, material1 );
Body.position.y = -5;
//rightarm
const geometry2 = new THREE.BoxGeometry( 3, 7, 2.5 ); 
const material2 = new THREE.MeshBasicMaterial( {color: 0x00fff0} ); 
const RightArm = new THREE.Mesh( geometry2, material2 ); 
RightArm.position.x = 6;
RightArm.position.y = -4;
RightArm.rotation.z = 0.5;
//leftarm
const geometry3 = new THREE.BoxGeometry( 3, 7, 2.5 ); 
const material3 = new THREE.MeshBasicMaterial( {color: 0x00fff0} ); 
const LeftArm = new THREE.Mesh( geometry3, material3 ); 
LeftArm.position.x = -6;
LeftArm.position.y = -4;
LeftArm.rotation.z = -0.5;
//Legs
const geometry4 = new THREE.ConeGeometry( 6, 15, 32 ); 
const material4 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const Legs = new THREE.Mesh(geometry4, material4 ); 
Legs.position.y = -4

//add to scene
scene.add( Legs );
scene.add(LeftArm);
scene.add( RightArm );
scene.add( Body );
scene.add( Head );


//group togethere
let group = new THREE.Group();
group.add(Head);
group.add(Body);
group.add(RightArm);
group.add(LeftArm);
group.add(Legs);
scene.add(group);


//change camera position
camera.position.z = 25;

//animate
function animate() {

	Head.rotation.x += 0.01;
	group.rotation.y += 0.01;
	RightArm.rotation.y =0;

	renderer.render( scene, camera );

}