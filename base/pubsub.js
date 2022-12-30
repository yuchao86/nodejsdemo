//订阅者集合
class EventEmitter{
    constructor(){
        this.listener = {}
    }
    // 订阅机制
    on(name,newlistener){
   
        if(!this.listener[name]){
            this.listener[name] = []
        }
        this.listener[name].push(newlistener)
    }
    // 发布机制
    emit(name){
        this.listener[name].forEach(item=>item('报到'))
    }
}

let myEmitter = new EventEmitter()

myEmitter.on('a',message =>console.log(`我是1号订阅者,${message}`))
myEmitter.on('a', message =>console.log(`我2号订阅者,${message}`))
myEmitter.on( 'b',message =>console.log(`我是3号订阅者,${message}`))

myEmitter.emit("a")
myEmitter.emit('b',"yuchao");