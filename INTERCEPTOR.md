## Interceptor介绍

### interceptor属性介绍

> 以SyncHook为例，其他Hook同理

+ `interceptor.call` ：在一开始就会被调用，且只会被调用一次
+ `interceptor.tap` ：在`syncHook.tap`注册的钩子之前调用，有多少个钩子就调用多少次
+ `interceptor.register`：不是必须的，可以用来修改tap

#### `call`示例代码

```js
const syncHook = new SyncHook(['value'])
syncHook.intercept({
    register: (tapInfo) => {
        console.log('tapInfo', tapInfo);
        return tapInfo;
    },
    call: (value) => {
        console.log(`call: ${value}`);
    },
    tap: (tapInfo) => {
        console.log(`${tapInfo.name} is getting called`);
    }
})
syncHook.tap('syncHookPlugin', (value) => {
    console.log('syncHook', value);
})
syncHook.tap('syncHookPlugin1', (value) => {
    console.log('syncHook', value);
})
syncHook.call(0)
```

#### `call`代码逻辑

```js
function anonymous(value) {
    "use strict";
    var _context;
    var _x = this._x;
    var _taps = this.taps;
    var _interceptors = this.interceptors;
    _interceptors[0].call(value);
    var _tap0 = _taps[0];
    _interceptors[0].tap(_tap0);
    var _fn0 = _x[0];
    _fn0(value);
    var _tap1 = _taps[1];
    _interceptors[0].tap(_tap1);
    var _fn1 = _x[1];
    _fn1(value);
}
```