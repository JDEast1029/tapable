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
