/**
 * Bridge.js
 * 适应于壹心理js调用native方法
 *
 * ex:
 * var bridge = new Bridge({
 * 	methods:[
 * 		{
 * 			method: "goBack",
 * 			callback: function(param){}
 * 		}
 * 	]
 * });
 *
 * bridge.call("setTitle",{title:"我是标题"});
 */

;(function (window) {

  var utils = (function () {
    var self = {
      getSystem: function () {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //ios
          return 'Ios';
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //android
          return 'Android';
        }
      }
    };

    return self;
  })();

  function Bridge (options) {
    /*
    options.methods = [
      {
        method: "goBack",
        callback: function(){
          console.log("hello = goBack =");
        }
      },
      {
        method: "world",
        callback: function(){
          console.log("hello = world =");
        }
      }
    ];
    */

    if (options && options.methods && options.methods.length) {
      //注册让native调用js的接口
      function MethodCall (obj) {
        window[obj.method] = function (param) {
          param = param || '{}';
          obj.callback(JSON.parse(param));
        };
      }

      (function () {
        var methods = options.methods;
        for (var i = 0; i < methods.length; i++) {
          new MethodCall(methods[i]);
        }
      })();
    }

  }

  Bridge.prototype = {
    version: '0.1',
    _init: function () {

    },
    /**
     * call ios function
     * @param  {[string]} callName [协议接口名]
     * @param  {[object]} options  [参数]
     */
    _callIos: function (callName, options) {
      // console.log("@ _callIos");
      try {
        options = options ? JSON.stringify(options) : null;
        window.webkit.messageHandlers[callName].postMessage(options);
      } catch (err) {
        console.log(err);
      }
    },
    _callAndroid: function (callName, options) {
      // console.log("@ _callAndroid");
      try {
        options = options ? JSON.stringify(options) : '';
        var uri = 'jsbridge://bridege/' + callName + '?' + options;
        window.prompt(uri, '');
      } catch (err) {
        console.error(err);
      }
    },
    /**
     * public 调用原生方法 js2native
     * @param  {[string]} callName [方法名称]
     * @param  {[object]} options  [参数]
     */
    call: function (callName, options) {
      this['_call' + utils.getSystem()](callName, options);
    }
  };

  if (typeof module != 'undefined' && module.exports) {
    module.exports = Bridge;
  } else if (typeof define == 'function' && define.amd) {
    define(function () { return Bridge; });
  } else {
    window.Bridge = Bridge;
  }

})(window);
