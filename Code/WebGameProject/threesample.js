import * as THREE from "three";

import { OrbitControls } from 'https://unpkg.com/three@0.157.0/examples/jsm/controls/OrbitControls.js';

import {GLTFLoader} from "https://unpkg.com/three@0.169.0/examples/jsm/loaders/GLTFLoader.js";



let controls; //declare control parameter

//animation mixer
let mixer;

//add control variables
let upstate = false; //button up
let downstate = false; //button down
let changed = false; //colour change

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );


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


//pillar tower
const geometry5 = new THREE.CylinderGeometry( 15, 15, 60, 96 ); 
const material5 = new THREE.MeshBasicMaterial( {color: 0xff0000} ); 
const tower = new THREE.Mesh( geometry5, material5 ); 
tower.position.x = 34;
tower.position.y = 10;
tower.position.z = -34;

scene.add( tower );


//floor
const geometry6 = new THREE.PlaneGeometry( 200, 100 );
const material6 = new THREE.MeshBasicMaterial( {color: 336699, side: THREE.DoubleSide} );
const floor = new THREE.Mesh( geometry6, material6 );
floor.rotation.x = 1.6;
floor.position.y = -16;
scene.add( floor );

//////////////////////////////////////////////////////////////////
//change camera position
camera.position.z = 50;


const addPlane = (x,y,w,h, materialaspect) => {
   
    //add a plan
const geometry7 = new THREE.PlaneGeometry(w,h,2);
const material7 = new THREE.MeshLambertMaterial( materialaspect);

const plane = new THREE.Mesh( geometry7, material7 );

plane.position.x = x;
plane.position.y = -15;
plane.position.x = -Math.PI/2;
plane.rotation.x = 1.6;
scene.add(plane);

}
//texture of plane
const texture = new THREE.TextureLoader().load("resources/img/goldpattern.png");
const materialAspectfloor = {
	map:texture,
	side: THREE.DoubleSide,
	transparent:true
}
addPlane(0, -3.6, 60, 60, materialAspectfloor);

//////////////////////////////////////////////////


// a function that will be called every time the window gets resized.
// It can get called a lot, so don't put any heavy computation in here!
const onWindowResize = () => {
 
    // set the aspect ratio to match the new browser window aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
 
    // update the camera's frustum
    camera.updateProjectionMatrix();
 
    // update the size of the renderer AND the canvas
    renderer.setSize(window.innerWidth, window.innerHeight);
 
}
 
window.addEventListener('resize', onWindowResize);
/////////////////////////////////////////////////////////////////////

//skybox function

const createskybox = ()=>{
	let bgMesh;
	const loader = new THREE.TextureLoader();
	loader.load("resources/img/galaxy.jpg", function(texture){
		const sphereGeometry = new THREE.SphereGeometry(1000, 60, 40);
		const sphereMaterial = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide
		})

		bgMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
		scene.add(bgMesh);

	})
	
}

createskybox();
//////////////////////////////////////////////////////////////

const createControls =()=>{
	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();

}

createControls();
/////////////////////////////////////////////////////////////
const moveup = ()=>
{
	upstate = true;
	downstate = false;
}

const movedown = ()=>
	{
		upstate = false;
		downstate = true;
	}

document.getElementById("upbutton").addEventListener("click", moveup);
document.getElementById("downbutton").addEventListener("click", movedown);



//animate
function animate() {

	Head.rotation.x += 0.01;
	
	if(upstate)
	{
		group.position.z -=0.05;
		
	} 
	else if (downstate)
	{
		group.position.y -= 0.05;
	}

	if (group.position.y > 3)
	{
		
		upstate = false;
	}

	if (group.position.y < -3)
	{
		
		downstate = false;
	}

	renderer.render( scene, camera );

}