function init()
{
    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 100000;

    $container = $('#container');
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE,
                                    ASPECT,
                                    NEAR,
                                    FAR);
    scene = new THREE.Scene();
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    camera.position.z = 500;
    scene.add(camera);

    renderer.setSize(WIDTH, HEIGHT);

    $container.append(renderer.domElement);

    noGround = [];
    ground = new Ground(0xffffff, WIDTH, HEIGHT, 10);
    
    player1 = new Player("player1", 0xffff00, new THREE.Vector2(50, 0), 0);
    scene.add(player1.graphic);

    enemy1 = new Enemy("enemy", 0xff00ff, new THREE.Vector2(50,0), 0, 110, -120);
    enemy2 = new Enemy("enemy", 0xff0000, new THREE.Vector2(50,0), 0, 90, 45);
    enemy3 = new Enemy("enemy", 0x0000ff, new THREE.Vector2(50,0), 0, -100, -60);
    enemy4 = new Enemy("enemy", 0x00ffff, new THREE.Vector2(50,0), 0, -30, 110);
    scene.add(enemy1.graphic);
    scene.add(enemy2.graphic);
    scene.add(enemy3.graphic);
    scene.add(enemy4.graphic);

    light1 = new Light("sun", 0xffffff, "0,0,340");
    scene.add(light1);
}

function Ground(color, size_x, size_y, nb_tile)
{
    colors = Array(0xffff00, 0x00ff00, 0x0000ff, 0x000000);

    sizeOfTileX = size_x / nb_tile;
    minX = -(size_x/2);
    maxX = (size_x/2);
    
    sizeOfTileY = size_y / nb_tile;
    minY = -(size_y/2);
    maxY = (size_y/2);

    for (x = minX; x <= maxX; x = x+sizeOfTileX){
        for (y = minY; y <= maxY; y = y+sizeOfTileY){

            color = colors[Math.floor(Math.random()*colors.length)];

            if (x < ((maxX + minX) / 2) + sizeOfTileX && x > ((maxX + minX) / 2) - sizeOfTileX && y < (maxY + minY) / 2 + sizeOfTileY && y > ((maxY + minY) / 2) - sizeOfTileY)
            {
                tmpGround = new THREE.Mesh(
                    new THREE.PlaneGeometry(sizeOfTileX-10, sizeOfTileY-10),
                    new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true, opacity: 0.6}));
                    tmpGround.position.x = x;
                    tmpGround.position.y = y;
                    scene.add(tmpGround);
            }
            else if (0x000000 != color)
            {
                tmpGround = new THREE.Mesh(
                new THREE.PlaneGeometry(sizeOfTileX-10, sizeOfTileY-10),
                new THREE.MeshLambertMaterial({color: color, transparent: true, opacity: 0.6}));
                tmpGround.position.x = x;
                tmpGround.position.y = y;
                scene.add(tmpGround);
            }
            else
            {
                //console.log("------------")
                //console.log("x:" + x)
                //console.log("y:" + y)
                //console.log("------------")
                //noGround.push([x, y]);
            }
        }
    }
}

function Light(name, color, position)
{
    pointLight = new THREE.PointLight(color, 50, 3050);

    pointLight.position.x = position.split(',')[0];
    pointLight.position.y = position.split(',')[1];
    pointLight.position.z = position.split(',')[2];

    return pointLight;
}
