const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesLoopHook,
	AsyncSeriesWaterfallHook,
	HookMap,
	MultiHook,
} = require('./lib/index');


// const asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook(['value']);
// asyncSeriesWaterfallHook.tapAsync('AsyncSeriesWaterfallHookPlugin', (value, callback) => {
// 	console.log(value);
// 	callback('我是第1个error')
// });
// asyncSeriesWaterfallHook.tapAsync('AsyncSeriesWaterfallHookPlugin', (value, callback) => {
// 	console.log(value);
// 	callback(null, '我是第二个')
// });
// asyncSeriesWaterfallHook.callAsync(0, (error, result) => {
// 	console.log('error', error);
// 	console.log('result', result);
// })






const asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook(['value']);
asyncSeriesWaterfallHook.tapPromise('AsyncSeriesWaterfallHookPlugin', (value) => {
	return new Promise((r, j) => {
        setTimeout(() => {
            if (~~(Math.random() * 10) > 5) {
                console.log(`我是1号Tap`);
                r()
            } else {
                j('小于5失败了')
            }
        }, 1000);
		
    });
});
asyncSeriesWaterfallHook.tapPromise('AsyncSeriesWaterfallHookPlugin', (value) => {
	return new Promise((r, j) => {
        setTimeout(() => {
            if (~~(Math.random() * 10) <= 5) {
                console.log(`我是2号Tap`);
                r('来自2号Tap熔断')
            } else {
                j('大于5失败了')
            }
        }, 1000);
    });
});
asyncSeriesWaterfallHook.promise(0).then(() => {
	// 无参数
	console.log('结束');
}).catch((err) => {
	console.log('错误', err);
})





