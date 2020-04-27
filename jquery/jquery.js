(function (global, factory) {
    "use strict";
    factory(global);
})(
typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    "use strict";
    var arr = []; // L48 数组的实例
    // todo: Object.getPrototypeOf 手写原理
    // =>  方法返回给定对象的原型。如果没有继承属性，则返回 null 。（内部[[Prototype]]属性的值）
    // => Object.getPrototypeOf('foo'); 如果参数不是一个对象类型，在 ES2015 中，参数会被强制转换为一个 Object。String.prototype 
    var getProto = Object.getPrototypeOf; // L50
    // todo: arr.slice 手写原理
    var slice = arr.slice;
    /**
     * => arr.flat 是否能调取到这个方法
     * => 能
     * => 不能
     */
    var flat = arr.flat ? function (){} : function (){};
    var push = arr.push;
    

    // 对象实例：可以调用原型上的方法
    var class2type = {};
    // => Object.prototype.toString 判断数据类型的
    var toString = class2type.toString; // L67

    // => Object.prototype.hasOwnProperty 判断是否是自己的属性 返回布尔值
    var hasOwn = class2type.hasOwnProperty; // L69

    // => hasOwn是函数类的实例，hasOwn.toString调取的是Function.prototype.toString
    // => Function.prototype.toString() 返回一个表示当前函数源代码的字符串。
    // => Function.prototype.toString(Function.prototype.toString) 返回 "function toString() { [native code] }" 这是内置方法
    var fnToString = hasOwn.toString; // L71

    // => Function.prototype.toString.call(Object);
    // => 返回值 "function Object() { [native code] }"
    // => ObjectFunctionString = "function Object() { [native code] }"
    // => 现在是一个字符串，Object对象类的函数字符串
    var ObjectFunctionString = fnToString.call(Object); // L73

    var support = {}; // L75

    /**
     * 判断是否为function
     * @param {*} obj 
     * @return {boolean} 是函数，并且nodeType不是number类型的：true
     */
    var isFunction = function isFunction(obj) {
        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.

        // todo:obj.nodeType节点类型？不是number就能判断是函数吗？
        return typeof obj === 'function' && typeof obj.nodeType !== 'number';
    };

    /**
     * 是否为window对象
     * @param {object} obj 
     * @return {boolean} 是否为window
     * 不是null，并且obj自己身上有一个window属性，那么obj就是window
     */
    var isWindow = function isWindow(obj) { // L87
        /**
         * 运算符优先级：
         * != 非等号 10.3
         * === 全等号 10.2
         * && 逻辑与 6
         * 
         * A && B A的值为真，则返回B；A的值为假，则返回A
         */
        return obj != null && obj === obj.window;
    }

    var document = window.document; // L92

        // => 保留脚本属性Script脚本的属性
        var preservedScriptAttributes = { // L96
            type:true,
            src:true,
            nonce:true,
            noModule:true
        };

        /**
         * 
         * @param {*} code 
         * @param {*} node  {nonce:options && options.nonce}
         * @param {*} doc 
         */
        function DOMEval(code, node, doc){ // L103
            doc = doc || document;

            // => window.document.createElement('script') 创建 script标签
            var i, val,
                script = doc.createElement('script');

            script.text = code;
            if (node) { // L110
                for (i in preservedScriptAttributes) { // L111
                    // Support: Firefox 64+, Edge 18+
                    // Some browsers don't support the "nonce" property on scripts.
                    // On the other hand, just using `getAttribute` is not enough as
                    // the `nonce` attribute is reset to an empty string whenever it
                    // becomes browsing-context connected.
                    // See https://github.com/whatwg/html/issues/2369
                    // See https://html.spec.whatwg.org/#nonce-attributes
                    // The `node.getAttribute` check was added for the sake of
                    // `jQuery.globalEval` so that it can fake a nonce-containing node
                    // via an object.
                    /*
                        支持浏览器 Firefox 64+, Edge 18+
                        有些浏览器不支持脚本上的“nonce”属性。
                        另一方面，仅仅使用“getAttribute”还不够
                        “nonce”属性在任何时候都重置为空字符串
                        连接浏览上下文。
                        // See https://github.com/whatwg/html/issues/2369
                        // See https://html.spec.whatwg.org/#nonce-attributes
                        添加“node.getAttribute”检查是为了
                        `jQuery.globalEval`以便它可以伪造包含nonce的节点
                        通过一个物体。
                    */
                    val = node[i] || node.getAttribute && node.getAttribute(i);
                    if (val) {
                        script.setAttribute(i, val);
                    }
                }
            }
            
            doc.head.appendChild(script).parentNode.removeChild(script);
        }

    /**
     * 2020年4月23日09:36:50
     * L153
     * @param {*} selector 用来查找的字符串
     * @param {*} context 作为待查找的DOM元素集、文档或jQuery对象
     */
    var version = '3.5.0', // 版本号
        jQuery = function (selector, context) {
            // The jQuery object is actually just the init constructor 'enhanced'
            // jQuery对象实际上只是init构造函数'enhanced' 增强
            // Need init if jQuery is called (just allow error to be thrown if not included)
            // 如果调用jQuery，则需要init（如果不包括，则允许抛出错误）

            /**
             * 2020年4月23日09:53:35
             * jQuery 变量的值是一个方法
             * 返回值是 jQuery.fn.init 构造函数的一个实例
             *  new Person(a, b);
             * new jQuery.fn.init(selector, context)
             * => new 构造函数 => 生成一个实例
             * => jQuery.fn.init 是一个构造函数
             * => jQuery 是一个函数
             * => jQuery.fn 作为对象角色，上面有一个属性fn
             * => jQuery.fn.init 在jQuery.fn对象上有一个属性init
             */
            return new jQuery.fn.init(selector, context);
        };

    /**
     * 搜索jQuery.fn
     * L160
     * 所有的函数都天生自带一个属性prototype，在prototype上都天生自带一个属性constructor存储当前的函数本身
     * => 1. 创建一个对象 AF0
     * => 2. 把jQuery.prototype 原型指向AF0
     * => 3. 把jQuery.fn 指向AF0；所以jQuery.fn也是原型
     */
    jQuery.fn = jQuery.prototype = {
        jquery: version, // 版本号
        constructor: jQuery, // 手动添加构造器指向
        length: 0,  // jQuery对象的默认长度为0 The default length of a jQuery object is 0
        toArray: function () { },
        get: function () { },
        pushStack: function () { },
        each: function () { },
        map: function () { },
        slice: function () { },
        first: function () { },
        last: function () { },
        even: function () { },
        odd: function () { },
        eq: function () { },
        end: function () { },
        push: push,
        sort: arr.sort,
        splice: arr.splice
    };

    /**
     * 2020年4月23日10:12:15
     * L253
     * jQuery作为对象角色，有一个方法extend
     * jQuery.fn是jQuery.prototype，上面有一个方法 extend——实例可以调用
     * todo:深拷贝的原理需要手写一遍
     * @params 
     *      1个 {}，默认不是深拷贝
     *      多个：boolean 控制是否深拷贝 object 需要拷贝的内容
     * @return {object} 把所有的扩展项，深拷贝的形式，挂在jQuery.extend 和 jQuery.fn.extend上
     */
    jQuery.extend = jQuery.fn.extend = function () { // L253
        /**
         * options, 
         * name,
         * src, 
         * copy, 
         * copyIsArray, 
         * clone,
         * target = arguments[ 0 ] || {}, 获取实参集合中的第0项，
         * i = 1,
         * length = arguments.length, 实参集合的长度
         * deep = false;
         * 
         */
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        // => 处理深度复制的情况
        /**
         * target 是一个布尔值
         * 把deep赋值为target【初始值是arguments[0]】
         * 然后target获取 arguments[1]
         * i++后加；i=2
         * 也就是 xxx.extend([boolean], {}, .....);
         */
        if (typeof target === 'boolean') { // L261
            deep = target;

            // Skip the boolean and the target
            // => 跳过布尔值和目标
            target = arguments[ i ] || {};
            i++;
        }
        // Handle case when target is a string or something (possible in deep copy)
        // 当目标是字符串或其他内容时处理大小写（在深度复制中可能）
        /**
         * 运算符优先级：
         * !逻辑非 16
         * typeof 16
         * !== 非全等号10
         * && 逻辑与 6
         */
        // => !isFunction(target) 是函数，取反
        // => target 不是 null也不是对象
        if (typeof target !== 'object' && !isFunction(target)) { // L270
            target = {};
        }
        // Extend jQuery itself if only one argument is passed
        // 如果只传递了一个参数，则扩展jQuery本身
        if (i === length) { // 275
            /**
             * 在当前代码中jQuery.extend({makeArray:function(){}});
             * => this:jQuery
             * => target:arguments[0]
             * => this->jQuery
             * 
             * i-- 后i=0;
             * 走到后面的for循环，可以走进去
             */
            target = this;
            i--;
        }

        for (; i < length; i++) {
            // Only deal with non-null/undefined values
            // 仅处理非空/未定义的值
            /**
             * ( options = arguments[i] != null)
             * => 优先级 = 赋值3；!= 非等号10
             * => arguments[i] 第i项，不是null；才给options赋值
             * => 在判断条件里面转换成 boolean
             */
            if ((options = arguments[i] != null)) {
                // Extend the base object
                // 扩展基对象
                for (name in options) {
                    copy = options[name];

                    // Prevent Object.prototype pollution
                    // 防止 Object.prototype 原型污染
                    // Prevent never-ending loop
                    // 防止永无止境的循环
                    /**
                     * => 所有的对象上都有原型链__proto__：指向所属类的原型
                     * => 如果已经被target获取了，就跳出本轮循环，继续下次循环
                     */
                    if (name === '__proto__' || target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    // 如果合并纯对象或数组，则递归
                    /**
                     * => A && B A 为真，则返回B；A || B A为真，则返回A
                     * => A || B ：A为真，则返回A；A不为真，则返回B
                     * 运算符优先级：
                     * () 圆括号 20
                     * && 逻辑与6
                     * || 逻辑或5
                     * = 赋值 3
                     */
                    /**
                     * deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
                     * deep && copy && C
                     * C => jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy))
                     * C => A2 || B2 【A2:判断copy是否为Object构造函数类】
                     *      【如果A2为真，则返回A2；如果A2不为真，则返回B2】
                     * B2 => copyIsArray = Array.isArray(copy) 【copyIsArray是布尔值】
                     * B2 => 【判断每一个copy值是否为数组，并把结果赋值给变量copyIsArray】
                     *      （1）Array.isArray(copy)
                     *      （2）变量copyIsArray
                     *      （3）赋值
                     * 
                     */
                    // => 存在deep并且存在copy，并且copy要么是Object函数类，要么是数组，都可以进入判断体
                    if (deep && copy && (jQuery.isPlainObject(copy) || 
                    (copyIsArray = Array.isArray(copy)))) { //L297
                        // => 从options里面拿出跟target一样的属性值，赋值给src
                        src = target[name];

                        // Ensure proper type for the source value
                        // => 确保源值的类型正确
                        // => copyIsArray 为真，并且src不是数组
                        if (copyIsArray && !Array.isArray(src)) { // L301
                            // => 设置 clone 为数组
                            clone = [];
                        } else if (!copyIsArray && !jQuery.isPlainObject(src)) { // L303
                            // => 如果（copy不是数组，并且src不是对象。那么设置clone为对象
                            clone = {};
                        } else { // L305
                            // => 以上都不对，那么 把src的值赋值给clone
                            clone = src;
                        }
                        // => 把copyIsArray 设置为false
                        copyIsArray = false;

                        // => 深拷贝：递归，每一层都要判断
                        target[name] = jQuery.extend(deep, clone, copy);
                        
                    } else if (copy !== undefined){ // L314
                        // => copy 既不是对象也不是函数，也不是undefined走到这里来了
                        // => 每次都更新 target[name] 带计算的属性访问
                        target[name] = copy;
                    }

                }
            }
        }
        // Return the modified object
        // =>返回修改后的对象
        // => 通过递归处理传进来的每一个参数，把所有的内容都以一个新的对象，挂在 jQuery.extend 和 jQuery.fn.extend 上，扩展的内容
        return target;
    };

    /**
     * L325
     * 调用对象jQuery上的extend方法
     * 实参：一个对象
     * 默认jQuery对象上扩展的方法
     */
    jQuery.extend({//L325
        // 'jQuery35005631369788094318' 生成这样的随机数：版本号+0~1之间的随机数，把所有不是数字的都干掉
        expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''), // L328
        // Assume jQuery is ready without the ready module
        // 假设jQuery在没有ready模块的情况下已经就绪
        isReady: true, // L331
        /**
         * @param {人类可阅读的错误信息} msg 
         */
        error: function (msg) { // L333
            // => 通过Error的构造器可以创建一个错误对象。当运行时错误产生时，Error的实例对象会被抛出。Error对象也可用于用户自定义的异常的基础对象。下面列出了各种内建的标准错误类型。
            throw new Error(msg);
        },
        noop: function () { }, // L337
        /**
         * 是否为对象
         * @param {Object} obj 
         * @return {Boolean} 判断 obj 是否为Object类
         * plain[plein]adj.清楚的；直接的；
         */
        isPlainObject: function (obj) { // L339
            var proto, Ctor;
            // Detect obvious negatives
            // 检测明显的阴性
            // Use toString instead of jQuery.type to catch host objects
            // 使用toString而不是jQuery.type捕获宿主对象
            /**
             * => 为FALSE的五种情况：''空字符串、null、undefined、0、NaN
             * => A || B -> A为真，则返回A；A不为真，则返回B
             * => A && B -> A为真，则返回B；A不为真，则返回A
             * 如果obj是FALSE的情况，!FALSE=>可以进入判断体
             * 如果obj不是FALSE的情况，!obj=>false，则判断 obj不是对象类型的才可以进入判断体
             */
            if(!obj || toString.call(obj) !== '[object Object]'){ // L344
                return false;
            }

            // => obj是对象类型的
            proto = getProto(obj);// 返回obj的原型是啥，没有返回null
            
            // Objects with no prototype (e.g., `Object.create( null )`) are plain
            if (!proto){ // L351
                // 如果没有的话，走到判断体里面去
                return true;
            }

            // Objects with prototype are plain iff they were constructed by a global Object function
            // 具有原型的对象是简单的，如果它们是由全局对象函数构造的
            // => hasOwn.call(proto, 'constructor) 判断是否为私有属性，返回布尔值
            // => A && B：A为真，则返回B；A不为真，则返回A
            // => 获取obj对象原型上的constructor构造器属性
            // => 所有的函数都有一个prototype原型属性，在原型上天生自带一个constructor属性，它的值是当前函数类
            // => 所有的对象天生自带一个__proto__原型链，指向所属类的原型
            // => 如果obj的原型上有constructor属性，那么他就是函数
            Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
            
            /**
             * 运算符优先级
             * typeof 16
             * === 10
             * && 6
             */
            /**
             * 基本数据类型值7个：string、number、boolean、null、undefined、symbol、bigint
             * typeof 1n === 'bigint'
             * typeof '' === 'string'
             * typeof NaN === 'number'
             * typeof Infinity === 'number'
             * typeof true === 'boolean'
             * typeof null === 'object'
             * typeof undefined === 'undefined'
             * typeof Symbol(1) === 'symbol'
             * 
             * 引用数据类型值
             * object
             *      {}普通对象/^$/正则 Math数学函数....
             * function
             *      typeof function (){} === 'function'
             */
            /**
             * typeof obj.prototype.constructor === 'function
             * ({}).hasOwnProperty.toString.call(obj.prototype.constructor) === 'function Object() {[native code]}'
             */
            /**
             * 返回了一个boolean：判断obj是否为 Object对象类
             */
            return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString; //L357
        },
        /**
         * 判断是否为空对象：原理，循环它，能循环则不是空对象
         * @params {object} obj
         * @return {boolean} 空对象：true
         */
        isEmptyObject: function (obj) { // L360
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },
        // Evaluates a script in a provided context; falls back to the global one
        // if not specified.
        // 在提供的上下文中计算脚本；返回全局脚本
        // 如果未指定
        globalEval: function (code, options, doc) { // L371
            DOMEval(code, {nonce: options && options.nonce}, doc);
        },
        each: function () { },
        // results is for internal usage only
        // 结果仅供内部使用
        makeArray: function () { },
        inArray: function () { },
        // Support: Android <=4.0 only, PhantomJS 1 only
        // 支持：仅Android<=4.0，仅PhantomJS 1
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function () { },
        grep: function () { },
        // arg is for internal usage only
        // arg仅供内部使用
        map: function () { },
        // A global GUID counter for objects
        // 对象的全局GUID计数器
        guid: 1,
        // jQuery.support is not used in Core but other projects attach their
        // 核心中没有使用jQuery.support，但其他项目附加了
        // properties to it so it needs to exist.
        // 所以它必须存在
        support: support,
    });
    /**
     * 搜索 jQuery.fn.init
     * L3125
     */
    var rootjQuery,
        // todo:这个正则是干嘛的？
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
        init = jQuery.fn.init = function (selector, context, root) {
            // todo:这个root是啥？
            // ...CODE


            return jQuery.makeArray(selector, this);
        };

    /**
     * 2020年4月23日09:32:41
     * noGlobal 没有传值，说明在window下
     * 在window上挂属性jQuery和$，值为jQuery
     */
    if (typeof noGlobal === "undefined") {
        window.jQuery = window.$ = jQuery;
    }

    return jQuery;
});