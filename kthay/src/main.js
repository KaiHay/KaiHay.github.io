import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import imagep from '/public/gram.jpg';
//CAMERA AND SCENE
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,50);
camera.lookAt(0,0,0);

//LIGHT


const pointLight=new THREE.PointLight(0xff0000, 500);
pointLight.position.set(5,1,10);
pointLight.distance=100;
const pointLight2=new THREE.PointLight(0xffff00, 100);
pointLight2.position.set(-5,1,10);
pointLight2.distance=100;
const pointLight3=new THREE.PointLight(0xff00ff, 1000);
pointLight3.position.set(0,1,10);
pointLight3.distance=100;

const ambientLight=new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight, pointLight2, pointLight3);

const lightHelper=new THREE.PointLightHelper(pointLight);
const lightHelper2=new THREE.PointLightHelper(pointLight2);
const lightHelper3=new THREE.PointLightHelper(pointLight3);
scene.add(lightHelper, lightHelper2, lightHelper3);

//background
const loader= new THREE.TextureLoader();
loader.load(imagep, function(texture){
texture.mapping=THREE.EquirectangularReflectionMapping;
scene.background=texture;
scene.environment=texture;
});

//RENDER

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//CAMERA CONTROL

const controls=new OrbitControls(camera, renderer.domElement);
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 512;  // Adjust as needed
canvas.height = 512; // Adjust as needed
context.fillStyle='white';
context.fillRect(0,0, canvas.width, canvas.height);

// Style your text
context.font = '48px serif';
context.textAlign = 'center';
context.fillStyle = 'blue';
context.fillText('SPINNING BOX', canvas.width / 2, canvas.height / 2);
const tente = new THREE.CanvasTexture(canvas);

//CUBE
const cc=new THREE.Group();
const geometryCube = new THREE.BoxGeometry( 10, 10, 10 );
const materialCube = new THREE.MeshPhysicalMaterial( { color: 0xffffff, metalness:1, roughness:.2 } );
const materialCubes=[ materialCube, materialCube,materialCube,materialCube,new THREE.MeshPhysicalMaterial({map: tente, metalness:1, roughness:.2, color: 0xffffff}),materialCube];
const cube = new THREE.Mesh( geometryCube, materialCubes );
cc.add( cube );

//Cylinder

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 5, 32);
const cylinderMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff, metalness:1, roughness:.2 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cc.add(cylinder);
// Position the cylinder on top of the square
cylinder.position.set(0,7, 0); // Adjust 0.05 if there's a gap or overlap

const cylinder1Geometry = new THREE.CylinderGeometry(.5, 4, 40, 32, 1, false, 90);
const cylinder1Material = new THREE.MeshPhysicalMaterial({color: 0xffffff, metalness:1, roughness:.2 });
const cylinder1 = new THREE.Mesh(cylinder1Geometry, cylinder1Material);
cc.add(cylinder1);
// Position the cylinder on top of the square
cylinder1.position.set(1,10,0 );
cylinder1.rotation.z=Math.PI/2;
scene.add(cc);
//LINE
//const materialLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );
//const points=[];
//points.push( new THREE.Vector3( - 10, 0, 0 ) );
//points.push( new THREE.Vector3( 0, 10, 0 ) );
//points.push( new THREE.Vector3( 10, 0, 0 ) );

//const geometryLine = new THREE.BufferGeometry().setFromPoints( points );
//const line = new THREE.Line( geometryLine, materialLine );
//scene.add(line);

//camera.position.z = 5;

//Add Star referenced from Code from youtube video about three.js by Fireship

//function addS(){
//const geo= new THREE.SphereGeometry(.25, 24, 24);
//const mat= new THREE.MeshStandardMaterial({color: 0xffffff});
//const star= new THREE.Mesh(geo, mat);

//const [x,y,z]= Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(50));
//star.position.set(x,y,z);
//scene.add(star);
//}
//Array(200).fill().forEach(addS);
const geo=new THREE.SphereGeometry(1,24,24);
const mat= new THREE.MeshStandardMaterial({color: 0xffffff});
const star= new THREE.Mesh(geo, mat);
star.position.set(10,10,10);
scene.add(star);

let t=0;
function animate() {
	requestAnimationFrame( animate );
	cc.rotation.x += 0.01;
    cc.rotation.y += 0.01;
	pointLight.position.x=20*Math.cos(t);
	pointLight.position.y=10*Math.sin(t);
	pointLight3.position.x=10*Math.sin(t);
	cylinder1.rotation.y=10*(Math.sin(t));
	//0.2*(Math.PI/(Math.sin(t)*2));
	t+=.01;
    //cylinder.rotation.y += 0.01;
    //cylinder.rotation.x += 0.01;
  //  line.rotation.x+=.01;
	//line.rotation.y+=.01;
	controls.update();
	renderer.render( scene, camera );
}
animate();
