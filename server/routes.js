(function () {
    'use strict';

    var express = require('express');
    var router = express.Router();
    var fs = require('fs');
    var path = require('path');

    //GET the home page
    router.get('/', function (request, response) {
        response.render('index');
    });
    
    //serve the tree
    router.get('/api/tree', function(request, response) {
        var _p;
        if(request.query.id == 1) {
            _p = path.resolve(__dirname, '..', 'node_modules');
            processReq(_p, response);
        }
        else {
            if(request.query.id) {
                _p = request.query.id;
                processReq(_p, response);
            }
            else {
                response.json(['No valid data found']);
            }
        }
    });

    //serve a resource
    router.get('/api/resource', function(request, response) {
        console.log(request.query.resource);
        response.send(fs.readFileSync(request.query.resource, 'UTF-8'));
    });

    function processReq(_p, response) {
        var resp = [];
        fs.readdir(_p, function(err, list) {
            // for(var i=list.length-1; i>=0; i--) {
            //     resp.push(processNode(_p, list[i]));
            // }
            for(var listItem of list) {
                resp.push(processNode(_p, listItem));
            }
            response.json(resp);
        });
    }

    function processNode(_p, f) {
        var s = fs.statSync(path.join(_p, f));
        return {
            "id": path.join(_p, f),
            "text": f,
            "icon": s.isDirectory() ? 'jstree-custom-directory' : 'jstree-custom-file',
            "state" : {
                "opened": false,
                "disabled": false,
                "selected": false
            },
            "li_addr": {
                "base": path.join(_p, f),
                "isLeaf": !s.isDirectory()
            },
            "children": s.isDirectory()
        };
    }
    
    module.exports = router;
})();