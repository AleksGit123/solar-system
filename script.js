"use strict"
const stars = "./planets/stars.jpg"

/*---------------- render create---------------------*/ 
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

/*---------------- scene create---------------------*/ 

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);


/*---------------- camera create---------------------*/ 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


/*---------------- orbit create---------------------*/ 
const orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.dampingFactor = 0.5; 
orbit.enableDamping = true;
camera.position.set(-10,30,30);
orbit.update();

/*---------------- background create---------------------*/ 

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    stars, 
    stars, 
    stars, 
    stars, 
    stars, 
    stars
])

const textureLoader = new THREE.TextureLoader();


/*---------------- sun create---------------------*/
const sunGeometry = new THREE.SphereGeometry(16,30,30)
const sunMaterial = new THREE.MeshBasicMaterial({
    map : textureLoader.load("./planets/sun.jpg"),
    
})

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);


// create planet function
function createaPlanets(size,texture,position,ring){

    const geo = new THREE.SphereGeometry(size,30,30)
    const mat = new THREE.MeshStandardMaterial({
        map : textureLoader.load(texture),
        
    })
    
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE .Object3D();

    if(ring){
            
        const ringGeo = new THREE.RingGeometry(ring.innerRadius,ring.outerRarius,32)
        const ringMat = new THREE.MeshBasicMaterial({
            map : textureLoader.load(ring.texture),
            side:THREE.DoubleSide
        })

        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        // scene.add(mercury);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI; 
    }


    obj.add(mesh);
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj};
}


/*---------------- mercury create---------------------*/
const mercury = createaPlanets(3.2,"./planets/mercury.jpg",25);

/*---------------- saturn and ring  create---------------------*/ 
const saturn = createaPlanets(10,"./planets/saturn.jpg",138,{
    innerRadius: 10,
    outerRarius: 20,
    texture: "./planets/saturnring.png",
});

/*---------------- venus create---------------------*/ 
const venus = createaPlanets(5.8,"./planets/venus.jpg",44);

/*---------------- earth create---------------------*/ 
const earth = createaPlanets(6,"./planets/earth.jpg",62);

/*---------------- mars create---------------------*/ 
const mars = createaPlanets(4,"./planets/mars.jpg",78);

/*---------------- jupiter create---------------------*/ 
const jupiter = createaPlanets(12,"./planets/jupiter.jpg",100);

/*---------------- uranus create---------------------*/ 
const uranus = createaPlanets(7,"./planets/uranus.jpg",176,{
    innerRadius: 7,
    outerRarius: 12,
    texture: "./planets/uranusring.png",
});

/*---------------- neptune create---------------------*/ 
const neptune = createaPlanets(7,"./planets/neptune.jpg",200);

/*---------------- pluto create---------------------*/ 
const pluto = createaPlanets(2,"./planets/pluto.jpg",220);

/* ---------------- pointLight create---------------------*/ 


const pointLight = new THREE.PointLight(0xffffff, 2,300);
scene.add(pointLight)

/*---------------- animate ---------------------*/ 

function animate() {
    // Sun
    sun.rotateY(0.004);
    
    // mercury
    mercury.mesh.rotateY(0.004);
    mercury.obj.rotateY(0.04);
    
    // saturn
    saturn.mesh.rotateY(0.038);
    saturn.obj.rotateY(0.0009);

    // venus
    venus.mesh.rotateY(0.002);
    venus.obj.rotateY(0.015);

    // earth
    earth.mesh.rotateY(0.02);
    earth.obj.rotateY(0.01);

    // mars
    mars.mesh.rotateY(0.018);
    mars.obj.rotateY(0.008);

    // jupiter
    jupiter.mesh.rotateY(0.04);
    jupiter.obj.rotateY(0.002);

    // uranus
    uranus.mesh.rotateY(0.03);
    uranus.obj.rotateY(0.004);

    // neptune
    neptune.mesh.rotateY(0.032);
    neptune.obj.rotateY(0.0001);

    // pluto
    pluto.mesh.rotateY(0.08);
    pluto.obj.rotateY(0.00007);

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);


/*---------------- flexible screen ---------------------*/ 

window.addEventListener('resize', function() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});