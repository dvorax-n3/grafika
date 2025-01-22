import * as THREE from 'three'
import { FlyControls } from 'three/addons/controls/FlyControls.js';







const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание геометрии и материала для объектов

camera.position.set(0,0,5);

const texture_floor = new THREE.TextureLoader().load('img/Floor.jpg');
texture_floor.repeat.set( 3,5); // powtarzanie tekstury 
texture_floor.wrapS = THREE.RepeatWrapping; // rysowanie tekstury od poczatku
texture_floor.wrapT = THREE.RepeatWrapping; 
texture_floor.anisotropy = 16;  
const geometry = new THREE.PlaneGeometry(50, 35);
const material = new THREE.MeshStandardMaterial({ map: texture_floor });
const ground = new THREE.Mesh(geometry, material);
scene.add(ground);
ground.rotation.x = -Math.PI / 2;

const texture_wall = new THREE.TextureLoader().load('img/wall1.jpg');
texture_wall.repeat.set( 3,1); // powtarzanie tekstury 
texture_wall.wrapS = THREE.RepeatWrapping; // rysowanie tekstury od poczatku
texture_wall.wrapT = THREE.RepeatWrapping; 
texture_wall.anisotropy = 16;

const wall_geometry = new THREE.BoxGeometry(50,7,1);
const wall_materials = new THREE.MeshBasicMaterial({map: texture_wall});
const wall = new THREE.Mesh(wall_geometry,wall_materials);
scene.add(wall);
wall.position.y=3.5;
wall.position.z=18;
wall.name = 'wall ';

const wall1 = new THREE.Mesh(wall_geometry,wall_materials);
scene.add(wall1);
wall1.position.y=3.5;
wall1.position.z=-18;
wall1.name = 'wall 1';

const wall2 = new THREE.Mesh(wall_geometry,wall_materials);
scene.add(wall2);
wall2.position.y=3.5;
wall2.position.x=-15;
wall2.rotation.y=-Math.PI / 2;

const wall3 = new THREE.Mesh(wall_geometry,wall_materials);
scene.add(wall3);
wall3.position.y=3.5;
wall3.position.x=15;
wall3.rotation.y=-Math.PI / 2;
wall3.name = 'wall 3';





const wall_geometry1 = new THREE.BoxGeometry(15,2.5,1);
const wall_materials1 = new THREE.MeshBasicMaterial({map: texture_wall});


const wall4 = new THREE.Mesh(wall_geometry1,wall_materials1);
scene.add(wall4);
wall4.position.y=1.25;
wall4.position.x=-9.5;

const wall5 = new THREE.Mesh(wall_geometry1,wall_materials1);
scene.add(wall5);
wall5.position.y=1.25;
wall5.position.x=9.5;

const wall6 = new THREE.Mesh(wall_geometry,wall_materials);
scene.add(wall6);
wall6.position.y=6;

wall6.position.x=9.5;




// Создание стеклянной части двери




var tabNazwa=['img/mola__lisa.jpg',
              'img/time.jpg',
              'img/The_Last_Supper.jpg',
              'img/girl.jpg',
              'img/venere.jpg',
              'img/night.jpg',
              'img/madona.jpg',
              'img/pompeja.jpg',
              'img/america.jpg',
              'img/wojna.jpg',
              'img/kiss.jpg',
              'img/square.png',
              'img/krzyk.jpg',
              'img/babylon.jpg'
            ];

var tabOpis=['Mona Lisa \n Autor: Leonardo da Vinci \n Data powstania: ok. 1503–1507',
             'Trwałość pamięci \n Autor: Salvador Dalí \n Data powstania: 1931',
             'Ostatnia Wieczerza \n Autor: Leonardo da Vinci \n Data powstania: ok. 1495–1498',
             'Dziewczyna z perłą \n Autor: Jan Vermeer \n Data powstania: ok. 1665 – 1667',
             'Narodziny Wenus \n Autor: Sandro Botticelli \n Data powstania: ok. 1485',
             'Gwiaździsta noc \n Autor: Vincent van Gogh \n Data powstania: 1889',
             'Madonna Sykstyńska \n Autor: Rafael Santi\n Data powstania: ok. 1513–1514',
             'Ostatni Dzien Pompei \n Autor: Karl Bryullov\n Data powstania: ok. 1830–1833',
             'American Gothic \n Autor: Grant Wood\n Data powstania: 1930',
             'Apoteoza wojny \n Autor: Wasilij Wierieszczagin\n Data powstania: 1871',
             'Pocałunek \n Autor: Gustav Klimt\n Data powstania: 1907–1908',
             'Czarny kwadrat na białym tle \n Autor: Kazimierz Malewicz\n Data powstania: 1914–1915',
             'Krzyk \n Autor: Edvard Munch\n Data powstania: 1893',
             'Wieża Babel \n Autor: Pieter Bruegel\n Data powstania: 1563'
            ];

var tabRozmiar=[
               [2,3],
               [3,2],
               [4,2],
               [2,3],
               [4,2],
               [2.5,2],
               [2,3.5],
               [5,3],
               [1.5,2],
               [3,2],
               [2,2],
               [2,2],
               [1.5,2],
               [4,2.5]
];

var tabPostion=[
               [0, 3, 17.5,Math.PI],
               [10, 3, 17.5,Math.PI],
               [-10, 3, 17.5,Math.PI],
               [-14.5, 3, 14,Math.PI/2],
               [-14.5, 3, 6,Math.PI/2],
               [14.5, 3, 14,-Math.PI/2],
               [14.5, 3.5, 6,-Math.PI/2],
               [0, 3, -17.5,0],
               [10, 3, -17.5,0],
               [-10, 3, -17.5,0],
               [-14.5, 3, -14,Math.PI/2],
               [-14.5, 3, -6,Math.PI/2],
               [14.5, 3, -14,-Math.PI/2],
               [14.5, 3, -6,-Math.PI/2]

];

const tabPainting = [];

for (var i=0; i<tabNazwa.length; i++)
{
    tabPainting[i]=createFramedPainting(tabNazwa[i], tabRozmiar[i][0], tabRozmiar[i][1], 0.1, 0x8B4513);
    tabPainting[i].position.set(tabPostion[i][0],tabPostion[i][1],tabPostion[i][2]);
    tabPainting[i].rotation.y=tabPostion[i][3];
    tabPainting[i].scale.set(1.5,1.5,1);
    tabPainting[i].name=tabOpis[i];
    scene.add(tabPainting[i]);
}










const door = createDoor();
door.position.z=0.5;
const door1 = createDoor();
door1.position.z=0.5;
door1.position.x-=-2;


let isDoorOpen = false;  // Состояние двери
let doorPosition = -1;
























const pointLight = new THREE.PointLight(0xffffff, 100, 1000);  // Цвет, интенсивность, дальность
pointLight.position.set(0, 7 , 0);  // Позиция света
scene.add(pointLight);



const gridHelper = new THREE.GridHelper(100, 100); // 20 - размер, 20 - количество делений
scene.add(gridHelper);










const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 1;
controls.dragToLook = true;
controls.rollSpeed = 0.1;

camera.position.y = 1.6; // Высота камеры



function colision(){
    if (camera.position.z < -17) camera.position.z+=1;
    if (camera.position.z > 17) camera.position.z-=1;
    if (camera.position.x < -14) camera.position.x+=1;
    if (camera.position.x > 14) camera.position.x-=1;
   // if (camera.position.y < 1.6) camera.position.y=1.6;

    if ((camera.position.z > -0.7 && camera.position.z < 0.7 && camera.position.x < -2) || (camera.position.z > -0.7 && camera.position.z < 0.7 && camera.position.x > 2))
    {
        if (camera.position.z>0)camera.position.z+=1;
        else camera.position.z-=1;
    }
    
    if (!isDoorOpen && camera.position.z<0.9 && camera.position.z>0)  camera.position.z+=1;
    if (!isDoorOpen && camera.position.z>-0.6 && camera.position.z<0)  camera.position.z-=0.5;
}




// Функция анимации
function animate() {
    requestAnimationFrame(animate);

    if(isDoorOpen)
    {
        if(doorPosition>-3) doorPosition-=0.05;
    }
    else 
    {
        if(doorPosition<-1) doorPosition+=0.05;
    }
    
    door.position.x=doorPosition;
    door1.position.x=doorPosition*(-1);

    console.log(camera.position);
   
    colision();

    controls.update(0.1);

    // Обновление рендера
    renderer.render(scene, camera);
}

animate();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function showInfoPanel(info) {
    const panel = document.getElementById('infoPanel');
    panel.textContent = info.replace(/\n/g, '\n');  // Обработка символов переноса строки
    panel.style.display = 'block';
    setTimeout(() => panel.style.display = 'none', 10000);  // Скрыть через 10 секунд
}


function createFramedPainting(paintingTextureUrl, frameWidth, frameHeight, frameThickness, frameColor) {
    const frameMaterial = new THREE.MeshBasicMaterial({ color: frameColor });
    
    // Горизонтальные части рамки
    const horizontalFrameGeometry = new THREE.BoxGeometry(frameWidth + frameThickness, frameThickness, frameThickness);
    const topFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
    const bottomFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
    
    // Вертикальные части рамки
    const verticalFrameGeometry = new THREE.BoxGeometry(frameThickness, frameHeight + frameThickness, frameThickness);
    const leftFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
    const rightFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
    
    // Позиционирование частей рамки
    topFrame.position.set(0, frameHeight / 2 + frameThickness / 2, 0);
    bottomFrame.position.set(0, -frameHeight / 2 - frameThickness / 2, 0);
    leftFrame.position.set(-frameWidth / 2 - frameThickness / 2, 0, 0);
    rightFrame.position.set(frameWidth / 2 + frameThickness / 2, 0, 0);

    // Картина
    const paintingTexture = new THREE.TextureLoader().load(paintingTextureUrl);
    const paintingMaterial = new THREE.MeshBasicMaterial({ map: paintingTexture });
    const paintingGeometry = new THREE.PlaneGeometry(frameWidth, frameHeight);
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.set(0, 0, frameThickness / 2);

    // Группа для рамки и картины
    const frameGroup = new THREE.Group();
    frameGroup.add(topFrame, bottomFrame, leftFrame, rightFrame, painting);

    return frameGroup;
}

function createDoor(){
    const geometry_glass = new THREE.PlaneGeometry(2, 2.5);  // Размер стекла
const material_glass = new THREE.MeshBasicMaterial({
    color: 0x00ff00,  // Зеленый цвет
    opacity: 0.3,  // Полупрозрачность
    transparent: true  // Включаем поддержку прозрачности
});
const glass = new THREE.Mesh(geometry_glass, material_glass);
const glass1 = new THREE.Mesh(geometry_glass, material_glass);
glass.position.set(0, 1.25, 0.025);
glass1.position.set(0, 1.25, -0.025);
glass1.rotation.y=Math.PI;


// Создание рамки двери
const frameMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

const horizontalFrameGeometry = new THREE.BoxGeometry(2, 0.1, 0.1);
const topFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
const bottomFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
topFrame.position.set(0, 2.45, 0);
bottomFrame.position.set(0, 0.05, 0);

const verticalFrameGeometry = new THREE.BoxGeometry(0.1, 2.5, 0.1);
const leftFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
const rightFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
leftFrame.position.set(-1, 1.25, 0);
rightFrame.position.set(1, 1.25, 0);

// Группировка стекла и рамки
const doorGroup = new THREE.Group();
doorGroup.add(glass,glass1, topFrame, bottomFrame, leftFrame, rightFrame);
scene.add(doorGroup);

doorGroup.position.x = -1;
return doorGroup;
}

window.addEventListener('keydown', (event) =>{
    if (event.key === 'o') isDoorOpen=!isDoorOpen ;
});

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);  // true для поиска во вложенных объектах
    
    if (intersects.length > 0) {
        let selectedObject = intersects[0].object;

        // Поиск имени объекта в иерархии
        while (selectedObject && !selectedObject.name) {
            selectedObject = selectedObject.parent;  // Переход к родительскому объекту
        }
        if (selectedObject && selectedObject.name) {
            showInfoPanel(selectedObject.name);  // Отображаем информацию об объекте
        }

      
    }
});


function onWindowResize() {
    // Обновляем размеры канваса
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Обновляем параметры камеры
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); // Обновляем матрицу проекции камеры
}

window.addEventListener('resize', onWindowResize, false);


