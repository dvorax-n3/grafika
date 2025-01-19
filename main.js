import * as THREE from 'three'
import { FlyControls } from 'three/addons/controls/FlyControls.js';




   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   const renderer = new THREE.WebGLRenderer();
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);

   // Создание геометрии и материала для объектов
   const geometry = new THREE.PlaneGeometry(20, 20);
   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
   const ground = new THREE.Mesh(geometry, material);
   scene.add(ground);
   ground.rotation.x = -Math.PI / 2;

   const controls = new FlyControls(camera,renderer.domElement);
   controls.movementSpeed=10;
   controls.dragToLook=true;
   

   // Установка позиции камеры
   camera.position.z = 4.5;
   camera.position.y = 4.5;


   // Функция анимации
   function animate() {
       requestAnimationFrame(animate);
       controls.update(0.1);
   
       // Обновление рендера
       renderer.render(scene, camera);
   }

   animate();