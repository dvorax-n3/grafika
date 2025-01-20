import * as THREE from 'three'
import { FlyControls } from 'three/addons/controls/FlyControls.js';





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Создание геометрии и материала для объектов



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












const mona_lisa = createFramedPainting('img/mola__lisa.jpg', 2, 3, 0.1, 0x8B4513);
mona_lisa.position.set(0, 3, 17.5);  // Устанавливаем позицию
mona_lisa.rotation.y=Math.PI;
mona_lisa.scale.set(1.5,1.5,1);

scene.add(mona_lisa);  // Добавляем в сцену
mona_lisa.name='Mona Lisa \n Autor: Leonardo da Vinci \n Data powstania	1503–1507';


const door = createDoor();
door.position.z=0.5;
door.position.x-=0.05;

const door1 = createDoor();
door1.position.z=0.5;
door1.position.x-=-1.95;




















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
    


}




// Функция анимации
function animate() {
    requestAnimationFrame(animate);

    console.log("Позиция камеры:", camera.position);
   
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
glass.position.set(0, 1.25, 0);

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
doorGroup.add(glass, topFrame, bottomFrame, leftFrame, rightFrame);
scene.add(doorGroup);

doorGroup.position.x = -1;
return doorGroup;
}




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


