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


        var support = {};

        /**
         * 判断是否为function
         * @param {*} obj 
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
         */
        jQuery.extend = jQuery.fn.extend = function () {
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

            if (typeof target === 'boolean') { }
            // Handle case when target is a string or something (possible in deep copy)
            // 当目标是字符串或其他内容时处理大小写（在深度复制中可能）
            if (typeof target !== 'object' && !isFunction(target)) { }
            // Extend jQuery itself if only one argument is passed
            // 如果只传递了一个参数，则扩展jQuery本身
            if (i === length) {
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
                         */
                        if (deep && copy && (jQuery.isPlainObject(copy))) {
                            
                        }

                    }
                }
            }
            // 把获取的实参集合第0项扔出去
            // Return the modified object
            // 返回修改后的对象
            return target;
        };

        /**
         * L325
         * 调用对象jQuery上的extend方法
         * 实参：一个对象
         */
        jQuery.extend({//L325
            // 'jQuery35005631369788094318' 生成这样的随机数：版本号+0~1之间的随机数，把所有不是数字的都干掉
            expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),
            // Assume jQuery is ready without the ready module
            // 假设jQuery在没有ready模块的情况下已经就绪
            isReady: true,
            error: function () { },
            noop: function () { },
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
                if(!obj || toString.call(obj) !== '[object Object]'){
                    return false;
                }

                // => obj是对象类型的
                proto = getProto(obj);// 返回obj的原型是啥，没有返回null
                
                // Objects with no prototype (e.g., `Object.create( null )`) are plain
                if (!proto){ // 如果没有的话，走到判断体里面去
                    return true;
                }

                // Objects with prototype are plain iff they were constructed by a global Object function
                // 具有原型的对象是简单的，如果它们是由全局对象函数构造的
                // => hasOwn.call(proto, 'constructor)
                Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
                /**
                 * 返回了一个boolean
                 */
                return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
            },
            isEmptyObject: function () { },
            // Evaluates a script in a provided context; falls back to the global one
            // if not specified.
            // 在提供的上下文中计算脚本；返回全局脚本
            // 如果未指定
            globalEval: function () { },
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
    }
);