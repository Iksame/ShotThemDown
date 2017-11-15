var Enemy = function(name, color, position, direction, lolilol, mdr) {
    
        this.name = name;
        this.position = position;
        this.position.y = lolilol;
        this.position.x = mdr;
        
        //this.bullets = new Array();
        this.direction = direction;
        this.speed = 0;
        this.iamright = true;

    
        this.material = new THREE.MeshLambertMaterial({
            color: color,
            });
    
        bumperMesh = new THREE.Mesh(new THREE.CylinderGeometry(0, 10, 10, 12, 12, false), this.materialBumper);
        sphere = new THREE.SphereGeometry(6, 8, 8);
        THREE.GeometryUtils.merge(sphere, bumperMesh);
    
        this.graphic = new THREE.Mesh(sphere, this.material);
        this.graphic.position.x = mdr;
        this.graphic.position.y = lolilol;
        this.graphic.position.z = 6;
        this.graphic.rotateOnAxis(new THREE.Vector3(0,0,1), this.direction);
    };

    Enemy.prototype.update = function (distance) {
        if (this.position.x + WIDTH / 2 > WIDTH)
            this.iamright = false
        if (this.position.x + WIDTH / 2 - 70 < 0)
            this.iamright = true

        if (this.iamright)
        {
            this.position.x += 4
            var moveTo = new THREE.Vector3(
            this.speed * Math.cos(this.direction) + this.graphic.position.x + 4,
            this.speed * Math.sin(this.direction) + this.graphic.position.y,
            this.graphic.position.z);
        }
        else
        {
            this.position.x -= 4
            var moveTo = new THREE.Vector3(
            this.speed * Math.cos(this.direction) + this.graphic.position.x - 4,
            this.speed * Math.sin(this.direction) + this.graphic.position.y,
            this.graphic.position.z);
        }
    
        this.graphic.position = moveTo;
        if (this.speed > 0) {
            this.speed = this.speed - 0.04;
        }
        else if (this.speed < 0) {
            this.speed = this.speed + 0.04
        }
    };