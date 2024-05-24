const canvas = document.getElementById("myCanvas")
c = canvas.getContext("2d")

CANVAS_WIDTH = window.innerWidth;
CANVAS_HEIGHT = window.innerHeight;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
c.fillStyle = "green"

class Particle{
    constructor(effect){
        this.effect = effect
        this.x = Math.random() * this.effect.width
        this.y = Math.random() * this.effect.height
        this.radius = Math.random() * 10 + 5
        this.vx = Math.random() * 4 - 2
        this.vy = Math.random() * 4 - 2
    }

    draw(context){
        context.beginPath()
        context.fillStyle = 'hsl('+this.x +', 100%, 50%)'
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2)
        context.fill()
    }

    update(){
        this.x += this.vx
        if(this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1

        this.y += this.vy
        if(this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1
    }
}

class Effetc{
    constructor(canvas){
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.particles = []
        this.numberOfParticle = 1
        this.createParticle()
    }

    createParticle(){
        for(let i=0; i<this.numberOfParticle; i++){
           this.particles.push(new Particle(this))
        }
    }

    handleParticle(context){
        this.particles.forEach(particle =>{
            particle.draw(context)
            console.log("working")
            particle.update()
        })
    }
}

let effect = new Effetc(canvas)


function animate(){
    c.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    effect.handleParticle(c)
    requestAnimationFrame(animate)
}
animate()
