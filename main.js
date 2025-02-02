import * as THREE from 'three'
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';


const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';  
    museum();  
});


function museum() {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

  

    camera.position.set(0, 0, 5);
    //звуки
    const listener = new THREE.AudioListener();
    camera.add(listener);  

    const soundOpen = new THREE.Audio(listener);
    const soundClose = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('sounds/open.mp3', function (buffer) {
        soundOpen.setBuffer(buffer);
        soundOpen.setLoop(false);  // Не зацикливать
        soundOpen.setVolume(0.4);  // Громкость от 0 до 1
    });

    audioLoader.load('sounds/close.mp3', function (buffer) {
        soundClose.setBuffer(buffer);
        soundClose.setLoop(false);
        soundClose.setVolume(0.4);
    });

    const museumMusic =  new THREE.Audio(listener);
    audioLoader.load('sounds/museum.mp3', function (buffer) {
        museumMusic.setBuffer(buffer);
        museumMusic.setLoop(true);  
        museumMusic.setVolume(0.6);  // Громкость от 0 до 1
        museumMusic.play();
    });
   



    const texture_floor = new THREE.TextureLoader().load('img/Floor.jpg');
    texture_floor.repeat.set(10, 7); // powtarzanie tekstury 
    texture_floor.wrapS = THREE.RepeatWrapping; // rysowanie tekstury od poczatku
    texture_floor.wrapT = THREE.RepeatWrapping;
    texture_floor.anisotropy = 16;
    const geometry = new THREE.PlaneGeometry(50, 35);
    const material = new THREE.MeshStandardMaterial({ map: texture_floor });
    const ground = new THREE.Mesh(geometry, material);
    scene.add(ground);
    ground.rotation.x = -Math.PI / 2;


    const texture_roof = new THREE.TextureLoader().load('img/roof.png');
    texture_roof.repeat.set(30, 21); // powtarzanie tekstury 
    texture_roof.wrapS = THREE.RepeatWrapping; // rysowanie tekstury od poczatku
    texture_roof.wrapT = THREE.RepeatWrapping;
    texture_roof.anisotropy = 16;
    const material_roof = new THREE.MeshStandardMaterial({ map: texture_roof });
    const roof = new THREE.Mesh(geometry, material_roof);
    roof.rotation.x = Math.PI / 2;
    roof.position.y = 7;
    scene.add(roof);

    const texture_wall = new THREE.TextureLoader().load('img/wall2.jpg');
    texture_wall.repeat.set(3, 1); // powtarzanie tekstury 
    texture_wall.wrapS = THREE.RepeatWrapping; // rysowanie tekstury od poczatku
    texture_wall.wrapT = THREE.RepeatWrapping;
    texture_wall.anisotropy = 16;

    const wall_geometry = new THREE.BoxGeometry(30, 7, 1);
    const wall_geometry2 = new THREE.BoxGeometry(36.2, 7, 1);
    const wall_materials = new THREE.MeshStandardMaterial({ map: texture_wall });
    const wall = new THREE.Mesh(wall_geometry, wall_materials);
    scene.add(wall);
    wall.position.y = 3.5;
    wall.position.z = 18;


    const wall1 = new THREE.Mesh(wall_geometry, wall_materials);
    scene.add(wall1);
    wall1.position.y = 3.5;
    wall1.position.z = -18;


    const wall2 = new THREE.Mesh(wall_geometry2, wall_materials);
    scene.add(wall2);
    wall2.position.y = 3.5;
    wall2.position.x = -15;
    wall2.rotation.y = -Math.PI / 2;

    const wall3 = new THREE.Mesh(wall_geometry2, wall_materials);
    scene.add(wall3);
    wall3.position.y = 3.5;
    wall3.position.x = 15;
    wall3.rotation.y = -Math.PI / 2;






    const wall_geometry1 = new THREE.BoxGeometry(15, 2.5, 1);
    const texture_wall1 = new THREE.TextureLoader().load('img/wall3.jpg');
    texture_wall1.repeat.set(3, 1); // powtarzanie tekstury 
    texture_wall1.wrapS = THREE.RepeatWrapping; // rysowanie tekstury od poczatku
    texture_wall1.wrapT = THREE.RepeatWrapping;
    texture_wall1.anisotropy = 16;
    const wall_materials1 = new THREE.MeshStandardMaterial({ map: texture_wall1 });



    const wall4 = new THREE.Mesh(wall_geometry1, wall_materials1);
    scene.add(wall4);
    wall4.position.y = 1.25;
    wall4.position.x = -9.5;

    const wall5 = new THREE.Mesh(wall_geometry1, wall_materials1);
    scene.add(wall5);
    wall5.position.y = 1.25;
    wall5.position.x = 9.5;

    const wall6 = new THREE.Mesh(wall_geometry, wall_materials1);
    scene.add(wall6);
    wall6.position.y = 6;





//создание картины
    var tabNazwa = ['img/mola__lisa.jpg',
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

    var tabOpis = ['Mona Lisa \n Autor: Leonardo da Vinci \n Data powstania: ok. 1503–1507',
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

    var tabRozmiar = [
        [2, 3],
        [3, 2],
        [4, 2],
        [2, 3],
        [4, 2],
        [2.5, 2],
        [2, 3.5],
        [5, 3],
        [1.5, 2],
        [3, 2],
        [2, 2],
        [2, 2],
        [1.5, 2],
        [4, 2.5]
    ];

    var tabPostion = [
        [0, 3, 17.5, Math.PI],
        [10, 3, 17.5, Math.PI],
        [-10, 3, 17.5, Math.PI],
        [-14.5, 3, 14, Math.PI / 2],
        [-14.5, 3, 6, Math.PI / 2],
        [14.5, 3, 14, -Math.PI / 2],
        [14.5, 3.5, 6, -Math.PI / 2],
        [0, 3, -17.5, 0],
        [10, 3, -17.5, 0],
        [-10, 3, -17.5, 0],
        [-14.5, 3, -14, Math.PI / 2],
        [-14.5, 3, -6, Math.PI / 2],
        [14.5, 3, -14, -Math.PI / 2],
        [14.5, 3, -6, -Math.PI / 2]

    ];

    const tabPainting = [];

    for (var i = 0; i < tabNazwa.length; i++) {
        tabPainting[i] = createPainting(tabNazwa[i], tabRozmiar[i][0], tabRozmiar[i][1], 0.1, 0x8B4513);
        tabPainting[i].position.set(tabPostion[i][0], tabPostion[i][1], tabPostion[i][2]);
        tabPainting[i].rotation.y = tabPostion[i][3];
        tabPainting[i].scale.set(1.5, 1.5, 1);
        tabPainting[i].name = tabOpis[i];
        scene.add(tabPainting[i]);
    }




    const door = createDoor();
    door.position.z = 0.5;
    const door1 = createDoor();
    door1.position.z = 0.5;
    door1.position.x -= -2;


    let isDoorOpen = false;  
    let doorPosition = -1;


//свет

    const tabLightPictures = [];

    for (var i = 0; i < tabPostion.length; i++) {
        var x = tabPostion[i][0];
        var y = tabPostion[i][1];
        var z = tabPostion[i][2];
        tabLightPictures[i] = new THREE.SpotLight(0xffffff, 300, 15, Math.PI / 6, 0.9, 2);
        if (x == 10 || x == -10 || x == 0) tabLightPictures[i].position.set(x, y / 2, z / 2);
        else tabLightPictures[i].position.set(x / 2, y / 2, z);
        tabLightPictures[i].target.position.set(x, y, z);
        scene.add(tabLightPictures[i]);
        scene.add(tabLightPictures[i].target);
    }

    const tabLight = [];



    tabLight[0] = new THREE.SpotLight(0xffffff, 10, 15, Math.PI / 2, 0.9, 2);
    tabLight[0].position.set(-7, 6, 8);
    tabLight[0].target.position.set(-7, 0, 8);
    scene.add(tabLight[0]);
    scene.add(tabLight[0].target);

    tabLight[1] = new THREE.SpotLight(0xffffff, 10, 15, Math.PI / 2, 0.9, 2);
    tabLight[1].position.set(7, 6, 8);
    tabLight[1].target.position.set(7, 0, 8);
    scene.add(tabLight[1]);
    scene.add(tabLight[1].target);

    tabLight[2] = new THREE.SpotLight(0xffffff, 10, 15, Math.PI / 2, 0.9, 2);
    tabLight[2].position.set(-7, 6, -8);
    tabLight[2].target.position.set(-7, 0, -8);
    scene.add(tabLight[2]);
    scene.add(tabLight[2].target);

    tabLight[3] = new THREE.SpotLight(0xffffff, 10, 15, Math.PI / 2, 0.9, 2);
    tabLight[3].position.set(7, 6, -8);
    tabLight[3].target.position.set(7, 0, -8);
    scene.add(tabLight[3]);
    scene.add(tabLight[3].target);

    tabLight[4] = new THREE.SpotLight(0xffffff, 60, 15, Math.PI / 5, 0.9, 2);
    tabLight[4].position.set(0, 6, 8);
    tabLight[4].target.position.set(0, 1.6, 1.5);
    scene.add(tabLight[4]);
    scene.add(tabLight[4].target);

    tabLight[5] = new THREE.SpotLight(0xffffff, 60, 15, Math.PI / 5, 0.9, 2);
    tabLight[5].position.set(0, 6, -8);
    tabLight[5].target.position.set(0, 1.6, -1.5);
    scene.add(tabLight[5]);
    scene.add(tabLight[5].target);


















    const controls = new FirstPersonControls(camera, renderer.domElement);
    controls.noFly = true;
    controls.movementSpeed = 0.5;
    controls.lookSpeed = 0.02;







    function colision() {
        if (camera.position.z < -17) camera.position.z += 1;
        if (camera.position.z > 17) camera.position.z -= 1;
        if (camera.position.x < -14) camera.position.x += 1;
        if (camera.position.x > 14) camera.position.x -= 1;


        if ((camera.position.z > -0.7 && camera.position.z < 0.7 && camera.position.x < -2) || (camera.position.z > -0.7 && camera.position.z < 0.7 && camera.position.x > 2)) {
            if (camera.position.z > 0) camera.position.z += 1;
            else camera.position.z -= 1;
        }

        if (!isDoorOpen && camera.position.z < 0.9 && camera.position.z > 0) camera.position.z += 1;
        if (!isDoorOpen && camera.position.z > -0.6 && camera.position.z < 0) camera.position.z -= 0.5;
        camera.position.y = 1.6;
    }




    
    function animate() {
        requestAnimationFrame(animate);

        if (isDoorOpen) {
            if (doorPosition > -3) doorPosition -= 0.05;
        }
        else {
            if (doorPosition < -1) doorPosition += 0.05;
        }

        door.position.x = doorPosition;
        door1.position.x = doorPosition * (-1);

        console.log(camera.position);

        colision();

        controls.update(0.1);

       
        renderer.render(scene, camera);
    }

    animate();

    


    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function showInfoPanel(info) {
        const panel = document.getElementById('infoPanel');
        panel.textContent = info.replace(/\n/g, '\n');  // Обработка символов переноса строки
        panel.style.display = 'block';
        setTimeout(() => panel.style.display = 'none', 10000); 
    }


    function createPainting(paintingTextureUrl, frameWidth, frameHeight, frameThickness, frameColor) {
        const frameMaterial = new THREE.MeshStandardMaterial({ color: frameColor });

        // Горизонтальные части рамки
        const horizontalFrameGeometry = new THREE.BoxGeometry(frameWidth+frameThickness, frameThickness, frameThickness);
        const topFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);
        const bottomFrame = new THREE.Mesh(horizontalFrameGeometry, frameMaterial);

        // Вертикальные части рамки
        const verticalFrameGeometry = new THREE.BoxGeometry(frameThickness, frameHeight, frameThickness);
        const leftFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);
        const rightFrame = new THREE.Mesh(verticalFrameGeometry, frameMaterial);

        // Позиционирование частей рамки
        topFrame.position.set(0, frameHeight / 2, 0);
        bottomFrame.position.set(0, -frameHeight / 2 , 0);
        leftFrame.position.set(-frameWidth / 2 , 0, 0);
        rightFrame.position.set(frameWidth / 2  , 0, 0);

        // Картина
        const paintingTexture = new THREE.TextureLoader().load(paintingTextureUrl);
        const paintingMaterial = new THREE.MeshStandardMaterial({ map: paintingTexture });
        const paintingGeometry = new THREE.PlaneGeometry(frameWidth, frameHeight);
        const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
        painting.position.set(0, 0, frameThickness / 4);

        // Группа для рамки и картины
        const frameGroup = new THREE.Group();
        frameGroup.add(topFrame, bottomFrame, leftFrame, rightFrame, painting);

        return frameGroup;
    }

    function createDoor() {
        const geometry_glass = new THREE.PlaneGeometry(2, 2.5);  // Размер стекла
        const material_glass = new THREE.MeshStandardMaterial({
            color: 0x00ff00,  // Зеленый цвет
            opacity: 0.3,  // Полупрозрачность
            transparent: true  // Включаем поддержку прозрачности
        });
        const glass = new THREE.Mesh(geometry_glass, material_glass);
        const glass1 = new THREE.Mesh(geometry_glass, material_glass);
        glass.position.set(0, 1.25, 0.025);
        glass1.position.set(0, 1.25, -0.025);
        glass1.rotation.y = Math.PI;


        // Создание рамки двери
        const frameMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

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
        doorGroup.add(glass, glass1, topFrame, bottomFrame, leftFrame, rightFrame);
        scene.add(doorGroup);

        doorGroup.position.x = -1;
        return doorGroup;
    }

    window.addEventListener('keydown', (event) => {
        if (event.key === 'o') 
        {
            isDoorOpen = !isDoorOpen;
            if (isDoorOpen) soundOpen.play();
            else soundClose.play();
        }
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
}


