import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { Pane } from 'tweakpane'

type DebugObject = {
    color?: string
}

type Object = {
    geometry?: THREE.BoxGeometry,
    materials?: THREE.MeshBasicMaterial,
    mesh?: THREE.Mesh
}

/**
 * Base
 */
//Debug
const debugPanel = new Pane({
    title: "Parameters"
})
const debugObject: DebugObject = {}

//Canvas
const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

//Scene
const scene = new THREE.Scene()

//Loaders
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
}

window.addEventListener('resize', () => {
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    //update materials


    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera
 */
//Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(3, 4, 8 * 2)
scene.add(camera)


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.autoRotate = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)

debugObject.color = '#4543cf'
debugPanel.addBinding(debugObject, 'color').on('change', () => {
    if (!debugObject.color) return
    object.materials?.color.set(debugObject.color)

})

/**
 * Object
 */

const object: Object = {}

//Geometry
object.geometry = new THREE.BoxGeometry(2, 2, 2)

//Materials
object.materials = new THREE.MeshBasicMaterial({
    color: debugObject.color
})


//Mesh
object.mesh = new THREE.Mesh(object.geometry, object.materials)
scene.add(object.mesh)

/**
 * Animate
 */
const tick = () => {
    //update controls
    controls.update()

    //render normal scene
    renderer.render(scene, camera)

    //Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()