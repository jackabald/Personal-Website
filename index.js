const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

var count = 0

class Player{
    constructor(){
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0
        const image = new Image()
        image.src = './img/spaceship.png'
        image.onload = () => {
            const scale = 0.17
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height
            }
        }
    }
    draw(){
            c.save()
            c.translate(
                player.position.x + player.width/2,
                player.position.y + player.height/2)
            c.rotate(this.rotation)
            c.translate(
                -player.position.x - player.width/2,
                -player.position.y - player.height/2)
            c.drawImage(
                this.image,
                this.position.x,
                this.position.y, 
                this.width,
                this.height)
            c.restore()
    }
    update(){
        if(this.image){
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}
class Projectile{
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 3
    }
    draw(){
        c.beginPath()
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }
    update(){
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
class Particle{
    constructor({position, velocity, radius,}){
        this.position = position
        this.velocity = velocity
        this.radius = radius
    }
    draw(){
        c.beginPath()
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            0,
            Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }
    update(){
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
class J{
    constructor(){
        const image = new Image()
        image.src = './img/J.png'
        image.onload = () => {
            const scale = 0.3
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.height/2 + 50,
                y: canvas.width/2  - 420
            }
        }
    }
    draw(){
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y, 
            this.width,
            this.height)
    }
    update(){
    if(this.image){
        this.draw()
    }
    }
}
class A{
    constructor(){
        const image = new Image()
        image.src = './img/A.png'
        image.onload = () => {
            const scale = 0.28
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.height/2 + 110,
                y: canvas.width/2 - 420
            }
        }
    }
    draw(){
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y, 
            this.width,
            this.height)
    }
    update(){
    if(this.image){
        this.draw()
    }
    }
}
class C{
    constructor(){
        const image = new Image()
        image.src = './img/C.png'
        image.onload = () => {
            const scale = 0.28
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.height/2 + 190,
                y: canvas.width/2 - 420
            }
        }
    }
    draw(){
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y, 
            this.width,
            this.height)
    }
    update(){
    if(this.image){
        this.draw()
    }
    }
}
class K{
    constructor(){
        const image = new Image()
        image.src = './img/K.png'
        image.onload = () => {
            const scale = 0.28
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.height/2 + 270,
                y: canvas.width/2 - 420
            }
        }
    }
    draw(){
        c.drawImage(
            this.image,
            this.position.x,
            this.position.y, 
            this.width,
            this.height)
    }
    update(){
    if(this.image){
        this.draw()
    }
    }
}
class Grid{
    constructor(){
        this.position = {
            x: 0,
            y: 0
        }
        this.letters = [new J(), new A(), new C(), new K()]
    }
    update(){

    }
}

const player = new Player()
const projectiles = []
const grid = new Grid()
const particles = []
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'orange'
    c.fillRect(0,0,canvas.width,canvas.height)
    c.fillStyle = 'white'
    c.font = 'bold 18px Arial'
    c.fillText("Hi, my name is", (canvas.width/2) - 175, (canvas.height/2) - 220)
    player.update()
    particles.forEach(particle => {
        particle.update()
    })
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0){
            setTimeout(() => {
                projectiles.splice(index,1)
            }, 0)
        } else{
            projectile.update()
        }
    })
    grid.update()
    grid.letters.forEach((letter,i) => {
        letter.update()
        projectiles.forEach((projectile,j) => {
            if(projectile.position.y - projectile.radius <=
                letter.position.y + letter.height &&
                projectile.position.x + projectile.radius >=
                letter.position.x &&
                projectile.position.x - projectile.radius <=
                letter.position.x + letter.width && 
                projectile.position.y + projectile.radius >=
                letter.position.y
                ){
                    count++
                    console.log(count)
                    for(let i = 0; i < 50; i++){
                        particles.push(new Particle({
                            position:{
                                x: letter.position.x + letter.width/2,
                                y: letter.position.y + letter.height/2
                            },
                            velocity:{
                                x: (Math.random() - 0.5)*4,
                                y: (Math.random() - 0.5)*4
                            },
                            radius: Math.random() * 7
                        }))
                    }
                    setTimeout(() => {
                            grid.letters.splice(i,1)
                            projectiles.splice(j,1)
                    },0)
                }
        })
    })

    if (keys.a.pressed && player.position.x >= 3){
        player.velocity.x = -6
        player.rotation = -0.20
    } else if (keys.d.pressed && player.position.x +
         player.width <= canvas.width - 3){
        player.velocity.x = 6
        player.rotation = 0.20
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }
}
animate()

addEventListener('keydown', ({key}) => {
    switch(key){
        case 'a':
            keys.a.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case ' ' :
            projectiles.push(
                new Projectile({
                position: {
                    x: player.position.x + player.width/2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -5
                }
            }))
            break
    }
})
addEventListener('keyup', ({key}) => {
    switch(key){
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case ' ' :
            break
    }
})
