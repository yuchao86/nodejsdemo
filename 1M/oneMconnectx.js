// includes
var cluster = require('cluster');
var cpuCount = require('os').cpus().length;
var util = require("util");
var http = require("http");
var url = require('url');
var fs = require('fs');
 
// max number of connections
var MAX_CONNECTIONS = 1000000;
// keep alive interval
var KEEPALIVE_INTERVAL = 2*60*1000;
 
// configuration file
var config = { messages: 0 };
// number of connections
var connections = 0;
// list of channels
var channel = [];
// map of ID -> node
var idmap = new Array(MAX_CONNECTIONS);
// head of free id list
var pHead;
 
// attempt to read config file
fs.readFile("config.json", "utf8", function(err, data) 
{ 
    if(err) { return; }
 
    // parse config file
    config = JSON.parse(data); 
});
 
// save config file every couple of minutes
setInterval(function()
{
    // write config file
    fs.writeFile("config.json", JSON.stringify(config, null, 4), "utf8");
}, 2*60*1000);
 
// initialize free id list
for(var v=0;v<MAX_CONNECTIONS;v++)
{
    // allocate list entry
    var pCur = new Object();
    // assign id
    pCur.id = v;
 
    // if there is no head, we're it
    if(pHead === undefined) { pCur.pNext = pCur.pPrev = pHead = pCur; }
 
    // insert into list
    pCur.pNext = pHead;
    pCur.pPrev = pHead.pPrev;
    pHead.pPrev.pNext = pCur;
    pHead.pPrev = pCur;
}
 
// connect left and right nodes
function connectNodesLR(pL, pR)
{
    pL.pR = pR;
    pR.pL = pL;
    return;
}
 
// connect top and bottom nodes
function connectNodesTB(pT, pB)
{
    pT.pB = pB;
    pB.pT = pT;
    return;
}
 
// insert node at the end of list
function insertNode(name, pNode)
{
    // reference channel
    var c = channel[name];
 
    // if channel does not exist, create it
    if(c === undefined) { c = channel[name] = []; c.pHead = c.pTail = 0; }
 
    // debug log
    //util.log("node inserted into " + name + " with id " + pHead.id + " (" + connections + " connections)");
 
    // add node to idmap
    idmap[pHead.id] = pNode;
 
    // remember head item so we can delete it
    var pDelete = pHead;
 
    // remove id from free id list
    pHead.pNext.pPrev = pHead.pPrev;
    pHead.pPrev.pNext = pHead.pNext;
    pHead = pHead.pNext;
 
    // delete old head
    delete pDelete;
 
    // special case for head
    if(c.pHead == 0)
    {
        // initialize head and tail
        c.pHead = c.pTail = pNode;
 
        // initialize neighbors
        c.pHead.pL = c.pHead;
        c.pHead.pR = c.pHead;
        c.pHead.pT = c.pHead;
        c.pHead.pB = c.pHead;
        
        return;
    }
 
    // note: insert can occur after any node, but we'll use tail
    var pPrev = c.pTail;
 
    // reference nodes
    var pL = pPrev;
    var pR = pPrev.pR;
    var pB = pL.pB;
    var pT = pR.pT;
    var pC = pNode;
 
    // apply connections
    connectNodesLR(pL, pC);
    connectNodesLR(pC, pR);
    connectNodesTB(pL, pR);
    connectNodesTB(pC, pB);
    connectNodesTB(pT, pC);
 
    // special case adjustment for N=3
    if(pL.pL == pR) 
    { 
        var p0 = c.pHead;
        var p1 = c.pHead.pR;
        var p2 = c.pHead.pR.pR;
 
        connectNodesTB(p0, p2);
        connectNodesTB(p1, p0);
        connectNodesTB(p2, p1);
    }
 
    // update tail, if necessary
    if(pL == c.pTail) { c.pTail = pC; }
 
    return;    
}
 
// delete node
function deleteNode(name, id, pNode)
{
    // reference channel
    var c = channel[name];
 
    // debug log
    //util.log("node " + id + " deleted from " + name);
 
    // remove node from idmap
    delete idmap[id];
 
    // allocate list entry
    var pCur = new Object();
    // assign id
    pCur.id = id;
 
    // if there is no head, we're it
    if(pHead === undefined) { pCur.pNext = pCur.pPrev = pHead = pCur; }
 
    // insert into list
    pCur.pNext = pHead;
    pCur.pPrev = pHead.pPrev;
    pHead.pPrev = pCur;
    pHead.pPrev.pNext = pCur;
 
    // reference nodes
    var pL = pNode.pL;
    var pR = pNode.pR;
    var pT = pNode.pT;
    var pB = pNode.pB;
 
    // apply connections
    connectNodesLR(pL, pR);
    connectNodesTB(pL, pB);
    connectNodesTB(pT, pR);
 
    // update tail, if necessary
    if(pNode == c.pTail) { c.pTail = pNode.pL; }
    // update head, if necessary
    if(pNode == c.pHead) { c.pHead = pNode.pR; }
 
    // if this was the last node, delete the channel
    if(pNode == c.pHead) { delete channel[name]; }
    // special case adjustment for N=2
    else if(c.pHead == c.pTail.pL)
    {
        var p0 = c.pHead;
        var p1 = c.pHead.pR;
 
        connectNodesTB(p0, p1);
        connectNodesTB(p1, p0);
    }
 
    return;
}
 
// send message
function sendMessage(query)
{
    // reference channel
    var c = channel[query.name];
 
    // sanity check
    if(c === undefined) { return; }
 
    // find node for the specified ID
    var pNode = idmap[query.id];
 
    // sanity check
    if(pNode === undefined) { return; }
 
    // detect appropriate neighbor
    if(parseFloat(query.wx) > 0) { pNode = pNode.pR; }
    else if(parseFloat(query.wx) < 0) { pNode = pNode.pL; }
    if(parseFloat(query.wy) > 0) { pNode = pNode.pB; }
    else if(parseFloat(query.wy) < 0) { pNode = pNode.pT; }
 
    // forward the message (messages are delimited by 2 endlines)
    pNode.write(JSON.stringify(query) + "\n\n");
 
    // increment messages count
    config.messages++;
 
    // debug log
    //util.log(query.uri + " (" + query.id + ") [" + query.x + ", " + query.y + "]");
 
    return;
}
 
function closeConnection(name, id, res)
{
    // delete node
    deleteNode(name, id, res);
 
    // decrement connection count
    connections--;
    
    return;
}
 
function onClose()
{
    // "this" is req.connection
    closeConnection(this.name, this.id, this.res); 
    clearInterval(this.interval);
    
    return;
}
 
function onRequest(req, res) 
{
    // parse url
    var parsed = url.parse(req.url, true);
 
    // handle channel join
    if(parsed.pathname == '/channel/join')
    {
        // grab free id
        var id = pHead.id;
 
        // prepare keep alive string
        var keepAlive = JSON.stringify( { 'cmd' : 'set_id', 'id' : id } ) + "\n\n";
 
        // prepare keep alive function
        res.keepAliveFunc = function()
        {
            // send keep alive
            res.write( keepAlive );
 
        };
 
        // cache variables
        req.connection.name = parsed.query.name;
        req.connection.id = id;
        req.connection.res = res;
        req.connection.interval = setInterval(res.keepAliveFunc, KEEPALIVE_INTERVAL);
 
        // increment connection count
        connections++;
 
        // insert node
        insertNode(parsed.query.name, res);
 
        // add connection close listener
        req.connection.addListener('close', onClose);
        // disable Nagle algorithm
        req.connection.setNoDelay(true);
        // disable connection timeout
        req.connection.setTimeout(0);
 
        // send header
        res.writeHead(200, {'Content-type':'text/plain'});
        // send id
        res.write( JSON.stringify( { 'cmd' : 'set_id', 'id' : id } ) + "\n\n" );
        res.write( JSON.stringify( { 'cmd' : 'set_reconnect', 'timeout' : 4*60*1000 } ) + "\n\n" );
    }
    // handle channel send
    else if(parsed.pathname == '/channel/send')
    {
        // send message
        sendMessage(parsed.query);
        // this request is done
        res.end( JSON.stringify( { 'result' : '0' } ) );
    }
    // handle network traversal
    else if(parsed.pathname == '/channel/neighbors')
    {
        // reference channel
        var c = channel[parsed.query.name];
 
        // if channel does not exist, return an error
        if(c === undefined) 
        { 
            // this request is done
            res.end( JSON.stringify( { 'result' : '1' } ) );
        }
        // otherwise, check for the specified ID
        else
        {
            // find node for the specified ID
            var pNode = (parsed.query.id) ? idmap[parsed.query.id] : c.pHead;
 
            // result state
            var result;
 
            // if this ID doesn't exists, return an error
            if(pNode === undefined) 
            { 
                // prepare result
                result = JSON.stringify( { 'result' : '2' } );
            }
            // otherwise, use the ID
            else
            {
                // prepare result
                result = JSON.stringify( 
                { 
                    'result' : 0,
                    'p0' : pNode.pT.pL.connection.id,
                    'p1' : pNode.pT.connection.id,
                    'p2' : pNode.pT.pR.connection.id,
                    'p3' : pNode.pL.connection.id,
                    'p4' : pNode.connection.id,
                    'p5' : pNode.pR.connection.id,
                    'p6' : pNode.pB.pL.connection.id,
                    'p7' : pNode.pB.connection.id,
                    'p8' : pNode.pB.pR.connection.id
                } );
            }
 
            // send result in jsonp format
            res.end( "result('" + result + "')" );
        }
    }
    // handle channel count
    else if(parsed.pathname == '/connections/count')
    {
        // send header
        res.writeHead(200, {'Content-type':'text/plain'});
        // send connections count
        res.end( "result('" + JSON.stringify( { 'count' : connections } ) + "')" );
    }
    // handle channel count
    else if(parsed.pathname == '/messages/count')
    {
        // send header
        res.writeHead(200, {'Content-type':'text/plain'});
        // send messages count
        res.end( "result('" + JSON.stringify( { 'count' : config.messages } ) + "')" );
    }
    // handle garbage collection
    else if(parsed.pathname == '/debug/gc')
    {
        // perform garbage collection
        gc();
 
        // send header
        res.writeHead(200, {'Content-type':'text/plain'});
        // send result
        res.end( JSON.stringify( { 'result' : '0' } ) );
    }
    // handle anything else
    else
    {
        // send header
        res.writeHead(200, {'Content-type':'text/plain'});
        // send result
        res.end( "nope" );
    }
};
 
function onWorkerRequest(req, res) 
{
    // parse url
    var parsed = url.parse(req.url, true);
 
    // retrieve query        
    var query = { fwd : parsed.query };
 
    // forward query
    process.send(query);
 
    // this request is done
    res.end( JSON.stringify( { 'result' : '0' } ) );
}
 
// master needs to listen
if(cluster.isMaster) 
{
    // listen on public port 8080
    http.createServer(onRequest).listen(8080);
 
    // Fork worker(s) to handle send requests
    for(var v=0;v<cpuCount-1;v++)
    {
        var worker = cluster.fork();
 
        // Event on worker death
        cluster.on('death', function(worker) { console.log('worker ' + worker.pid + ' died'); });
 
        // Event on message
        worker.on('message', function(msg)
        {
            // process forwarded query
            if(msg && msg.fwd) { sendMessage(msg.fwd); }
        });
    }
}
// worker needs to fwd requests
else
{
    // listen on public port 8081
    http.createServer(onWorkerRequest).listen(8081);
}